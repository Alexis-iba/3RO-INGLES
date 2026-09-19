import Link from "next/link";
import UiIcon from "@/components/icons/UiIcon";
import Star from "@/components/icons/Star";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import PromoBanner from "@/components/PromoBanner";
import { notFound } from "next/navigation";
import { BOOKS, getBookById, getBookPalette, UPLOADED_COVERS } from "@/lib/data";
import Image from "next/image";
import CatalogCover from "@/components/CatalogCover";
import { ArrowRight } from "lucide-react";
import "@/app/catalogo/catalog.css";
import "./detail.css";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = getBookById(id);
  return { title: book ? `${book.title} — Ploopi` : "Ploopi" };
}

export default async function BookDetailPage({ params }) {
  const { id } = await params;
  const book = getBookById(id);
  if (!book) notFound();

  const related = BOOKS.filter((b) => b.id !== book.id && b.category === book.category);
  const others = BOOKS.filter((b) => b.id !== book.id && b.category !== book.category);
  const preferred = book.id === "my-world-in-english" ? ["at-school", "my-family", "animals-around-us", "food-and-fun", "nature-around-us"].map(getBookById) : [...related, ...others];
  const relatedBooks = preferred.slice(0, 5);

  return (
    <div className="detail-page section-container py-8 md:py-12">
      <Link href="/catalogo" className="mb-5 inline-flex items-center gap-1.5 font-bold text-brand-blue hover:underline">
        <UiIcon name="left" size={16} /> Volver al catálogo
      </Link>

      <div className="detail-grid">
        <div id="pdf-cover" className="detail-cover detail-book">
          {UPLOADED_COVERS.has(book.id) ? (
            <div className="detail-uploaded-cover">
              <Image src={`/catalog-images/${book.id}.png`} alt={`Portada de ${book.title}`} width={1536} height={1024} sizes="(max-width: 767px) 90vw, 40vw" priority />
            </div>
          ) : (
            <CatalogCover book={book} />
          )}
        </div>

        <div className="detail-description">
          <div id="pdf-info">
            <h1 className="font-heading text-2xl font-extrabold text-navy md:text-[30px]">{book.title}</h1>
            <p className="detail-unit">{book.unit}</p>
            <div className="mt-2.5 mb-3 flex flex-wrap gap-2">
              {book.topics.map((t) => (
                <span key={t} className="tag bg-brand-purple">
                  {t}
                </span>
              ))}
            </div>
            <p className="leading-relaxed text-navy/60">{book.description}</p>
          </div>
        </div>

        <div className="detail-info card p-5">
          <InfoRow icon="cap" label="Nivel" value={book.grade} />
          <InfoRow icon="pages" label="Páginas" value={book.pages} />
          <InfoRow icon="format" label="Formato" value={book.format} />
          <InfoRow icon="language" label="Idioma" value={book.idioma} />
          <InfoRow icon="download" label="Disponible" value="Descarga inmediata" last />

          <div className="detail-actions">
            <Link href={`/vista-previa/${book.id}`} className="btn-read">
              <UiIcon name="book" size={18} /> Leer ahora
            </Link>
            <DownloadPdfButton key={`download-${book.id}`} book={book} />
          </div>
        </div>

        <div id="pdf-learn" className="detail-learn-card card p-5 sm:p-6">
          <h3 className="mb-3.5 flex items-center gap-2 font-heading text-[17px] font-extrabold text-[#785a06]">
            <UiIcon name="all" size={18} className="detail-learn-star text-[#d8981a]" /> ¿Qué aprenderás?
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {book.learn.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm font-bold text-[#594711]">
                <UiIcon name="check" className="learning-check text-[#15803d]" size={18} /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="detail-recommendations mt-14">
        <div className="detail-recommendations-heading">
          <h2 className="font-heading text-2xl font-extrabold text-navy">
            <Star className="detail-recs-star" /> Otras recomendaciones
          </h2>
          <Link href="/catalogo">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {relatedBooks.map((b) => {
            const palette = getBookPalette(b.id);
            return (
              <Link
                key={b.id}
                href={`/libros/${b.id}`}
                className="clean-book-card catalog-book-card"
                aria-label={`Ver libro ${b.title}`}
              >
                <div
                  className="clean-book-cover-wrap"
                  style={{ backgroundColor: palette.bg }}
                >
                  <div className="clean-book-tags">
                    <span className="clean-book-grade">3° PRIMARIA</span>
                    <span className="clean-book-unit" style={{ color: palette.ink }}>
                      {b.unit || "Unidad 1 - 6"}
                    </span>
                  </div>
                  <div className="clean-book-image-box">
                    <Image
                      src={`/catalog-images/${b.id}.png`}
                      alt={`Portada de ${b.title}`}
                      fill
                      sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 240px"
                    />
                  </div>
                </div>

                <div className="clean-book-details">
                  <div className="clean-book-meta-top">
                    <span
                      className="clean-book-category-tag"
                      style={{ backgroundColor: palette.catBg, color: palette.catColor }}
                    >
                      {b.category}
                    </span>
                  </div>

                  <h3 className="clean-book-title" title={b.title}>
                    {b.title}
                  </h3>

                  {b.topics && b.topics.length > 0 && (
                    <div className="clean-book-topics-list">
                      {b.topics.slice(0, 2).map((t) => (
                        <span key={t} className="clean-book-topic-chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="clean-book-action">
                    <span className="clean-book-btn">
                      Ver libro
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <PromoBanner />
    </div>
  );
}

function InfoRow({ icon, label, value, last }) {
  return (
    <div className={`flex items-start gap-2.5 py-2.5 text-sm ${last ? "" : "border-b border-[#eef1f8]"}`}>
      <span className="detail-data-icon"><UiIcon name={icon} size={22} /></span>
      <span>
        <span className="block text-xs text-navy/50">{label}</span>
        <span className="font-bold">{value}</span>
      </span>
    </div>
  );
}
