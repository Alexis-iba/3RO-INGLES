"use client";

import { useRef, useState } from "react";
import { WorkbookAnswers } from "@/components/WorkbookLeaf";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BOOKS, getBookById } from "@/lib/data";
import "./reader.css";

import WorkbookSpread from '@/components/WorkbookSpread';
import DownloadPdfButton from '@/components/DownloadPdfButton';
import { WORKBOOK_PAGES } from '@/lib/workbooks';

const LESSONS = Array.from({ length: Math.ceil(WORKBOOK_PAGES.length / 2) }, (_, i) => WORKBOOK_PAGES.slice(i * 2, i * 2 + 2).map(([title]) => title).join(" / "));
export default function VistaPreviaPage() {
  const params = useParams();
  const book = getBookById(params.id) || BOOKS[0];
  return <Reader key={book.id} book={book} />;
}

function Reader({ book }) {
  const stageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showThumbs, setShowThumbs] = useState(false);
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
      if (e.key === "ArrowRight") { e.preventDefault(); setPage(p => Math.min(LESSONS.length - 1, p + 1)); }
    }}>
      <div className="reader-toolbar" role="toolbar" aria-label="Controles del libro">
        <button onClick={() => setShowThumbs(v => !v)} aria-label="Mostrar miniaturas" aria-pressed={showThumbs}>▤</button>
        <span className="reader-counter" aria-live="polite">Págs. {page * 2 + 1}–{page * 2 + 2} / {WORKBOOK_PAGES.length}</span>
        <div className="reader-zoom"><button aria-label="Alejar" disabled={zoom <= .7} onClick={() => setZoom(z => Math.max(.7, +(z - .1).toFixed(1)))}>−</button><span>{Math.round(zoom * 100)}%</span><button aria-label="Acercar" disabled={zoom >= 1.5} onClick={() => setZoom(z => Math.min(1.5, +(z + .1).toFixed(1)))}>+</button></div>
        <button onClick={() => setZoom(1)} aria-label="Restablecer tamaño" title="Restablecer tamaño">↺</button>
        <button onClick={toggleFullscreen} aria-label="Pantalla completa" title="Pantalla completa">⛶</button>
      </div>
      {message && <p role="status">{message}</p>}
      <p className="reader-mobile-hint">Desliza las páginas hacia los lados para leer y responder.</p>
      <div className="reader-stage">
        <button className="reader-arrow reader-prev" disabled={page === 0} onClick={() => setPage(p => p - 1)} aria-label="Página anterior">‹</button>
        <div className="reader-scroll" tabIndex={0} aria-label={`Vista ${page + 1}: ${LESSONS[page]}`}><div className="reader-sheet" style={{ width: `${zoom * 100}%` }}><WorkbookSpread book={book} page={page} answers={answers} onAnswer={onAnswer} /></div></div>
        <button className="reader-arrow reader-next" disabled={page === LESSONS.length - 1} onClick={() => setPage(p => p + 1)} aria-label="Página siguiente">›</button>
      </div>
      {showThumbs && <div className="reader-thumbnails" aria-label="Miniaturas de la vista previa">{LESSONS.map((label, i) => <button key={label} className={page === i ? "selected" : ""} onClick={() => setPage(i)} aria-label={`Ver páginas ${i * 2 + 1} y ${i * 2 + 2}: ${label}`} aria-current={page === i ? "page" : undefined}><div className="thumbnail-paper" aria-hidden="true"><WorkbookSpread book={book} page={i} miniature /></div><span>{i * 2 + 1}–{i * 2 + 2}</span></button>)}</div>}
      <p className="reader-caption">{WORKBOOK_PAGES.length} páginas de actividades · {book.title} · Escribe y selecciona tus respuestas. Para dibujar, usa tu cuaderno.</p>
    </div>
    <div className="reader-download"><DownloadPdfButton book={book} answers={answers} /><p>PDF de {book.pages} páginas. Incluye las respuestas que escribiste en esta sesión.</p></div>
    <WorkbookAnswers book={book} />
  </div>;
}
