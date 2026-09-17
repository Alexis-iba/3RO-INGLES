"use client";

import { useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { shuffle } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import { speakCorrect, speakIncorrect, speakResult } from "@/lib/voice-feedback";
import ActivityImage from "./ActivityImage";

const TOTAL = 8;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-scramble-history-v1";

function scrambleWord(word) {
  const letters = word.split("").map((ch, i) => ({ ch, id: `${i}-${ch}` }));
  let shuffled = shuffle(letters);
  if (letters.length > 1 && shuffled.map((l) => l.ch).join("") === word) {
    shuffled = shuffle(letters);
  }
  return shuffled;
}

export default function ScrambleGame() {
  const [round, setRound] = useState(() => pickRoundWords(ALL_VOCAB, readRoundHistory(HISTORY_KEY), TOTAL));
  const questions = round.items;
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [tray, setTray] = useState(() => scrambleWord(questions[0]?.word || ""));
  const [answer, setAnswer] = useState([]);
  const [checked, setChecked] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const current = questions[index];

  function pickLetter(tile) {
    if (checked) return;
    setTray((t) => t.filter((l) => l.id !== tile.id));
    setAnswer((a) => [...a, tile]);
  }
  function returnLetter(tile) {
    if (checked) return;
    setAnswer((a) => a.filter((l) => l.id !== tile.id));
    setTray((t) => [...t, tile]);
  }

  function check() {
    if (checked || answer.length !== current.word.length) return;
    setChecked(true);
    const built = answer.map((l) => l.ch).join("");
    const correct = built === current.word;
    if (correct) {
      setScore((s) => s + 1);
      speakCorrect();
    } else {
      speakIncorrect();
    }
  }

  function handleNext() {
    if (index + 1 < TOTAL) {
      const next = questions[index + 1];
      setTray(scrambleWord(next.word));
      setAnswer([]);
      setChecked(false);
      setIndex(index + 1);
    } else {
      setFinished(true);
      speakResult(score / TOTAL);
    }
  }

  function restart() {
    const nextRound = pickRoundWords(ALL_VOCAB, round.history, TOTAL);
    setRound(nextRound);
    setIndex(0);
    setScore(0);
    setTray(scrambleWord(nextRound.items[0]?.word || ""));
    setAnswer([]);
    setChecked(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="py-5 text-center">
        <div className="text-5xl">🔤</div>
        <h3 className="mt-2.5 font-heading text-xl font-extrabold">
          ¡Terminaste! Puntaje final: {score} / {TOTAL}
        </h3>
        <button onClick={restart} className="btn btn-primary mt-4">
          Jugar de nuevo
        </button>
      </div>
    );
  }

  const built = answer.map((l) => l.ch).join("");
  const isCorrect = built === current.word;

  return (
    <div className="scramble-game text-center">
      <div className="write-illustration"><ActivityImage word={current.word} /></div>
      <p className="font-bold text-navy/60">Ordena las letras para formar la palabra</p>

      <div className="scramble-answer">
        {answer.length === 0 && <span className="scramble-placeholder">Toca las letras de abajo</span>}
        {answer.map((tile) => (
          <button key={tile.id} onClick={() => returnLetter(tile)} disabled={checked} className="scramble-tile is-answer">
            {tile.ch}
          </button>
        ))}
      </div>

      <div className="scramble-tray">
        {tray.map((tile) => (
          <button key={tile.id} onClick={() => pickLetter(tile)} disabled={checked} className="scramble-tile">
            {tile.ch}
          </button>
        ))}
      </div>

      {!checked ? (
        <button onClick={check} disabled={answer.length !== current.word.length} className="btn btn-primary btn-sm mt-4">
          Verificar
        </button>
      ) : (
        <p className={`mt-4 font-extrabold ${isCorrect ? "text-brand-green" : "text-[#d64545]"}`}>
          {isCorrect ? "¡Correcto! 🎉" : `Casi. La respuesta era: ${current.word}`}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          Puntaje: {score} / {TOTAL}
        </span>
        {checked && (
          <button onClick={handleNext} className="btn btn-outline btn-sm">
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}
