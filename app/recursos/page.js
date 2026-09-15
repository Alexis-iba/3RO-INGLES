"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES, getAllVocab } from "@/lib/data";
import { shuffle } from "@/lib/shuffle";
import { ACTIVITY_ART } from "@/lib/activity-art";

// No todas las palabras de los audios (letras, algunos números y animales)
// tienen ilustración en el banco de actividades; para esas mostramos un
// respaldo (swatch de color, número grande o emoji) en vez de fallar.
const WORD_VISUAL_FALLBACK = {
  Orange: { kind: "swatch", value: "#f5821f" },
  Purple: { kind: "swatch", value: "#8b5cf6" },
  Pink: { kind: "swatch", value: "#ff6fa5" },
  Black: { kind: "swatch", value: "#22252b" },
  White: { kind: "swatch", value: "#ffffff" },
  Nine: { kind: "digit", value: "9" },
  Ten: { kind: "digit", value: "10" },
  Tiger: { kind: "emoji", value: "🐯" },
  Bear: { kind: "emoji", value: "🐻" },
  Zebra: { kind: "emoji", value: "🦓" },
  Giraffe: { kind: "emoji", value: "🦒" },
  Horse: { kind: "emoji", value: "🐴" },
  Sheep: { kind: "emoji", value: "🐑" },
  Duck: { kind: "emoji", value: "🦆" },
  Frog: { kind: "emoji", value: "🐸" },
};

