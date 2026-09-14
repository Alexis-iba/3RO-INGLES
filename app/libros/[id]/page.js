import Link from "next/link";
import UiIcon from "@/components/icons/UiIcon";
import Star from "@/components/icons/Star";
import FavoriteButton from "@/components/FavoriteButton";
import DownloadPdfButton from "@/components/DownloadPdfButton";
import PromoBanner from "@/components/PromoBanner";
import { notFound } from "next/navigation";
import { BOOKS, getBookById, UPLOADED_COVERS } from "@/lib/data";
import Image from "next/image";
import CatalogCover from "@/components/CatalogCover";
import "@/app/catalogo/catalog.css";
import "./detail.css";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ id: b.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const book = getBookById(id);
  return { title: book ? `${book.title} — EnglishKids` : "EnglishKids" };
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

      <div className="detail-grid grid gap-7">
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
            <div className="detail-rating">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={i < Math.round(book.rating) ? "star-filled" : "star-empty"} />
              ))}
              <strong>{book.rating.toFixed(1)}</strong> ({book.reviews} reseñas)
            </div>
            <p className="mb-5 leading-relaxed text-navy/60">{book.description}</p>
          </div>

          <div id="pdf-learn" className="card p-5">
            <h3 className="mb-3.5 flex items-center gap-2 font-heading text-[17px] font-extrabold">
              <UiIcon name="all" size={18} className="detail-learn-star" /> ¿Qué aprenderás?
            </h3>
            <ul className="flex flex-col gap-1.5">
              {book.learn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <UiIcon name="check" className="learning-check" size={18} /> {item}
                </li>
              ))}
            </ul>
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
            <DownloadPdfButton book={book} />
            <FavoriteButton bookId={book.id} />
          </div>
        </div>
      </div>

      <div className="detail-recommendations mt-14">
        <div className="detail-recommendations-heading">
          <h2 className="font-heading text-2xl font-extrabold text-navy">
            <Star className="detail-recs-star" /> Otras recomendaciones
          </h2>
          <Link href="/catalogo">Ver todos →</Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {relatedBooks.map((b) => (
            <Link key={b.id} href={`/libros/${b.id}`} className="catalog-book" aria-label={`Ver ${b.title}`}>
              {UPLOADED_COVERS.has(b.id) ? (
                <div className="catalog-uploaded-cover">
                  <Image src={`/catalog-images/${b.id}.png`} alt={`Portada de ${b.title}`} width={1536} height={1024} sizes="(max-width: 767px) 45vw, 18vw" />
                </div>
              ) : (
                <CatalogCover book={b} />
              )}
              <div className="catalog-book-info">
                <strong>{b.title}</strong>
                <span className="catalog-unit">{b.unit}</span>
                <div className="catalog-tags">
                  {b.topics.slice(0, 2).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <PromoBanner />

      <p className="catalog-credit">Ilustraciones: <a href="https://openmoji.org/">OpenMoji</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></p>
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
