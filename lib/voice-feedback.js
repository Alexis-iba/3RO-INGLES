"use client";

// Voz de retroalimentación (estilo Duolingo) para las actividades.
//
// No usamos la síntesis de voz del navegador (window.speechSynthesis) porque
// depende de que el sistema operativo tenga instalada una voz en español; en
// Windows sin ese paquete de idioma, termina hablando en inglés. En su lugar,
// reproducimos clips de audio pre-grabados en español (generados una sola vez
// con gTTS), que suenan igual en cualquier computadora sin configuración extra.

const AUDIO_BASE = "/audio/feedback";

const GOOD_SCORE_FILES = ["excelente.mp3", "muy-bien.mp3"];
const LOW_SCORE_FILE = "sigue-aprendiendo.mp3";
const GOOD_SCORE_THRESHOLD = 0.6;

const audioCache = new Map();

function getAudio(file) {
  if (typeof window === "undefined") return null;
  let audio = audioCache.get(file);
  if (!audio) {
    audio = new Audio(`${AUDIO_BASE}/${file}`);
    audioCache.set(file, audio);
  }
  return audio;
}

function play(file) {
  const audio = getAudio(file);
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function speakCorrect() {
  play("correcto.mp3");
}

export function speakIncorrect() {
  play("incorrecto.mp3");
}

// ratio: fracción de aciertos (0 a 1). delay: ms de espera antes de sonar,
// útil cuando el resultado final se anuncia justo después de un "¡Correcto!".
export function speakResult(ratio, { delay = 0 } = {}) {
  const file = ratio >= GOOD_SCORE_THRESHOLD
    ? GOOD_SCORE_FILES[Math.floor(Math.random() * GOOD_SCORE_FILES.length)]
    : LOW_SCORE_FILE;
  if (delay > 0) setTimeout(() => play(file), delay);
  else play(file);
}