// Los textos de "speak" vienen en minúsculas ("seven", "orange"...) salvo la
// primera palabra de cada lista, pero el banco de arte usa Mayúscula inicial.
function titleCase(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function WordVisual({ word }) {
  const key = titleCase(word);
  const art = ACTIVITY_ART[key];
  if (art) {
    return (
      <div className="relative mx-auto mb-2.5 h-24 w-24 overflow-hidden rounded-2xl">
        <Image src={`/activity-images/${art.file}`} alt="" fill sizes="96px" className="object-cover" />
      </div>
    );
  }
  const fallback = WORD_VISUAL_FALLBACK[key];
  if (fallback?.kind === "swatch") {
    return <div className="mx-auto mb-2.5 h-24 w-24 rounded-2xl border-4 border-white/20" style={{ background: fallback.value }} />;
  }
  if (fallback?.kind === "emoji") {
    return <div className="mb-2.5 text-6xl">{fallback.value}</div>;
  }
  // Letras del abecedario, números en palabra que no tienen dígito propio, etc.
  return (
    <div className="mx-auto mb-2.5 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 font-heading text-4xl font-extrabold">
      {fallback?.kind === "digit" ? fallback.value : key}
    </div>
  );
}

const TABS = [
  { id: "todos", label: "Todos" },
  { id: "audio", label: "Audios" },
  { id: "imprimible", label: "Imprimibles" },
  { id: "juego", label: "Juegos" },
];

// El navegador no da acceso a voces de terceros (como Duolingo): solo a las
// instaladas en el sistema/navegador. Elegimos la más natural disponible
// (las voces "Online (Natural)" de Edge o "Google" suenan más profesionales
// que la voz robótica por defecto).
const VOICE_RANK_PATTERNS = [/natural/i, /online/i, /google us english/i, /samantha|aria|jenny|emma|ava/i];

function pickBestVoice(voices) {
  const enVoices = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
  if (!enVoices.length) return null;
  for (const pattern of VOICE_RANK_PATTERNS) {
    const match = enVoices.find((v) => pattern.test(v.name));
    if (match) return match;
  }
  return enVoices.find((v) => v.lang === "en-US") || enVoices[0];
}

const WORD_PAUSE_MS = 550;

export default function RecursosPage() {
  const [filter, setFilter] = useState("todos");
  const [modalResource, setModalResource] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [printItems, setPrintItems] = useState(null);
  const cancelledRef = useRef(false);
  const voiceRef = useRef(null);
  const pauseTimeoutRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    function loadVoice() {
      voiceRef.current = pickBestVoice(window.speechSynthesis.getVoices());
    }
    loadVoice();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoice);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", loadVoice);
  }, []);

  const list = RESOURCES.filter((r) => filter === "todos" || r.type === filter);

  function speak(text, onEnd) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.8;
    utter.pitch = 1.05;
    if (voiceRef.current) utter.voice = voiceRef.current;
    utter.onend = () => {
      if (cancelledRef.current) return;
      pauseTimeoutRef.current = setTimeout(() => {
        if (!cancelledRef.current) onEnd?.();
      }, WORD_PAUSE_MS);
    };
    window.speechSynthesis.speak(utter);
  }

  function playFrom(resource, i) {
    const words = (resource.speak || "").split(",").map((w) => w.trim()).filter(Boolean);
    if (i >= words.length) {
      setPlaying(false);
      return;
    }
    setWordIndex(i);
    speak(words[i], () => playFrom(resource, i + 1));
  }

  function openModal(resource) {
    cancelledRef.current = false;
    setModalResource(resource);
    setWordIndex(0);
    setPlaying(true);
    playFrom(resource, 0);
  }

  function closeModal() {
    cancelledRef.current = true;
    clearTimeout(pauseTimeoutRef.current);
    setPlaying(false);
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setModalResource(null);
  }

  function togglePlayPause() {
    if (playing) {
      cancelledRef.current = true;
      clearTimeout(pauseTimeoutRef.current);
      window.speechSynthesis?.cancel();
      setPlaying(false);
    } else {
      cancelledRef.current = false;
      setPlaying(true);
      playFrom(modalResource, wordIndex);
    }
  }

  function replay() {
    cancelledRef.current = false;
    clearTimeout(pauseTimeoutRef.current);
    window.speechSynthesis?.cancel();
    setPlaying(true);
    playFrom(modalResource, 0);
  }

  function openPrintable(resource) {
    setPrintItems({ title: resource.title, vocab: shuffle(getAllVocab()).slice(0, 16) });
    setTimeout(() => window.print(), 100);
  }

  const words = modalResource ? (modalResource.speak || "").split(",").map((w) => w.trim()).filter(Boolean) : [];
  const progress = words.length ? Math.min(100, Math.round((wordIndex / words.length) * 100)) : 0;

  return (
    <div className="resources-page section-container py-8 md:py-12">
      <div className="mb-6">
        <span className="inline-block rounded-full bg-brand-yellow/20 px-3.5 py-1 text-xs font-black text-navy uppercase tracking-wider mb-2">
          MATERIALES & PRÁCTICA
        </span>
        <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Recursos para aprender más</h1>
        <p className="mt-1 text-navy/60 font-semibold">Materiales didácticos y actividades que complementan los libros.</p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`rounded-full px-5 py-2 text-sm font-extrabold transition-all duration-200 cursor-pointer ${
              filter === t.id 
                ? "bg-[#073471] text-white shadow-md" 
                : "bg-white text-navy border border-slate-200/80 hover:bg-slate-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((r) => (
          <div key={r.id} className="card overflow-hidden border border-slate-200/70 shadow-[0_4px_16px_rgba(7,52,113,0.06)] hover:shadow-[0_12px_28px_rgba(7,52,113,0.12)] hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="relative overflow-hidden bg-blue-light/50" style={r.image ? { aspectRatio: r.imageAspect || "3 / 2" } : { aspectRatio: "3 / 2" }}>
                {r.image ? (
                  <Image src={r.image} alt={r.title} fill sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-5xl bg-gradient-to-br from-blue-50 to-amber-50">{r.emoji}</div>
                )}
                {r.duration && (
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/70 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-bold text-white">
                    {r.duration}
                  </span>
                )}
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-black text-navy uppercase tracking-wider shadow-xs">
                  {r.type === "audio" ? "Audio" : r.type === "imprimible" ? "Ficha" : "Juego"}
                </span>
              </div>
              <div className="p-4">
                <h4 className="font-heading text-base font-extrabold text-navy line-clamp-2">{r.title}</h4>
              </div>
            </div>
            <div className="p-4 pt-0">
              {r.type === "audio" && (
                <button onClick={() => openModal(r)} className="btn btn-outline btn-sm btn-block rounded-xl font-extrabold hover:bg-brand-yellow/30 hover:border-brand-yellow cursor-pointer">
                  🔊 Escuchar palabras
                </button>
              )}
              {r.type === "imprimible" && (
                <button onClick={() => openPrintable(r)} className="btn btn-outline btn-sm btn-block rounded-xl font-extrabold hover:bg-brand-yellow/30 hover:border-brand-yellow cursor-pointer">
                  🖨 Ver e imprimir
                </button>
              )}
              {r.type === "juego" && (
                <Link href="/actividades" className="btn btn-primary btn-sm btn-block rounded-xl font-extrabold text-navy cursor-pointer">
                  🎮 Jugar ahora
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {modalResource && (
        <div className="fixed inset-0 z-[1000] grid place-items-center bg-navy/60 p-5" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="relative w-full max-w-sm rounded-3xl bg-navy p-7 text-center text-white">
            <button onClick={closeModal} className="absolute right-4 top-3.5 text-2xl">
              ✕
            </button>
            <WordVisual word={words[wordIndex]} />
            <h3 className="font-heading text-xl font-extrabold">{modalResource.title}</h3>
            <p className="mt-1.5 text-sm text-[#b9c3dd]">
              {playing ? `Diciendo: "${words[wordIndex] ? titleCase(words[wordIndex]) : ""}"` : "Pausado"}
            </p>
            <div className="my-4.5 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full bg-brand-yellow transition-all" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-center gap-2.5">
              <button onClick={replay} className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                ↺
              </button>
              <button onClick={togglePlayPause} className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                {playing ? "⏸" : "▶"}
              </button>
              <button onClick={closeModal} className="grid h-11 w-11 place-items-center rounded-full bg-white/10">
                ⏹
              </button>
            </div>
          </div>
        </div>
      )}

      {printItems &&
        typeof document !== "undefined" &&
        createPortal(
          <div id="print-area" className="hidden">
            <div className="p-5">
              <h2 className="font-heading text-xl font-extrabold">{printItems.title} — EnglishKids</h2>
              <div className="mt-4 grid grid-cols-4 gap-3.5">
                {printItems.vocab.map((v) => (
                  <div key={v.word} className="rounded-2xl border-2 border-dashed border-[#b7c2dd] px-3 py-4.5 text-center">
                    <div className="text-4xl">{v.emoji}</div>
                    <div className="mt-2 font-heading font-extrabold">{v.word}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
