import Link from "next/link";
import UiIcon from "@/components/icons/UiIcon";
import { notFound } from "next/navigation";
import { BOOKS, CATEGORIES, CATEGORY_COLORS, TAG_CLASSES, getBookById } from "@/lib/data";
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

  const color = CATEGORY_COLORS[book.category] || "blue";
  const categoryLabel = CATEGORIES.find((c) => c.id === book.category)?.label || "";
  const related = BOOKS.filter((b) => b.id !== book.id && b.category === book.category);
  const others = BOOKS.filter((b) => b.id !== book.id && b.category !== book.category);
  const preferred = book.id === "my-world-in-english" ? ["at-school", "my-family", "animals-around-us", "food-and-fun"].map(getBookById) : [...related, ...others];
  const relatedBooks = preferred.slice(0, 4);

  return (
    <div className="detail-page section-container py-8 md:py-12">
      <Image src="/illustrations/sun.svg" width={80} height={80} alt="" className="detail-sun" />
      <Link href="/catalogo" className="mb-5 inline-flex items-center gap-1.5 font-bold text-brand-blue hover:underline">
        <UiIcon name="left" size={16} /> Volver al catálogo
      </Link>

      <div className="detail-grid grid gap-7">
        <div className="detail-cover">
          <CatalogCover book={book} />
        </div>

        <div className="detail-description">
          <h1 className="font-heading text-2xl font-extrabold text-navy md:text-[30px]">{book.title}</h1>
          <p className="detail-unit">{book.unit}</p>
          <div className="mt-2.5 mb-3.5 flex flex-wrap gap-2">
            <span className={`tag ${TAG_CLASSES[color]}`}>{categoryLabel}</span>
            {book.topics.map((t) => (
              <span key={t} className="tag bg-brand-purple">
                {t}
              </span>
            ))}
          </div>
          <p className="mb-5 leading-relaxed text-navy/60">{book.description}</p>

          <div className="card p-5">
            <h3 className="mb-3.5 font-heading text-[17px] font-extrabold">¿Qué aprenderás?</h3>
            <ul className="flex flex-col gap-1.5">
              {book.learn.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <UiIcon name="check" className="learning-check" size={18} /> {item}
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/vista-previa/${book.id}`} className="preview-link btn btn-block mt-4">
            Ver vista previa del libro <UiIcon name="right" size={18} />
          </Link>
        </div>

        <div className="detail-info card p-5">
          <InfoRow icon="book" label="Grado" value={book.grade} />
          <InfoRow icon="pages" label="Páginas" value={book.pages} />
          <InfoRow icon="format" label="Formato" value={book.format} />
          <InfoRow icon="language" label="Idioma" value={book.idioma} last />
        </div>
      </div>

      <div className="detail-recommendations mt-14">
        <h2 className="mb-4 font-heading text-2xl font-extrabold text-navy">Otras recomendaciones</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {relatedBooks.map((b) => (
            <Link key={b.id} href={`/libros/${b.id}`} className="detail-related-book"><CatalogCover book={b} /><span>{b.title}</span></Link>
          ))}
        </div>
      </div>
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

