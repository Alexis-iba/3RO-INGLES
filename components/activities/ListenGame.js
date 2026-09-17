"use client";

import { useEffect, useMemo, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { pickOptions } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import { speakCorrect, speakIncorrect, speakResult } from "@/lib/voice-feedback";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-listen-history-v1";

function speak(word) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  utter.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

export default function ListenGame() {
  const [round, setRound] = useState(() => pickRoundWords(ALL_VOCAB, readRoundHistory(HISTORY_KEY), TOTAL));
  const questions = round.items;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const current = questions[index];
  const options = useMemo(() => (current ? pickOptions(ALL_VOCAB, current, 4) : []), [current]);

  useEffect(() => {
    if (current) speak(current.word);
  }, [current]);

  function handleAnswer(word) {
    if (selected) return;
    setSelected(word);
    if (word === current.word) {
      setScore((s) => s + 1);
      speakCorrect();
    } else {
      speakIncorrect();
    }
  }
  function handleNext() {
    if (index + 1 < TOTAL) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
      speakResult(score / TOTAL);
    }
  }
  function restart() {
    setRound(pickRoundWords(ALL_VOCAB, round.history, TOTAL));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">🎧</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">
          ¡Terminaste! Puntaje final: {score} / {TOTAL}
        </h3>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md text-center">
      <div className="mb-2.5 text-6xl">🎧</div>
      <button onClick={() => speak(current.word)} className="btn btn-sm mb-4 bg-brand-blue text-white">
        🔊 Escuchar palabra
      </button>
      <div className="listen-illustrated-options grid grid-cols-2 gap-3">
        {options.map((o, i) => {
          const isCorrect = o.word === current.word;
          const isSelected = o.word === selected;
          let cls = "bg-bg-page border-transparent hover:border-blue-light";
          if (selected) {
            if (isCorrect) cls = "bg-[#e3f7ee] border-brand-green text-[#1c7a4d]";
            else if (isSelected) cls = "bg-[#fdeaea] border-[#e05555] text-[#b02a2a]";
          }
          return (
            <button
              key={o.word}
              onClick={() => handleAnswer(o.word)}
              disabled={!!selected}
              className={`listen-image-option rounded-xl border-2 p-3 text-center text-sm font-bold ${cls}`}
            >
              <ActivityImage word={o.word} decorative sizes="180px" />
              <span>{String.fromCharCode(65 + i)}) {o.word}</span>
            </button>
          );
        })}
      </div>
      {selected && (
        <p className={`mt-4 font-extrabold ${selected === current.word ? "text-brand-green" : "text-[#d64545]"}`}>
          {selected === current.word ? "¡Correcto!" : `Era: ${current.word}`}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          Puntaje: {score} / {TOTAL}
        </span>
        {selected && (
          <button onClick={handleNext} className="btn btn-outline btn-sm">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
