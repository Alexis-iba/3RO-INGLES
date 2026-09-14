"use client";

import { useMemo, useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { shuffle } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-spelling-history-v1";

function makeTypo(word) {
  const chars = word.split("");
  const strategies = [];
  if (chars.length >= 2) {
    strategies.push(() => {
      const i = Math.floor(Math.random() * (chars.length - 1));
      const c = [...chars];
      [c[i], c[i + 1]] = [c[i + 1], c[i]];
      return c.join("");
    });
  }
  if (chars.length >= 3) {
    strategies.push(() => {
      const i = Math.floor(Math.random() * chars.length);
      return chars.filter((_, idx) => idx !== i).join("");
    });
  }
  strategies.push(() => {
    const i = Math.floor(Math.random() * chars.length);
    const c = [...chars];
    c.splice(i, 0, c[i]);
    return c.join("");
  });
  strategies.push(() => {
    const i = Math.floor(Math.random() * chars.length);
    if (chars[i] === " ") return null;
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const isUpper = chars[i] !== chars[i].toLowerCase();
    let repl = letters[Math.floor(Math.random() * letters.length)];
    if (isUpper) repl = repl.toUpperCase();
    const c = [...chars];
    c[i] = repl;
    return c.join("");
  });
  const strategy = strategies[Math.floor(Math.random() * strategies.length)];
  return strategy();
}

function buildSpellingOptions(word, count = 4) {
  const seen = new Set([word.toLowerCase()]);
  const options = [word];
  let attempts = 0;
  while (options.length < count && attempts < 60) {
    attempts++;
    const candidate = makeTypo(word);
    if (candidate && candidate !== word && !seen.has(candidate.toLowerCase())) {
      seen.add(candidate.toLowerCase());
      options.push(candidate);
    }
  }
  return shuffle(options);
}

export default function SpellingChoiceGame() {
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
  const options = useMemo(() => (current ? buildSpellingOptions(current.word, 4) : []), [current]);

  function handleAnswer(option) {
    if (selected) return;
    setSelected(option);
    if (option === current.word) setScore((s) => s + 1);
  }
  function handleNext() {
    if (index + 1 < TOTAL) {
      setIndex((i) => i + 1);
      setSelected(null);
    } else {
      setFinished(true);
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
        <div className="text-5xl">📝</div>
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
      <div className="write-illustration"><ActivityImage word={current.word} priority /></div>
      <p className="font-bold text-navy/60">¿Cuál es la forma correcta de escribirla?</p>
      <div className="mt-3.5 flex flex-col gap-2.5">
        {options.map((o) => {
          const isCorrect = o === current.word;
          const isSelected = o === selected;
          let cls = "bg-bg-page border-transparent hover:border-blue-light";
          if (selected) {
            if (isCorrect) cls = "bg-[#e3f7ee] border-brand-green text-[#1c7a4d]";
            else if (isSelected) cls = "bg-[#fdeaea] border-[#e05555] text-[#b02a2a]";
          }
          return (
            <button
              key={o}
              onClick={() => handleAnswer(o)}
              disabled={!!selected}
              className={`rounded-xl border-2 px-4 py-3 text-center text-base font-bold ${cls}`}
            >
              {o}
            </button>
          );
        })}
      </div>
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
