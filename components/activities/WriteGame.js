"use client";

import { useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-write-history-v1";

export default function WriteGame() {
  const [round, setRound] = useState(() => pickRoundWords(ALL_VOCAB, readRoundHistory(HISTORY_KEY), TOTAL));
  const questions = round.items;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [value, setValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const current = questions[index];

  function check() {
    if (checked) return;
    setChecked(true);
    if (value.trim().toLowerCase() === current.word.toLowerCase()) setScore((s) => s + 1);
  }
  function next() {
    if (index + 1 < TOTAL) {
      setIndex((i) => i + 1);
      setValue("");
      setChecked(false);
    } else {
      setFinished(true);
    }
  }
  function restart() {
    setRound(pickRoundWords(ALL_VOCAB, round.history, TOTAL));
    setIndex(0);
    setScore(0);
    setValue("");
    setChecked(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">✏️</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">
          ¡Terminaste! Puntaje final: {score} / {TOTAL}
        </h3>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  const isCorrect = value.trim().toLowerCase() === current.word.toLowerCase();

  return (
    <div className="text-center">
      <div className="write-illustration"><ActivityImage word={current.word} /></div>
      <p className="font-bold text-navy/60">Escribe esta palabra en inglés</p>
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2.5">
        <input
          type="text"
          value={value}
          disabled={checked}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Escribe aquí..."
          autoComplete="off"
          className="w-56 rounded-xl border-2 border-blue-light px-4 py-3 text-base focus:border-brand-blue focus:outline-none"
        />
        <button onClick={check} disabled={checked} className="btn btn-primary btn-sm">
          Verificar
        </button>
      </div>
      {checked && (
        <p className={`mt-4 font-extrabold ${isCorrect ? "text-brand-green" : "text-[#d64545]"}`}>
          {isCorrect ? "¡Correcto! 🎉" : `Casi. La respuesta era: ${current.word}`}
        </p>
      )}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          Puntaje: {score} / {TOTAL}
        </span>
        {checked && (
          <button onClick={next} className="btn btn-outline btn-sm">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
