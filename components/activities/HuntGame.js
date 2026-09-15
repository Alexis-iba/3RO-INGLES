"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { shuffle } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const DURATION = 8000;
const ALL_VOCAB = getActivityVocab();

function buildGrid(target) {
  const distractors = shuffle(ALL_VOCAB.filter((v) => v.word !== target.word)).slice(0, 8);
  return shuffle([target, ...distractors]);
}

function speak(word) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  utter.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

// mode "visual": muestra la palabra a buscar. mode "audio": la dice en voz alta.
export default function HuntGame({ mode = "visual" }) {
  const HISTORY_KEY = mode === "audio" ? "englishkids-hunt-audio-v1" : "englishkids-hunt-visual-v1";
  const [round, setRound] = useState(() => pickRoundWords(ALL_VOCAB, readRoundHistory(HISTORY_KEY), TOTAL));
  const targets = round.items;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [found, setFound] = useState(false);
  const [wrongWord, setWrongWord] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const advanceRef = useRef(null);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [HISTORY_KEY, round]);

  const target = targets[index];
  const grid = useMemo(() => (target ? buildGrid(target) : []), [target]);
  const answered = found || timedOut;

  useEffect(() => {
    if (finished || !target) return;
    timerRef.current = setTimeout(() => {
      setTimedOut(true);
      setStreak(0);
    }, DURATION);
    if (mode === "audio") speak(target.word);
    return () => clearTimeout(timerRef.current);
  }, [finished, mode, target]);

  useEffect(() => {
    if (!answered) return;
    advanceRef.current = setTimeout(() => {
      if (index + 1 < TOTAL) {
        setFound(false);
        setTimedOut(false);
        setWrongWord(null);
        setIndex(index + 1);
      } else {
        setFinished(true);
      }
    }, 900);
    return () => clearTimeout(advanceRef.current);
  }, [answered, index]);

  function tap(word) {
    if (answered) return;
    if (word === target.word) {
      clearTimeout(timerRef.current);
      setFound(true);
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setScore((s) => s + 10 + Math.min(nextStreak, 5) * 2);
    } else {
      setWrongWord(word);
      setStreak(0);
      setTimeout(() => setWrongWord(null), 350);
    }
  }

  function restart() {
    clearTimeout(timerRef.current);
    clearTimeout(advanceRef.current);
    setRound(pickRoundWords(ALL_VOCAB, round.history, TOTAL));
    setIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setFound(false);
    setTimedOut(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">🔎</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">¡Caza terminada! Puntaje: {score}</h3>
        <p className="mt-1 font-bold text-navy/60">Mejor racha: {bestStreak} 🔥</p>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  if (!target) return null;

  return (
    <div className="hunt-game">
      <div className="speed-top">
        <span className="speed-pill">
          {index + 1} / {TOTAL}
        </span>
        {streak >= 2 && <span className="speed-streak">🔥 Racha x{streak}</span>}
        <span className="speed-pill speed-score">⭐ {score}</span>
      </div>
      <div className="speed-timer-track">
        <div
          key={index}
          className="speed-timer-fill"
          style={{ animationDuration: `${DURATION}ms`, animationPlayState: answered ? "paused" : "running" }}
        />
      </div>
      {mode === "audio" ? (
        <button onClick={() => speak(target.word)} className="btn btn-sm mx-auto mb-3.5 flex bg-brand-blue text-white">
          🔊 Escuchar de nuevo
        </button>
      ) : (
        <p className="hunt-target">
          Encuentra: <strong>{target.word}</strong>
        </p>
      )}
      <div className="hunt-grid">
        {grid.map((item) => {
          const isTarget = item.word === target.word;
          let cls = "hunt-tile";
          if (found && isTarget) cls += " is-correct";
          if (timedOut && isTarget) cls += " is-missed";
          if (wrongWord === item.word) cls += " is-wrong";
          return (
            <button key={item.word} onClick={() => tap(item.word)} disabled={answered} className={cls} aria-label={item.word}>
              <ActivityImage word={item.word} decorative sizes="110px" />
            </button>
          );
        })}
      </div>
      {answered && (
        <p className={`speed-feedback ${found ? "is-correct" : "is-wrong"}`}>
          {found ? "¡Encontrada! ⚡" : `¡Se acabó el tiempo! Era: ${target.word}`}
        </p>
      )}
    </div>
  );
}
