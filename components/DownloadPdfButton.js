"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import WorkbookSpread from "./WorkbookSpread";
import { WORKBOOK_PAGES } from "@/lib/workbooks";
import UiIcon from "./icons/UiIcon";

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

export default function DownloadPdfButton({ book, answers = {} }) {
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [pdfUrl, setPdfUrl] = useState("");
  const pagesRef = useRef(null);
  const busyRef = useRef(false);
  const cancelledRef = useRef(false);
  useEffect(() => {
    cancelledRef.current = false;
    return () => { cancelledRef.current = true; };
  }, []);
  useEffect(() => () => { if (pdfUrl) URL.revokeObjectURL(pdfUrl); }, [pdfUrl]);

  async function handleDownload() {
    if (busyRef.current) return;
    busyRef.current = true;
    setStatus("loading");
    setProgress(0);
    setPdfUrl("");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas-pro"), import("jspdf")]);
      await document.fonts.ready;
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      const root = pagesRef.current;
      if (!root) throw new Error("No se pudieron preparar las páginas del libro.");
      await Promise.all(Array.from(root.querySelectorAll("img"), img => img.decode()));
      if (cancelledRef.current) return;
      const leaves = Array.from(root.querySelectorAll(".workbook-leaf"));
      if (leaves.length !== book.pages) throw new Error("El número de páginas no coincide con el libro.");
      const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });
      doc.setProperties({ title: book.title, subject: "Cuaderno de inglés de 3° de primaria", author: "EnglishKids" });
      for (let i = 0; i < leaves.length; i++) {
        if (cancelledRef.current) return;
        const canvas = await html2canvas(leaves[i], {
          scale: 2, backgroundColor: "#ffffff", useCORS: true, logging: false,
          windowWidth: 1600, windowHeight: 1200,
        });
        if (i) doc.addPage();
        doc.addImage(canvas.toDataURL("image/jpeg", 0.94), "JPEG", 0, 0, 210, 297);
        canvas.width = 0;
        canvas.height = 0;
        setProgress(i + 1);
      }
      if (doc.getNumberOfPages() !== book.pages) throw new Error("El PDF está incompleto.");
      if (cancelledRef.current) return;
      const url = URL.createObjectURL(doc.output("blob"));
      setPdfUrl(url);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${book.id}-englishkids.pdf`;
      link.click();
      setStatus("done");
    } catch (err) {
      console.error("No se pudo generar el PDF", err);
      setStatus("error");
    } finally {
      busyRef.current = false;
    }
  }

  return <div className="workbook-download">
    <button type="button" onClick={handleDownload} className="btn-download" disabled={!ready || status === "loading"} aria-busy={status === "loading"}>
      <UiIcon name="download" size={18} />
      {status === "loading" ? `Generando ${progress}/${book.pages}…` : status === "error" ? "Reintentar descarga" : "Descargar (PDF)"}
    </button>
    <span className="pdf-status" role="status">{status === "done" ? `PDF listo: ${book.pages} páginas.` : status === "error" ? "No se pudo generar el PDF completo. Inténtalo de nuevo." : ""}</span>
    {pdfUrl && <a className="pdf-ready-link" href={pdfUrl} download={`${book.id}-englishkids.pdf`}>Guardar PDF de nuevo</a>}
    {status === "loading" && <div className="pdf-workbook-pages" ref={pagesRef} aria-hidden="true" inert>
      {Array.from({ length: Math.ceil(WORKBOOK_PAGES.length / 2) }, (_, page) => <WorkbookSpread key={page} book={book} page={page} print answers={answers} />)}
    </div>}
  </div>;
}
