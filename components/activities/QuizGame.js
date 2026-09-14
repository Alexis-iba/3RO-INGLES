"use client";

import { useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { createQuizRound, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-quiz-history-v1";

export default function QuizGame() {
  const [round, setRound] = useState(() => createQuizRound(ALL_VOCAB, readRoundHistory(HISTORY_KEY), TOTAL));
  const { questions } = round;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const q = questions[index];

  function handleAnswer(word) {
    if (selected) return;
    setSelected(word);
    if (word === q.correct.word) setScore((s) => s + 1);
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
    setRound(createQuizRound(ALL_VOCAB, round.history, TOTAL));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">🏆</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">
          ¡Terminaste! Puntaje final: {score} / {TOTAL}
        </h3>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  const shownAnswer = selected;
  const isCorrect = shownAnswer === q.correct.word;

  return (
    <div className="quiz-exercise">
      <p className="mb-3.5 font-extrabold">
        {index + 1}. {q.question}
      </p>
      <div className="quiz-demo-row">
        <div className="quiz-demo-image">
          <ActivityImage word={q.correct.word} priority />
        </div>

        <div className="quiz-demo-options">
          {q.options.map((o, i) => {
            const isThisCorrect = o.word === q.correct.word;
            const isSelected = o.word === shownAnswer;
            let cls = "bg-bg-page border-transparent hover:border-blue-light";
            if (shownAnswer) {
              if (isThisCorrect) cls = "bg-[#e3f7ee] border-brand-green text-[#1c7a4d]";
              else if (isSelected) cls = "bg-[#fdeaea] border-[#e05555] text-[#b02a2a]";
            }
            return (
              <button
                key={o.word}
                onClick={() => handleAnswer(o.word)}
                disabled={!!selected}
                data-correct={!!shownAnswer && isThisCorrect}
                className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-bold ${cls}`}
              >
                {String.fromCharCode(65 + i)}) {o.word}
              </button>
            );
          })}
        </div>

        {shownAnswer ? (
          <div role="status" className={`quiz-demo-feedback ${isCorrect ? "is-correct" : "is-wrong"}`}>
            <span className="quiz-demo-feedback-title">
              {isCorrect ? (
                <>
                  <span className="quiz-demo-feedback-check">✓</span> ¡Correcto!
                </>
              ) : (
                "Incorrecto"
              )}
            </span>
            <span className="text-sm font-bold">
              Respuesta: {q.correct.word}
              <ActivityImage word={q.correct.word} decorative className="activity-feedback-art" sizes="36px" />
            </span>
          </div>
        ) : (
          <div className="quiz-demo-feedback is-placeholder">
            <span className="text-2xl">🤔</span>
            <span className="text-sm font-bold">Elige una respuesta</span>
          </div>
        )}
      </div>

      <div className="quiz-controls mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          {`Puntaje: ${score} / ${TOTAL}`}
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
