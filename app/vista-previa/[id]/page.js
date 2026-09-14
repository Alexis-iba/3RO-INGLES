"use client";

import { useRef, useState } from "react";
import WorkbookLeaf, { WorkbookAnswers } from "@/components/WorkbookLeaf";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BOOKS, getBookById } from "@/lib/data";
import "./reader.css";

const LESSONS = ["Picture Dictionary / Match", "Choose / Complete", "Sort / Read", "Understand / Draw", "Speak / Review"];
const THEMES = { escuela: "#f6d974", animales: "#abd797", familia: "#ffc2ce", comida: "#ffd099", naturaleza: "#ace0be", colores: "#d6bafa", numeros: "#a9d8ff", cuerpo: "#ffc3c6", lugares: "#9eddd7", celebraciones: "#e3bcf8" };

function Spread({ book, page, miniature = false, answers = {}, onAnswer = () => {} }) {
  return <div className={`open-book${miniature ? " miniature-book" : ""}`} style={{ "--paper-accent": THEMES[book.category] || "#f6d974" }}>
    {[page * 2, page * 2 + 1].map(index => <WorkbookLeaf key={index} book={book} index={index} miniature={miniature} answers={answers} onAnswer={onAnswer} />)}
  </div>;
}

export default function VistaPreviaPage() {
  const params = useParams();
  const book = getBookById(params.id) || BOOKS[0];
  return <Reader key={book.id} book={book} />;
}

function Reader({ book }) {
  const stageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showThumbs, setShowThumbs] = useState(true);
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState({});
  const onAnswer = (id, value) => setAnswers(previous => ({...previous, [id]: value}));
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (stageRef.current?.requestFullscreen) await stageRef.current.requestFullscreen();
      else setMessage("Tu navegador no admite pantalla completa.");
    } catch { setMessage("No se pudo abrir la pantalla completa."); }
  }
  return <div className="book-preview-page">
    <Link className="reader-back" href={`/libros/${book.id}`}>← Volver al libro</Link>
    <div className="reader-heading"><h1>Vista previa del libro</h1><p>{book.title}</p></div>
    <div className="book-reader" ref={stageRef} onKeyDown={e => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); setPage(p => Math.max(0, p - 1)); }
      if (e.key === "ArrowRight") { e.preventDefault(); setPage(p => Math.min(4, p + 1)); }
    }}>
      <div className="reader-toolbar" role="toolbar" aria-label="Controles del libro">
        <button onClick={() => setShowThumbs(v => !v)} aria-label="Mostrar miniaturas" aria-pressed={showThumbs}>▤</button>
        <span className="reader-counter" aria-live="polite">Págs. {page * 2 + 1}–{page * 2 + 2} / 10</span>
        <div className="reader-zoom"><button aria-label="Alejar" disabled={zoom <= .7} onClick={() => setZoom(z => Math.max(.7, +(z - .1).toFixed(1)))}>−</button><span>{Math.round(zoom * 100)}%</span><button aria-label="Acercar" disabled={zoom >= 1.5} onClick={() => setZoom(z => Math.min(1.5, +(z + .1).toFixed(1)))}>+</button></div>
        <button onClick={() => setZoom(1)} aria-label="Restablecer tamaño" title="Restablecer tamaño">↺</button>
        <button onClick={toggleFullscreen} aria-label="Pantalla completa" title="Pantalla completa">⛶</button>
      </div>
      {message && <p role="status">{message}</p>}
      <p className="reader-mobile-hint">Desliza las páginas hacia los lados para leer y responder.</p>
      <div className="reader-stage">
        <button className="reader-arrow reader-prev" disabled={page === 0} onClick={() => setPage(p => p - 1)} aria-label="Página anterior">‹</button>
        <div className="reader-scroll" tabIndex={0} aria-label={`Vista ${page + 1}: ${LESSONS[page]}`}><div className="reader-sheet" style={{ width: `${zoom * 100}%` }}><Spread book={book} page={page} answers={answers} onAnswer={onAnswer} /></div></div>
        <button className="reader-arrow reader-next" disabled={page === 4} onClick={() => setPage(p => p + 1)} aria-label="Página siguiente">›</button>
      </div>
      {showThumbs && <div className="reader-thumbnails" aria-label="Miniaturas de la vista previa">{LESSONS.map((label, i) => <button key={label} className={page === i ? "selected" : ""} onClick={() => setPage(i)} aria-label={`Ver páginas ${i * 2 + 1} y ${i * 2 + 2}: ${label}`} aria-current={page === i ? "page" : undefined}><div className="thumbnail-paper" aria-hidden="true"><Spread book={book} page={i} miniature /></div><span>{i * 2 + 1}–{i * 2 + 2}</span></button>)}</div>}
      <p className="reader-caption">10 páginas de actividades · {book.title} · Escribe y selecciona tus respuestas. Para dibujar, usa tu cuaderno.</p>
    </div>
    <WorkbookAnswers book={book} />
  </div>;
}
