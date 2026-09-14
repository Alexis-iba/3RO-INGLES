"use client";

import { useRef, useState } from "react";
import UiIcon from "./icons/UiIcon";

const PAGE_W = 794;
const PAGE_H = 1123;
const COVER_W = 1040;
const COVER_H = 720;
const MARGIN = 46;
const HEADER_H = 54;
const FOOTER_H = 34;

function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

export default function DownloadPdfButton({ book }) {
  const [status, setStatus] = useState("idle");
  const vocabPagesRef = useRef(null);
  const closingRef = useRef(null);
  const vocabChunks = chunk(book.vocab || [], 6);

  async function handleDownload() {
    if (status === "loading") return;
    setStatus("loading");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);

      const doc = new jsPDF({ unit: "px", format: [COVER_W, COVER_H], orientation: "l", compress: true });

      const coverEl = document.getElementById("pdf-cover");
      const infoEl = document.getElementById("pdf-info");
      const learnEl = document.getElementById("pdf-learn");
      const vocabEls = vocabPagesRef.current ? Array.from(vocabPagesRef.current.children) : [];
      const closingEl = closingRef.current;

      const sections = [
        { el: coverEl, kind: "bookcover" },
        { el: infoEl, kind: "content" },
        { el: learnEl, kind: "content" },
        ...vocabEls.map((el) => ({ el, kind: "content" })),
        { el: closingEl, kind: "closing" },
      ].filter((s) => s.el);

      const total = sections.length;

      for (let i = 0; i < sections.length; i++) {
        const { el, kind } = sections[i];
        const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#ffffff", useCORS: true });

        if (kind === "bookcover") {
          const maxW = COVER_W - MARGIN;
          const maxH = COVER_H - MARGIN;
          const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
          const w = canvas.width * ratio;
          const h = canvas.height * ratio;
          doc.setFillColor("#f5fcff");
          doc.rect(0, 0, COVER_W, COVER_H, "F");
          doc.addImage(canvas.toDataURL("image/png"), "PNG", (COVER_W - w) / 2, (COVER_H - h) / 2, w, h);
        } else if (kind === "closing") {
          doc.addPage([PAGE_W, PAGE_H], "p");
          const maxW = PAGE_W - MARGIN;
          const maxH = PAGE_H - MARGIN;
          const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
          const w = canvas.width * ratio;
          const h = canvas.height * ratio;
          doc.setFillColor("#f5fcff");
          doc.rect(0, 0, PAGE_W, PAGE_H, "F");
          doc.addImage(canvas.toDataURL("image/png"), "PNG", (PAGE_W - w) / 2, (PAGE_H - h) / 2, w, h);
        } else {
          doc.addPage([PAGE_W, PAGE_H], "p");
          doc.setTextColor("#073471");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(11);
          doc.text(book.title, MARGIN / 2, 30);
          doc.setTextColor("#8a99b8");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.text("EnglishKids", PAGE_W - MARGIN / 2, 30, { align: "right" });
          doc.setDrawColor("#dcebf7");
          doc.line(MARGIN / 2, HEADER_H - 14, PAGE_W - MARGIN / 2, HEADER_H - 14);

          const maxW = PAGE_W - MARGIN;
          const maxH = PAGE_H - HEADER_H - FOOTER_H;
          const ratio = Math.min(maxW / canvas.width, maxH / canvas.height);
          const w = canvas.width * ratio;
          const h = canvas.height * ratio;
          doc.addImage(canvas.toDataURL("image/png"), "PNG", (PAGE_W - w) / 2, HEADER_H, w, h);

          doc.setDrawColor("#dcebf7");
          doc.line(MARGIN / 2, PAGE_H - FOOTER_H + 10, PAGE_W - MARGIN / 2, PAGE_H - FOOTER_H + 10);
          doc.setTextColor("#8a99b8");
          doc.setFontSize(9);
          doc.text(`Página ${i + 1} de ${total}`, PAGE_W / 2, PAGE_H - 14, { align: "center" });
        }
      }

      doc.save(`${book.id}-englishkids.pdf`);
      setStatus("done");
    } catch (err) {
      console.error("No se pudo generar el PDF", err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 2200);
    }
  }

  return (
    <>
      <button type="button" onClick={handleDownload} className="btn-download" disabled={status === "loading"}>
        <UiIcon name="download" size={18} />
        {status === "loading" ? "Generando PDF..." : status === "done" ? "¡Listo! Descargado" : status === "error" ? "Ocurrió un error" : "Descargar (PDF)"}
      </button>

      {/* Plantillas ocultas: se capturan con html2canvas para armar el PDF, no se ven en pantalla. */}
      <div style={{ position: "fixed", left: -99999, top: 0, width: PAGE_W, display: "block", padding: 0 }} aria-hidden="true">
        <div ref={vocabPagesRef}>
          {vocabChunks.map((words, pageIndex) => (
            <div
              key={pageIndex}
              style={{
                width: PAGE_W - MARGIN,
                minHeight: 420,
                padding: 24,
                background: "#fff",
                fontFamily: "var(--font-body)",
              }}
            >
              <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 800, color: "#073471", margin: "0 0 18px" }}>
                Vocabulario — {book.title}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {words.map((v) => (
                  <div
                    key={v.word}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      background: "#f5fcff",
                      border: "1px solid #dcebf7",
                      borderRadius: 14,
                      padding: "14px 16px",
                    }}
                  >
                    <span style={{ fontSize: 34, lineHeight: 1 }}>{v.emoji}</span>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#1e2a4d", fontFamily: "var(--font-heading)" }}>{v.word}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={closingRef}
          style={{
            width: PAGE_W - MARGIN,
            minHeight: 700,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: 16,
            background: "linear-gradient(160deg,#eaf6ff,#fff2cf)",
            fontFamily: "var(--font-body)",
          }}
        >
          <div style={{ fontFamily: "var(--font-heading)", fontSize: 30, fontWeight: 800, color: "#073471" }}>
            English<span style={{ color: "#4c8dff" }}>Kids</span>
          </div>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#1e2a4d", margin: 0 }}>¡Gracias por aprender inglés con nosotros!</p>
          <p style={{ fontSize: 14, color: "#4a6a8c", maxWidth: 420, margin: 0 }}>
            Terminaste “{book.title}”. Sigue explorando más libros e historias en EnglishKids para seguir practicando tu inglés jugando.
          </p>
          <p style={{ fontSize: 12, color: "#8a99b8", marginTop: 20 }}>Generado el {new Date().toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </>
  );
}
