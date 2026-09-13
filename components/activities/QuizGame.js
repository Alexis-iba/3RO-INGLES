"use client";

import { useMemo, useState } from "react";
import { getAllVocab } from "@/lib/data";
import { shuffle, pickOptions } from "@/lib/shuffle";

const TOTAL = 8;
const ALL_VOCAB = getAllVocab();

// Preguntas con ilustración (OpenMoji) disponible, agrupadas por libro para
// generar opciones del mismo tema (p. ej. Lion junto a Cat/Dog/Elephant).
const ILLUSTRATED = [
  { word: "Lion", book: "Animals Around Us", art: "lion", question: "¿Qué animal es?" },
  { word: "Elephant", book: "Animals Around Us", art: "elephant", question: "¿Qué animal es?" },
  { word: "Apple", book: "Food and Fun", art: "apple", question: "¿Qué es esto?" },
  { word: "Pizza", book: "Food and Fun", art: "pizza", question: "¿Qué es esto?" },
  { word: "Tree", book: "Nature Around Us", art: "tree", question: "¿Qué es esto?" },
  { word: "Sun", book: "Nature Around Us", art: "sun", question: "¿Qué es esto?" },
  { word: "School", book: "Places I Know", art: "school", question: "¿Qué lugar es?" },
  { word: "Family", book: "My Family", art: "family", question: "¿Qué es esto?" },
];

function buildQuestion(entry) {
  const sameBook = ALL_VOCAB.filter((v) => v.book === entry.book);
  const correct = sameBook.find((v) => v.word === entry.word) || sameBook[0];
  const options = pickOptions(sameBook.length >= 4 ? sameBook : ALL_VOCAB, correct, 4);
  return { ...entry, correct, options };
}

// La primera pregunta siempre es el León (calca la referencia); las
// siguientes se toman al azar del resto del set ilustrado.
function buildQuestions() {
  const [first, ...rest] = ILLUSTRATED;
  const chosen = [first, ...shuffle(rest)];
  const list = [];
  for (let i = 0; i < TOTAL; i++) list.push(chosen[i % chosen.length]);
  return list.map(buildQuestion);
}

export default function QuizGame() {
  const [questions, setQuestions] = useState(buildQuestions);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

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
    setQuestions(buildQuestions());
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

  const isCorrect = selected === q.correct.word;

  return (
    <div>
      <p className="mb-3.5 font-extrabold">
        {index + 1}. {q.question}
      </p>
      <div className="quiz-demo-row">
        <div className="quiz-demo-image">
          <img src={`/illustrations/${q.art}.svg`} alt={q.correct.word} />
        </div>

        <div className="quiz-demo-options">
          {q.options.map((o, i) => {
            const isThisCorrect = o.word === q.correct.word;
            const isSelected = o.word === selected;
            let cls = "bg-bg-page border-transparent hover:border-blue-light";
            if (selected) {
              if (isThisCorrect) cls = "bg-[#e3f7ee] border-brand-green text-[#1c7a4d]";
              else if (isSelected) cls = "bg-[#fdeaea] border-[#e05555] text-[#b02a2a]";
            }
            return (
              <button
                key={o.word}
                onClick={() => handleAnswer(o.word)}
                className={`rounded-xl border-2 px-4 py-3 text-left text-sm font-bold ${cls}`}
              >
                {String.fromCharCode(65 + i)}) {o.word}
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className={`quiz-demo-feedback ${isCorrect ? "is-correct" : "is-wrong"}`}>
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
              Es un {q.correct.word} {q.correct.emoji}
            </span>
          </div>
        ) : (
          <div className="quiz-demo-feedback is-placeholder">
            <span className="text-2xl">🤔</span>
            <span className="text-sm font-bold">Elige una respuesta</span>
          </div>
        )}
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
