"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BOOKS, CATEGORIES } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import UiIcon from "@/components/icons/UiIcon";
import CatalogCover from "@/components/CatalogCover";
import "./catalog.css";

const UPLOADED_COVERS = new Set(["my-world-in-english", "animals-around-us", "at-school", "my-family", "food-and-fun", "nature-around-us"]);

function CatalogoInner() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return BOOKS.filter((b) => {
      const matchesCategory = activeCategory === "todos" || b.category === activeCategory;
      const matchesSearch =
        !q || b.title.toLowerCase().includes(q) || b.topics.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  return (
    <div className="catalog-page section-container py-8 md:py-12">
      <header className="catalog-intro">
      <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Catálogo de libros</h1>
      <p className="mt-2 max-w-xl text-navy/60">
        Historias, vocabulario y temas diseñados especialmente para 3° de primaria.
      </p>
      <span aria-hidden="true">✦</span>
      </header>

      <div className="mt-8 grid gap-7 lg:grid-cols-[240px_1fr]">
        <aside className="card sticky top-24 h-fit p-4">
          <h4 className="mb-2.5 px-2 text-xs font-bold uppercase tracking-wide text-navy/50">Categorías</h4>
          <div className="flex flex-col gap-0.5">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                aria-pressed={activeCategory === c.id}
                className={`rounded-xl px-3 py-2 text-left text-sm font-bold ${
                  activeCategory === c.id ? "bg-blue-light text-brand-blue" : "text-navy hover:bg-bg-page"
                }`}
              >
                <UiIcon name={c.id === "todos" ? "all" : "category"} size={16} /> {c.label}
              </button>
            ))}
          </div>
        </aside>

        <div>
          <div className="card mb-5 flex items-center gap-2.5 rounded-full px-5 py-3">
            <UiIcon name="search" size={18} />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              aria-label="Buscar libros"
              className="flex-1 bg-transparent text-sm focus:outline-none"
            />
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((b) => (
                <Link key={b.id} href={`/libros/${b.id}`} className="catalog-book" aria-label={`Ver ${b.title}`}>
                  {UPLOADED_COVERS.has(b.id) ? <div className="catalog-uploaded-cover"><Image src={`/catalog-images/${b.id}.png`} alt={`Portada de ${b.title}`} width={1536} height={1024} sizes="(max-width: 767px) 40vw, 42vw" /></div> : <CatalogCover book={b} />}
                  <div className="catalog-book-info"><strong>{b.unit}</strong><span>{CATEGORIES.find(c => c.id === b.category)?.label}</span></div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center text-navy/60">
              <div className="mb-3 text-5xl">📭</div>
              <p>No encontramos libros con esos filtros. Intenta con otra categoría o búsqueda.</p>
            </div>
          )}
        </div>
      </div>
      <p className="catalog-credit">Iconos e ilustraciones adicionales: <a href="https://openmoji.org/">OpenMoji</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></p>
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={null}>
      <CatalogoInner />
    </Suspense>
  );
}


