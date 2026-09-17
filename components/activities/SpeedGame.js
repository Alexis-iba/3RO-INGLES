"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { pickOptions } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import { speakCorrect, speakIncorrect, speakResult } from "@/lib/voice-feedback";
import ActivityImage from "./ActivityImage";

const TOTAL = 10;
const DURATION = 8000;
const REVEAL_MS = 1100;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-speed-history-v1";

export default function SpeedGame() {
  const [round, setRound] = useState(() => pickRoundWords(ALL_VOCAB, readRoundHistory(HISTORY_KEY), TOTAL));
  const questions = round.items;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef(null);
  const advanceRef = useRef(null);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const current = questions[index];
  const options = useMemo(() => (current ? pickOptions(ALL_VOCAB, current, 4) : []), [current]);
  const answered = selected !== null || timedOut;

  // Cronómetro de la pregunta actual: si nadie contesta a tiempo, cuenta como fallo.
  useEffect(() => {
    if (finished || !current) return;
    timerRef.current = setTimeout(() => {
      setTimedOut(true);
      setStreak(0);
      speakIncorrect();
    }, DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, finished]);

  // Al responder (bien, mal o por tiempo), avanza sola tras un breve respiro.
  useEffect(() => {
    if (!answered) return;
    advanceRef.current = setTimeout(() => {
      if (index + 1 < TOTAL) {
        setSelected(null);
        setTimedOut(false);
        setIndex(index + 1);
      } else {
        setFinished(true);
        speakResult(correctCount / TOTAL);
      }
    }, REVEAL_MS);
    return () => clearTimeout(advanceRef.current);
  }, [answered, index]);

  function handleAnswer(word) {
    if (answered) return;
    clearTimeout(timerRef.current);
    setSelected(word);
    if (word === current.word) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setScore((s) => s + 10 + Math.min(nextStreak, 5) * 2);
      setCorrectCount((c) => c + 1);
      speakCorrect();
    } else {
      setStreak(0);
      speakIncorrect();
    }
  }

  function restart() {
    clearTimeout(timerRef.current);
    clearTimeout(advanceRef.current);
    setRound(pickRoundWords(ALL_VOCAB, round.history, TOTAL));
    setIndex(0);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setBestStreak(0);
    setSelected(null);
    setTimedOut(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">⚡</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">
          ¡Contrarreloj terminado! Puntaje: {score}
        </h3>
        <p className="mt-1 font-bold text-navy/60">Mejor racha: {bestStreak} 🔥</p>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="speed-game">
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

      <div className="speed-image"><ActivityImage word={current.word} priority /></div>

      <div className="speed-options">
        {options.map((o) => {
          const isThisCorrect = o.word === current.word;
          const isSelected = o.word === selected;
          let cls = "speed-option";
          if (answered) {
            if (isThisCorrect) cls += " is-correct";
            else if (isSelected) cls += " is-wrong";
          }
          return (
            <button key={o.word} onClick={() => handleAnswer(o.word)} disabled={answered} className={cls}>
              {o.word}
            </button>
          );
        })}
      </div>

      {answered && (
        <p className={`speed-feedback ${selected === current.word ? "is-correct" : "is-wrong"}`}>
          {selected === current.word ? "¡Correcto! ⚡" : timedOut ? `¡Se acabó el tiempo! Era: ${current.word}` : `Casi. Era: ${current.word}`}
        </p>
      )}
    </div>
  );
}
