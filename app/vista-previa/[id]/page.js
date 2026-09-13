"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BOOKS, getBookById } from "@/lib/data";

export default function VistaPreviaPage() {
  const params = useParams();
  const book = getBookById(params.id) || BOOKS[0];
  const stageRef = useRef(null);

  const spreads = useMemo(() => {
    const chunkSize = 4;
    const chunks = [];
    for (let i = 0; i < book.vocab.length; i += chunkSize) {
      chunks.push(book.vocab.slice(i, i + chunkSize));
    }
    return chunks.length ? chunks : [[]];
  }, [book]);

  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);

  function next() {
    setPage((p) => Math.min(spreads.length - 1, p + 1));
  }
  function prev() {
    setPage((p) => Math.max(0, p - 1));
  }
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      stageRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }

  const words = spreads[page];

  return (
    <div
      className="reader-page section-container py-8 md:py-12"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      tabIndex={-1}
    >
      <Link href={`/libros/${book.id}`} className="mb-5 inline-flex items-center gap-1.5 font-bold text-brand-blue hover:underline">
        ← Volver al libro
      </Link>

      <div className="card mb-4 flex flex-wrap items-center justify-between gap-3 px-4 py-2.5">
        <span className="font-heading text-sm font-extrabold text-navy">
          {page + 1} / {spreads.length}
        </span>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))} className="grid h-8 w-8 place-items-center rounded-lg bg-bg-page hover:bg-blue-light">
            −
          </button>
          <span className="w-12 text-center text-xs font-extrabold">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))} className="grid h-8 w-8 place-items-center rounded-lg bg-bg-page hover:bg-blue-light">
            +
          </button>
          <button onClick={toggleFullscreen} className="grid h-8 w-8 place-items-center rounded-lg bg-bg-page hover:bg-blue-light">
            ⛶
          </button>
        </div>
      </div>

      <div ref={stageRef} className="flex min-h-[420px] items-center justify-center gap-4 rounded-3xl bg-navy px-4 py-10">
        <button onClick={prev} aria-label="Página anterior" className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-white/10 text-lg text-white hover:bg-white/25">
          ←
        </button>

        <div
          style={{ transform: `scale(${zoom})` }}
          className="flex w-full max-w-[720px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl transition-transform sm:flex-row"
        >
          <div className="min-h-[300px] flex-1 bg-gradient-to-br from-[#fff6d9] to-[#ffe9a8] p-6">
            <div className="mb-3.5 font-heading text-xl font-extrabold text-navy">
              Unit {page + 1}
              <br />
              {book.title}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {words.map((w) => (
                <div key={w.word} className="card w-[calc(50%-5px)] p-3.5 text-center">
                  <div className="text-3xl">{w.emoji}</div>
                  <div className="mt-1 text-xs font-extrabold">{w.word}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-[300px] flex-1 border-t-2 border-dashed border-[#e6e9f2] p-6 sm:border-l-2 sm:border-t-0">
            <div className="mb-3.5 font-heading text-xl font-extrabold text-navy">Useful Words</div>
            <ul className="flex flex-col gap-3">
              {words.map((w) => (
                <li key={w.word} className="flex items-center gap-2.5 text-sm font-bold">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-light text-sm">{w.emoji}</span>
                  {w.word}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button onClick={next} aria-label="Página siguiente" className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-white/10 text-lg text-white hover:bg-white/25">
          →
        </button>
      </div>

      <div className="mt-4 flex gap-2.5 overflow-x-auto py-2">
        {spreads.map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i)}
            className={`flex h-[90px] w-[70px] flex-shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 bg-white text-sm font-extrabold shadow-softer ${
              i === page ? "border-brand-blue text-brand-blue" : "border-transparent text-navy/50"
            }`}
          >
            <span>📄</span>
            <span>{i + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
