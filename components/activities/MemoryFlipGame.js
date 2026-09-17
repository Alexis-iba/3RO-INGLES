"use client";

import { useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { shuffle } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import { speakCorrect, speakIncorrect, speakResult } from "@/lib/voice-feedback";
import ActivityImage from "./ActivityImage";

const PAIRS = 6;
const ALL_VOCAB = getActivityVocab();
const HISTORY_KEY = "englishkids-memory-history-v1";

function buildRound(history) {
  const { items, history: nextHistory } = pickRoundWords(ALL_VOCAB, history, PAIRS);
  const cards = shuffle(
    items.flatMap((v) => [
      { key: `${v.word}-word`, word: v.word, type: "word" },
      { key: `${v.word}-image`, word: v.word, type: "image" },
    ])
  );
  return { cards, history: nextHistory };
}

export default function MemoryFlipGame() {
  const [round, setRound] = useState(() => buildRound(readRoundHistory(HISTORY_KEY)));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const done = matched.size === PAIRS;

  function flipCard(index) {
    if (locked || flipped.includes(index) || matched.has(round.cards[index].word)) return;
    const next = [...flipped, index];
    setFlipped(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next;
      const cardA = round.cards[a];
      const cardB = round.cards[b];
      if (cardA.word === cardB.word) {
        speakCorrect();
        const willFinish = matched.size + 1 === PAIRS;
        setMatched((prev) => new Set(prev).add(cardA.word));
        setFlipped([]);
        if (willFinish) speakResult(1, { delay: 700 });
      } else {
        speakIncorrect();
        setLocked(true);
        setTimeout(() => {
          setFlipped([]);
          setLocked(false);
        }, 800);
      }
    }
  }

  function restart() {
    setRound(buildRound(round.history));
    setFlipped([]);
    setMatched(new Set());
    setMoves(0);
    setLocked(false);
  }

  return (
    <div className="memory-game">
      <div className="memory-grid">
        {round.cards.map((card, i) => {
          const isMatched = matched.has(card.word);
          const isFlipped = isMatched || flipped.includes(i);
          return (
            <button
              key={card.key}
              onClick={() => flipCard(i)}
              disabled={isMatched}
              aria-label={isFlipped ? (card.type === "word" ? card.word : `Imagen: ${card.word}`) : "Carta boca abajo"}
              className={`memory-card ${isFlipped ? "is-flipped" : ""} ${isMatched ? "is-matched" : ""}`}
            >
              {isFlipped ? (
                card.type === "word" ? (
                  <span className="memory-card-word">{card.word}</span>
                ) : (
                  <ActivityImage word={card.word} decorative sizes="90px" />
                )
              ) : (
                <span className="memory-card-back">?</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          {done ? `¡Completado en ${moves} intentos! 🎉` : `Pares encontrados: ${matched.size} / ${PAIRS}`}
        </span>
        {done && (
          <button onClick={restart} className="btn btn-outline btn-sm">
            Jugar de nuevo
          </button>
        )}
      </div>
    </div>
  );
}
