import { pickOptions } from "./shuffle.js";

const PROMPTS = {
  "Animals Around Us": "¿Qué animal es?",
  "My Family": "¿Quién aparece en la imagen?",
  "Colors and Shapes": "¿Qué color o figura es?",
  "Numbers Everywhere": "¿Qué número es?",
  "My Amazing Body": "¿Qué parte del cuerpo es?",
  "Places I Know": "¿Qué lugar es?",
  "My World in English": "¿Qué saludo corresponde a la imagen?",
  "Special Celebrations": "¿Qué celebración u objeto es?",
};

// Elige `count` palabras del banco completo sin repetir hasta agotarlo, y evita
// que la ronda recién terminada se repita de inmediato al renovarse el banco.
// Reutilizable por cualquier actividad (quiz, memorama, escuchar, escribir).
export function pickRoundWords(vocabulary, history = {}, count = 8) {
  const pool = [...new Map(vocabulary.map((item) => [item.word, item])).values()];
  const validWords = new Set(pool.map(({ word }) => word));
  const validList = (value) => Array.isArray(value) ? value.filter((word) => validWords.has(word)) : [];
  let used = new Set(validList(history?.usedWords));
  const previousRound = new Set(validList(history?.previousRound));
  const chosen = [];
  const chosenWords = new Set();

  while (chosen.length < Math.min(count, pool.length)) {
    let available = pool.filter(({ word }) => !used.has(word) && !chosenWords.has(word));
    if (!available.length) {
      used = new Set();
      available = pool.filter(({ word }) => !chosenWords.has(word));
    }
    const fresh = available.filter(({ word }) => !previousRound.has(word));
    const candidates = fresh.length ? fresh : available;
    const entry = candidates[Math.floor(Math.random() * candidates.length)];
    chosen.push(entry);
    chosenWords.add(entry.word);
    used.add(entry.word);
  }

  return {
    items: chosen,
    history: { usedWords: [...used], previousRound: [...chosenWords] },
  };
}

export function createQuizRound(vocabulary, history = {}, count = 8) {
  const pool = [...new Map(vocabulary.map((item) => [item.word, item])).values()];
  const { items: chosen, history: nextHistory } = pickRoundWords(vocabulary, history, count);

  return {
    questions: chosen.map((correct) => {
      const sameBook = pool.filter(({ book }) => book === correct.book);
      return {
        correct,
        question: PROMPTS[correct.book] || "¿Qué es esto?",
        options: pickOptions(sameBook.length >= 4 ? sameBook : pool, correct, 4),
      };
    }),
    history: nextHistory,
  };
}

// Persistencia compartida del historial de cada actividad (una clave por juego),
// para que ninguna repita palabras antes de agotar el banco de 87 ilustraciones.
const memoryHistories = {};

export function readRoundHistory(key) {
  try {
    return JSON.parse(window.sessionStorage.getItem(key)) || memoryHistories[key] || {};
  } catch {
    return memoryHistories[key] || {};
  }
}

export function writeRoundHistory(key, history) {
  memoryHistories[key] = history;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(history));
  } catch {
    // sessionStorage no disponible; el historial sigue viviendo en memoria durante la sesión.
  }
}
