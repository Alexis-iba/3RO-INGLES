"use client";

import { useState } from "react";
import { getAllVocab } from "@/lib/data";
import { shuffle } from "@/lib/shuffle";

const ALL_VOCAB = getAllVocab();
const COUNT = 6;

function buildRound() {
  const items = shuffle(ALL_VOCAB).slice(0, COUNT);
  return {
    items,
    words: shuffle(items),
    images: shuffle(items),
  };
}

export default function MatchGame() {
  const [round, setRound] = useState(buildRound);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shakeWord, setShakeWord] = useState(null);
  const [shakeImage, setShakeImage] = useState(null);

  const done = matched.length === COUNT;

  function attemptMatch(word, image) {
    if (word === image) {
      setMatched((m) => [...m, word]);
      setSelectedWord(null);
      setSelectedImage(null);
    } else {
      setShakeWord(word);
      setShakeImage(image);
      setTimeout(() => {
        setShakeWord(null);
        setShakeImage(null);
        setSelectedWord(null);
        setSelectedImage(null);
      }, 400);
    }
  }

  function pickWord(word) {
    if (matched.includes(word)) return;
    setSelectedWord(word);
    if (selectedImage) attemptMatch(word, selectedImage);
  }
  function pickImage(word) {
    if (matched.includes(word)) return;
    setSelectedImage(word);
    if (selectedWord) attemptMatch(selectedWord, word);
  }

  function restart() {
    setRound(buildRound());
    setSelectedWord(null);
    setSelectedImage(null);
    setMatched([]);
  }

  function itemClass(word, isSelected) {
    if (matched.includes(word)) return "bg-[#e3f7ee] border-brand-green opacity-60 pointer-events-none";
    if (shakeWord === word || shakeImage === word) return "border-[#e05555] animate-shake";
    if (isSelected) return "border-brand-blue bg-blue-light";
    return "border-transparent hover:border-blue-light";
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2.5">
          {round.words.map((w) => (
            <button
              key={w.word}
              onClick={() => pickWord(w.word)}
              className={`rounded-xl border-2 bg-bg-page px-3.5 py-3.5 text-center text-sm font-bold ${itemClass(w.word, selectedWord === w.word)}`}
            >
              {w.word}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          {round.images.map((w) => (
            <button
              key={w.word}
              onClick={() => pickImage(w.word)}
              className={`rounded-xl border-2 bg-bg-page px-3.5 py-3.5 text-center text-3xl ${itemClass(w.word, selectedImage === w.word)}`}
            >
              {w.emoji}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm font-extrabold text-navy/60">
          Emparejados: {matched.length} / {COUNT}
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
