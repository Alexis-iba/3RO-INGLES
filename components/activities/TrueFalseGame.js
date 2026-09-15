"use client";

import { useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const ALL_VOCAB = getActivityVocab();

function speak(word) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const utter = new SpeechSynthesisUtterance(word);
  utter.lang = "en-US";
  utter.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function buildRound(history, historyKey) {
  const { items, history: nextHistory } = pickRoundWords(ALL_VOCAB, history, TOTAL);
  const questions = items.map((image) => {
    const isMatch = Math.random() < 0.5;
    let label = image.word;
    if (!isMatch) {
      const others = ALL_VOCAB.filter((v) => v.word !== image.word);
      label = others[Math.floor(Math.random() * others.length)].word;
    }
    return { image, label, isMatch };
  });
  return { questions, history: nextHistory, historyKey };
}

// mode "image": muestra la imagen y la palabra escrita. mode "audio": dice la palabra en voz alta.
export default function TrueFalseGame({ mode = "image" }) {
  const historyKey = mode === "audio" ? "englishkids-truefalse-audio-v1" : "englishkids-truefalse-image-v1";
  const [round, setRound] = useState(() => buildRound(readRoundHistory(historyKey), historyKey));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    writeRoundHistory(round.historyKey, round.history);
  }, [round]);

  const q = round.questions[index];

  useEffect(() => {
    if (mode === "audio" && q) speak(q.label);
  }, [q, mode]);

  function answer(guessMatch) {
    if (selected !== null) return;
    setSelected(guessMatch);
    if (guessMatch === q.isMatch) setScore((s) => s + 1);
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
    setRound(buildRound(round.history, historyKey));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">✅</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">
          ¡Terminaste! Puntaje final: {score} / {TOTAL}
        </h3>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  const answered = selected !== null;

  return (
    <div className="truefalse-game">
      <p className="mb-3.5 text-center font-extrabold text-navy/70">
        {mode === "audio" ? "¿La imagen es lo que escuchaste?" : "¿La imagen y la palabra coinciden?"}
      </p>
      <div className="truefalse-image"><ActivityImage word={q.image.word} priority /></div>

      {mode === "audio" ? (
        <button onClick={() => speak(q.label)} className="btn btn-sm mx-auto mt-3.5 flex bg-brand-blue text-white">
          🔊 Escuchar de nuevo
        </button>
      ) : (
        <p className="mt-3.5 text-center font-heading text-2xl font-extrabold text-navy">{q.label}</p>
      )}

      <div className="truefalse-buttons">
        <button
          onClick={() => answer(true)}
          disabled={answered}
          className={`truefalse-btn is-yes ${answered && q.isMatch ? "is-revealed-correct" : ""} ${answered && selected === true && !q.isMatch ? "is-revealed-wrong" : ""}`}
        >
          ✓ Sí
        </button>
        <button
          onClick={() => answer(false)}
          disabled={answered}
          className={`truefalse-btn is-no ${answered && !q.isMatch ? "is-revealed-correct" : ""} ${answered && selected === false && q.isMatch ? "is-revealed-wrong" : ""}`}
        >
          ✗ No
        </button>
      </div>

      {answered && (
        <p className={`truefalse-feedback ${selected === q.isMatch ? "is-correct" : "is-wrong"}`}>
          {selected === q.isMatch ? "¡Correcto!" : `Incorrecto. La palabra era: ${q.image.word}`}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          Puntaje: {score} / {TOTAL}
        </span>
        {answered && (
          <button onClick={handleNext} className="btn btn-outline btn-sm">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
