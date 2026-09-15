"use client";

import { useEffect, useRef, useState } from "react";
import { WorkbookAnswers } from "@/components/WorkbookLeaf";
import { useParams, useRouter } from "next/navigation";
import { BOOKS, getBookById } from "@/lib/data";
import {
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  LayoutGrid,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import "./reader.css";

import WorkbookSpread from "@/components/WorkbookSpread";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import { WORKBOOK_PAGES } from "@/lib/workbooks";

const LESSONS = Array.from(
  { length: Math.ceil(WORKBOOK_PAGES.length / 2) },
  (_, i) => WORKBOOK_PAGES.slice(i * 2, i * 2 + 2).map(([title]) => title).join(" / ")
);

export default function VistaPreviaPage() {
  const params = useParams();
  const book = getBookById(params.id) || BOOKS[0];
  return <Reader key={book.id} book={book} />;
}

function Reader({ book }) {
  const router = useRouter();
  const stageRef = useRef(null);
  const [page, setPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState("next"); // "next" | "prev"
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showThumbs, setShowThumbs] = useState(false);
  const [message, setMessage] = useState("");
  const [answers, setAnswers] = useState({});

  // Touch swipe handling
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const onAnswer = (id, value) => setAnswers((prev) => ({ ...prev, [id]: value }));

  function goToPage(targetPage, direction = "next") {
    if (isFlipping || targetPage === page || targetPage < 0 || targetPage >= LESSONS.length) return;

    setFlipDirection(direction);
    setIsFlipping(true);

    setTimeout(() => {
      setPage(targetPage);
    }, 240);

    setTimeout(() => {
      setIsFlipping(false);
    }, 500);
  }

  function handlePrev() {
    if (page > 0) goToPage(page - 1, "prev");
  }

  function handleNext() {
    if (page < LESSONS.length - 1) goToPage(page + 1, "next");
  }

  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else if (stageRef.current?.requestFullscreen) {
        await stageRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        setMessage("Tu navegador no admite pantalla completa.");
      }
    } catch {
      setMessage("No se pudo abrir la pantalla completa.");
    }
  }

  function handleBack() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    router.push(`/libros/${book.id}`);
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }

  function handleTouchEnd(e) {
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 45 && Math.abs(diffY) < 60) {
      if (diffX > 0) handleNext();
      else handlePrev();
    }
  }

  const progressPercent = Math.round(((page * 2 + 2) / WORKBOOK_PAGES.length) * 100);

  return (
    <div className="book-preview-page">
      {/* =========================================================================
          NUEVA BARRA SUPERIOR INTEGRADA Y PROFESIONAL DEL LECTOR
         ========================================================================= */}
      <header className="reader-top-navbar">
        {/* Botón Volver 100% Funcional */}
        <button
          type="button"
          onClick={handleBack}
          className="reader-back-btn"
          aria-label="Volver a los detalles del libro"
        >
          <ArrowLeft size={18} />
          <span>Volver al libro</span>
        </button>

        {/* Título Central y Progreso */}
        <div className="reader-book-meta">
          <div className="flex items-center gap-2 justify-center">
            <BookOpen size={16} className="text-[#e30613]" />
            <h1 className="reader-book-title">{book.title}</h1>
            <span className="reader-grade-badge">3° Primaria</span>
          </div>

          {/* Barra de progreso de lectura */}
          <div className="reader-progress-track" title={`Progreso de lectura: ${progressPercent}%`}>
            <div
              className="reader-progress-fill"
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>

        {/* Barra de Herramientas Flotante */}
        <div className="reader-controls-cluster">
          {/* Miniaturas */}
          <button
            onClick={() => setShowThumbs((v) => !v)}
            aria-label="Mostrar miniaturas"
            aria-pressed={showThumbs}
            className={`reader-tool-btn ${showThumbs ? "is-active" : ""}`}
            title="Ver miniaturas de páginas"
          >
            <LayoutGrid size={17} />
          </button>

          {/* Contador de páginas */}
          <span className="reader-counter-pill" aria-live="polite">
            Págs. {page * 2 + 1}–{Math.min(page * 2 + 2, WORKBOOK_PAGES.length)} / {WORKBOOK_PAGES.length}
          </span>

          {/* Zoom */}
          <div className="reader-zoom-pill">
            <button
              aria-label="Alejar"
              disabled={zoom <= 0.75}
              onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.1).toFixed(1)))}
              title="Alejar"
            >
              <ZoomOut size={15} />
            </button>
            <span>{Math.round(zoom * 100)}%</span>
            <button
              aria-label="Acercar"
              disabled={zoom >= 1.4}
              onClick={() => setZoom((z) => Math.min(1.4, +(z + 0.1).toFixed(1)))}
              title="Acercar"
            >
              <ZoomIn size={15} />
            </button>
          </div>

          {/* Restablecer Zoom */}
          <button
            onClick={() => setZoom(1)}
            aria-label="Restablecer tamaño"
            title="Tamaño original"
            className="reader-tool-btn hidden sm:grid"
          >
            <RotateCcw size={15} />
          </button>

          {/* Pantalla Completa */}
          <button
            onClick={toggleFullscreen}
            aria-label="Pantalla completa"
            title="Pantalla completa"
            className="reader-tool-btn"
          >
            {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
          </button>
        </div>
      </header>

      {/* Visor del Libro */}
      <div
        className="book-reader"
        ref={stageRef}
        tabIndex={0}
        onKeyDown={(e) => {
          if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrev();
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
          }
        }}
      >
        {message && <p className="reader-error-msg">{message}</p>}

        <p className="reader-mobile-hint">
          👉 Desliza las páginas con el dedo hacia los lados para voltear la hoja.
        </p>

        {/* Escenario 3D del Libro Interactivo */}
        <div
          className="reader-stage-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botón Flecha Anterior */}
          <button
            className="reader-3d-arrow reader-prev-btn"
            disabled={page === 0 || isFlipping}
            onClick={handlePrev}
            aria-label="Página anterior"
          >
            ‹
          </button>

          {/* Contenedor del Libro 3D con Perspectiva y Efecto Page Flip */}
          <div className="reader-3d-book-container">
            <div
              className={`book-3d-wrapper ${isFlipping ? `is-flipping-${flipDirection}` : ""}`}
              style={{ transform: `scale(${zoom})` }}
            >
              {/* Lomo y Encuadernación 3D */}
              <div className="book-3d-spine-shadow" aria-hidden="true" />
              <div className="book-3d-center-fold" aria-hidden="true" />

              {/* Pliego Actual del Libro */}
              <div className="reader-sheet">
                <WorkbookSpread
                  book={book}
                  page={page}
                  answers={answers}
                  onAnswer={onAnswer}
                />
              </div>

              {/* Hoja 3D Flotante animada durante el giro */}
              {isFlipping && (
                <div className={`page-flip-leaf page-flip-${flipDirection}`}>
                  <div className="page-flip-front">
                    <div className="page-flip-shadow" />
                  </div>
                  <div className="page-flip-back">
                    <div className="page-flip-shadow" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Botón Flecha Siguiente */}
          <button
            className="reader-3d-arrow reader-next-btn"
            disabled={page === LESSONS.length - 1 || isFlipping}
            onClick={handleNext}
            aria-label="Página siguiente"
          >
            ›
          </button>
        </div>

        {/* Miniaturas de Páginas */}
        {showThumbs && (
          <div className="reader-thumbnails" aria-label="Miniaturas de la vista previa">
            {LESSONS.map((label, i) => (
              <button
                key={label}
                className={`thumb-btn ${page === i ? "selected" : ""}`}
                onClick={() => goToPage(i, i > page ? "next" : "prev")}
                aria-label={`Ver páginas ${i * 2 + 1} y ${i * 2 + 2}`}
                aria-current={page === i ? "page" : undefined}
              >
                <div className="thumbnail-paper" aria-hidden="true">
                  <WorkbookSpread book={book} page={i} miniature />
                </div>
                <span>
                  {i * 2 + 1}–{Math.min(i * 2 + 2, WORKBOOK_PAGES.length)}
                </span>
              </button>
            ))}
          </div>
        )}

        <p className="reader-caption">
          📖 {WORKBOOK_PAGES.length} páginas de actividades interactivas · {book.title} · Puedes escribir respuestas directamente en la pantalla.
        </p>
      </div>

      {/* Botón para Descargar en PDF */}
      <div className="reader-download">
        <DownloadPdfButton book={book} answers={answers} />
        <p>PDF imprimible de {book.pages} páginas. Incluye las respuestas que completaste.</p>
      </div>

      <WorkbookAnswers book={book} />
    </div>
  );
}
