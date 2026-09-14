import { getAllVocab } from "./data";
import readyWords from "./activity-art-ready.json";

// Las palabras se incorporan cuando su ilustración ya está guardada y lista.
// El vocabulario completo de los libros permanece en data.js.
export function getActivityVocab() {
  const ready = new Set(readyWords);
  return getAllVocab().filter(({ word }) => ready.has(word));
}
