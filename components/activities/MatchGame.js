"use client";

import { useEffect, useState } from "react";
import { getActivityVocab } from "@/lib/activity-vocab";
import { shuffle } from "@/lib/shuffle";
import { pickRoundWords, readRoundHistory, writeRoundHistory } from "@/lib/quiz-round";
import { speakCorrect, speakIncorrect, speakResult } from "@/lib/voice-feedback";
import ActivityImage from "./ActivityImage";
import { ACTIVITY_ART } from "@/lib/activity-art";

const ALL_VOCAB = getActivityVocab();
const COUNT = 6;
const HISTORY_KEY = "englishkids-match-history-v1";

function buildRound(history) {
  const { items, history: nextHistory } = pickRoundWords(ALL_VOCAB, history, COUNT);
  return {
    items,
    words: shuffle(items),
    images: shuffle(items),
    history: nextHistory,
  };
}

export default function MatchGame() {
  const [round, setRound] = useState(() => buildRound(readRoundHistory(HISTORY_KEY)));
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matched, setMatched] = useState([]);
  const [shakeWord, setShakeWord] = useState(null);
  const [shakeImage, setShakeImage] = useState(null);

  useEffect(() => {
    writeRoundHistory(HISTORY_KEY, round.history);
  }, [round]);

  const done = matched.length === COUNT;

  function attemptMatch(word, image) {
    if (word === image) {
      speakCorrect();
      const willFinish = matched.length + 1 === COUNT;
      setMatched((m) => [...m, word]);
      setSelectedWord(null);
      setSelectedImage(null);
      if (willFinish) speakResult(1, { delay: 700 });
    } else {
      speakIncorrect();
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
    setRound(buildRound(round.history));
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
      <div className="match-illustrated-grid grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-2.5">
          {round.words.map((w) => (
            <button
              key={w.word}
              onClick={() => pickWord(w.word)}
              disabled={matched.includes(w.word)}
              aria-pressed={selectedWord === w.word || matched.includes(w.word)}
              className={`match-word-tile rounded-xl border-2 bg-bg-page px-3.5 text-center text-sm font-bold ${itemClass(w.word, selectedWord === w.word)}`}
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
              disabled={matched.includes(w.word)}
              aria-label={`Imagen: ${ACTIVITY_ART[w.word].alt}`}
              aria-pressed={selectedImage === w.word || matched.includes(w.word)}
              className={`match-image-tile rounded-xl border-2 bg-bg-page text-center ${itemClass(w.word, selectedImage === w.word)}`}
            >
              <ActivityImage word={w.word} decorative sizes="104px" />
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
