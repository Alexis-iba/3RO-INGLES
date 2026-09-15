"use client";

import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BOOKS, CATEGORIES, CATEGORY_ICONS, getBookPalette } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import UiIcon from "@/components/icons/UiIcon";
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

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setQuery(q);
      setActiveCategory("todos");
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = BOOKS.filter((b) => {
      const matchesCategory = activeCategory === "todos" || b.category === activeCategory;
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.unit && b.unit.toLowerCase().includes(q)) ||
        (b.topics && b.topics.some((t) => t.toLowerCase().includes(q))) ||
        (b.summary && b.summary.toLowerCase().includes(q)) ||
        (b.description && b.description.toLowerCase().includes(q));
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
    <div className="catalog-page w-full pb-16">
      {/* Banner Principal del Catálogo */}
      <header className="catalog-intro">
        <div className="catalog-intro-copy sr-only">
          <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Catálogo de libros</h1>
          <p className="mt-2 max-w-xl text-navy/60">
            Historias, vocabulario y temas diseñados especialmente para 3° de primaria.
          </p>
        </div>
        <div className="catalog-banner" aria-hidden="true">
          <Image
            src="/catalog-images/catalog-banner.png"
            alt=""
            width={2144}
            height={733}
            sizes="100vw"
            priority
            className="catalog-banner-image"
          />
        </div>
      </header>

      {/* Contenedor Principal del Catálogo (Full-Width Expandido) */}
      <div className="catalog-layout-container">
        
        {/* Barra de Categorías Horizontal para Móviles / Tablets */}
        <div className="mobile-categories-bar lg:hidden">
          <div className="mobile-categories-scroll">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                aria-pressed={activeCategory === c.id}
                className={`category-pill ${activeCategory === c.id ? "is-active" : ""}`}
              >
                <UiIcon name={CATEGORY_ICONS[c.id] || "category"} size={16} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Layout en Grid para Desktop */}
        <div className="catalog-grid-layout">
          
          {/* Sidebar de Categorías (Visible solo en Desktop) */}
          <aside className="catalog-sidebar hidden lg:block">
            <div className="catalog-sidebar-card card">
              <h4 className="sidebar-title">Categorías</h4>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    aria-pressed={activeCategory === c.id}
                    className={`sidebar-btn ${activeCategory === c.id ? "is-active" : ""}`}
                  >
                    <UiIcon name={CATEGORY_ICONS[c.id] || "category"} size={17} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Sección Principal con Toolbar y Libros */}
          <main className="catalog-main-content">
            
            {/* Toolbar: Buscador y Ordenador */}
            <div className="catalog-toolbar">
              <div className="card catalog-search-box">
                <UiIcon name="search" size={18} className="text-slate-400 flex-shrink-0" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por título o tema..."
                  aria-label="Buscar libros"
                  className="catalog-search-input"
                />
              </div>

              <div className="catalog-sort-wrapper">
                <span className="text-xs font-bold text-navy/70 whitespace-nowrap">Ordenar:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  aria-label="Ordenar libros"
                  className="catalog-sort-select"
                >
                  <option value="recientes">Más recientes</option>
                  <option value="az">Título A-Z</option>
                </select>
              </div>
            </div>

            {/* Resultados y Grid de Libros */}
            <div className="catalog-results-area">
              <div className="catalog-books-column">
                {filtered.length > 0 ? (
                  <div className="clean-books-grid catalog-book-grid">
                    {filtered.map((b) => {
                      const palette = getBookPalette(b.id);
                      return (
                        <Link
                          key={b.id}
                          href={`/libros/${b.id}`}
                          className="clean-book-card catalog-book-card"
                          aria-label={`Ver libro ${b.title}`}
                          ref={(el) => {
                            if (el) cardRefs.current.set(b.id, el);
                            else cardRefs.current.delete(b.id);
                          }}
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
                                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 30vw, 280px"
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
                ) : (
                  <div className="catalog-empty-state">
                    <div className="empty-icon">📭</div>
                    <h3>No encontramos libros</h3>
                    <p>Intenta con otra categoría o término de búsqueda.</p>
                  </div>
                )}
              </div>

              {/* Sidebar lateral de promociones y beneficios */}
              <aside className="catalog-promo-column">
                <div className="card catalog-why">
                  <h4>
                    <UiIcon name="all" size={17} /> ¿Por qué leer en inglés?
                  </h4>
                  <ul>
                    {WHY_READ.map((item) => (
                      <li key={item}>
                        <UiIcon name="check" size={16} className="learning-check" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="catalog-promo catalog-promo-a">
                  <span className="catalog-promo-icon">
                    <UiIcon name="pages" size={26} />
                  </span>
                  <p>Pequeños lectores, grandes historias <span aria-hidden="true">❤️</span></p>
                </div>

                <div className="catalog-promo catalog-promo-b">
                  <Rocket className="catalog-promo-rocket" />
                  <p>Explora <br />Aprende <br />Crece <span aria-hidden="true">✨</span></p>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>
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
