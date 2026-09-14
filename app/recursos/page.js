"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { RESOURCES, getAllVocab } from "@/lib/data";
import { shuffle } from "@/lib/shuffle";

const TABS = [
  { id: "todos", label: "Todos" },
  { id: "video", label: "Videos" },
  { id: "imprimible", label: "Imprimibles" },
  { id: "juego", label: "Juegos" },
];

export default function RecursosPage() {
  const [filter, setFilter] = useState("todos");
  const [modalResource, setModalResource] = useState(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [printItems, setPrintItems] = useState(null);
  const cancelledRef = useRef(false);

  const list = RESOURCES.filter((r) => filter === "todos" || r.type === filter);

  function speak(text, onEnd) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      onEnd?.();
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.9;
    utter.onend = () => !cancelledRef.current && onEnd?.();
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
    setPlaying(false);
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    setModalResource(null);
  }

  function togglePlayPause() {
    if (playing) {
      cancelledRef.current = true;
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
      <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Recursos para aprender más</h1>
      <p className="mt-2 text-navy/60">Materiales adicionales que complementan los libros.</p>

      <div className="mt-7 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`rounded-full px-5 py-2.5 text-sm font-extrabold shadow-softer ${
              filter === t.id ? "bg-brand-blue text-white" : "bg-white text-navy"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
        {list.map((r) => (
          <div key={r.id} className="card overflow-hidden">
            <div className="relative overflow-hidden bg-blue-light" style={r.image ? { aspectRatio: r.imageAspect || "3 / 2" } : undefined}>
              {r.image ? (
                <Image src={r.image} alt={r.title} fill sizes="(max-width: 767px) 50vw, 33vw" className="object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl">{r.emoji}</div>
              )}
              {r.duration && (
                <span className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-[11px] text-white">
                  {r.duration}
                </span>
              )}
            </div>
            <div className="p-3.5">
              <h4 className="font-heading text-sm font-extrabold">{r.title}</h4>
              {r.type === "video" && (
                <button onClick={() => openModal(r)} className="btn btn-outline btn-sm btn-block mt-2.5">
                  ▶ Reproducir
                </button>
              )}
              {r.type === "imprimible" && (
                <button onClick={() => openPrintable(r)} className="btn btn-outline btn-sm btn-block mt-2.5">
                  🖨 Ver e imprimir
                </button>
              )}
              {r.type === "juego" && (
                <Link href="/actividades" className="btn btn-outline btn-sm btn-block mt-2.5">
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
            {modalResource.image ? (
              <div className="relative mx-auto mb-2.5 h-24 w-24 overflow-hidden rounded-2xl">
                <Image src={modalResource.image} alt={modalResource.title} fill sizes="96px" className="object-cover" />
              </div>
            ) : (
              <div className="mb-2.5 text-6xl">{modalResource.emoji}</div>
            )}
            <h3 className="font-heading text-xl font-extrabold">{modalResource.title}</h3>
            <p className="mt-1.5 text-sm text-[#b9c3dd]">
              {playing ? `Diciendo: "${words[wordIndex] || ""}"` : "Pausado"}
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
