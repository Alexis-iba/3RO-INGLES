"use client";

import { Suspense, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BOOKS, CATEGORIES, CATEGORY_ICONS, UPLOADED_COVERS } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import UiIcon from "@/components/icons/UiIcon";
import CatalogCover from "@/components/CatalogCover";
import Rocket from "@/components/icons/Rocket";
import "./catalog.css";

const WHY_READ = [
  "Mejora la concentración",
  "Amplía su imaginación",
  "Desarrolla nuevas habilidades",
  "Aprende jugando",
  "Lo prepara para el futuro",
];

function CatalogoInner() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState("recientes");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = BOOKS.filter((b) => {
      const matchesCategory = activeCategory === "todos" || b.category === activeCategory;
      const matchesSearch =
        !q || b.title.toLowerCase().includes(q) || b.topics.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
    if (sortBy === "az") return [...result].sort((a, b) => a.title.localeCompare(b.title));
    return result;
  }, [activeCategory, query, sortBy]);

  const cardRefs = useRef(new Map());
  const prevRects = useRef(new Map());

  useLayoutEffect(() => {
    const nextRects = new Map();
    cardRefs.current.forEach((el, id) => {
      if (el) nextRects.set(id, el.getBoundingClientRect());
    });

    cardRefs.current.forEach((el, id) => {
      if (!el) return;
      const prev = prevRects.current.get(id);
      const next = nextRects.get(id);
      if (!prev || !next) return;
      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      if (!dx && !dy) return;
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        el.style.transition = "transform 320ms ease";
        el.style.transform = "";
        el.addEventListener("transitionend", () => { el.style.transition = ""; }, { once: true });
      });
    });

    prevRects.current = nextRects;
  }, [filtered]);

  return (
    <div className="catalog-page section-container py-8 md:py-12">
      <header className="catalog-intro">
        <div className="catalog-intro-copy">
          <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Catálogo de libros</h1>
          <p className="mt-2 max-w-xl text-navy/60">
            Historias, vocabulario y temas diseñados especialmente para 3° de primaria.
          </p>
        </div>
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
                <UiIcon name={CATEGORY_ICONS[c.id] || "category"} size={16} /> {c.label}
              </button>
            ))}
          </div>
        </aside>

        <div className="catalog-main">
          <div className="catalog-toolbar">
            <div className="card catalog-search flex items-center gap-2.5 rounded-full px-5 py-3">
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
            <label className="catalog-sort">
              Ordenar por:
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Ordenar libros">
                <option value="recientes">Más recientes</option>
                <option value="az">Título A-Z</option>
              </select>
            </label>
          </div>

          <div className="catalog-results">
            <div className="catalog-grid-col">
              {filtered.length > 0 ? (
                <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">
                  {filtered.map((b) => (
                    <Link
                      key={b.id}
                      href={`/libros/${b.id}`}
                      className="catalog-book"
                      aria-label={`Ver ${b.title}`}
                      ref={(el) => {
                        if (el) cardRefs.current.set(b.id, el);
                        else cardRefs.current.delete(b.id);
                      }}
                    >
                      {UPLOADED_COVERS.has(b.id) ? <div className="catalog-uploaded-cover"><Image src={`/catalog-images/${b.id}.png`} alt={`Portada de ${b.title}`} width={1536} height={1024} sizes="(max-width: 767px) 40vw, 30vw" /></div> : <CatalogCover book={b} />}
                      <div className="catalog-book-info">
                        <strong>{b.title}</strong>
                        <span className="catalog-unit">{b.unit}</span>
                        <div className="catalog-tags">
                          {b.topics.slice(0, 2).map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </div>
                        <span className="catalog-cta">Ver libro <span aria-hidden="true">→</span></span>
                      </div>
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

            <aside className="catalog-extra">
              <div className="card catalog-why">
                <h4><UiIcon name="all" size={16} /> ¿Por qué leer en inglés?</h4>
                <ul>
                  {WHY_READ.map((item) => (
                    <li key={item}><UiIcon name="check" size={16} className="learning-check" /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="catalog-promo catalog-promo-a">
                <span className="catalog-promo-icon"><UiIcon name="pages" size={26} /></span>
                <p>Pequeños lectores, grandes historias <span aria-hidden="true">♥</span></p>
              </div>
              <div className="catalog-promo catalog-promo-b">
                <Rocket className="catalog-promo-rocket" />
                <p>Explora <br />Aprende <br />Crece <span aria-hidden="true">♥</span></p>
              </div>
            </aside>
          </div>
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


