"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Gamepad2, Sparkles, ArrowRight, CornerDownLeft, Tag } from "lucide-react";
import { BOOKS, CATEGORIES, UPLOADED_COVERS } from "@/lib/data";
import Image from "next/image";

const POPULAR_SEARCHES = [
  { text: "My World in English", type: "book", href: "/libros/my-world-in-english" },
  { text: "Animals Around Us", type: "book", href: "/libros/animals-around-us" },
  { text: "Juegos interactivos", type: "activity", href: "/actividades" },
  { text: "Vocabulario con audios", type: "resource", href: "/recursos" },
];

const ACTIVITIES_LIST = [
  { id: "quiz", title: "Quiz de Vocabulario", desc: "Preguntas de opción múltiple con audio y puntaje", href: "/actividades", icon: Gamepad2, tag: "Juegos" },
  { id: "memoria", title: "Juego de Memoria", desc: "Encuentra parejas de palabras e imágenes en inglés", href: "/actividades", icon: Gamepad2, tag: "Juegos" },
  { id: "flashcards", title: "Fichas & Audios", desc: "Banco interactivo de palabras con pronunciación", href: "/recursos", icon: Sparkles, tag: "Recursos" },
];

function highlightMatch(text, query) {
  if (!query || !text) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-[#ffd83d]/50 text-[#073471] font-black rounded-xs px-0.5">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

export default function InstantSearch({ isMobileModal = false, onCloseMobile }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter();

  // Instant Algolia-style search calculation
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    // 1. Matched Books
    const matchedBooks = BOOKS.filter((b) => {
      const matchTitle = b.title.toLowerCase().includes(q);
      const matchUnit = b.unit?.toLowerCase().includes(q);
      const matchTopics = b.topics?.some((t) => t.toLowerCase().includes(q));
      const matchDesc = b.description?.toLowerCase().includes(q);
      return matchTitle || matchUnit || matchTopics || matchDesc;
    }).slice(0, 4);

    // 2. Matched Activities
    const matchedActivities = ACTIVITIES_LIST.filter((a) => {
      return (
        a.title.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.tag.toLowerCase().includes(q)
      );
    }).slice(0, 2);

    // 3. Matched Vocabulary Words across books
    const matchedVocab = [];
    for (const book of BOOKS) {
      if (book.vocab) {
        for (const item of book.vocab) {
          if (item.word.toLowerCase().includes(q)) {
            matchedVocab.push({
              word: item.word,
              emoji: item.emoji,
              bookTitle: book.title,
              href: `/libros/${book.id}`,
            });
            if (matchedVocab.length >= 4) break;
          }
        }
      }
      if (matchedVocab.length >= 4) break;
    }

    // 4. Matched Categories
    const matchedCategories = CATEGORIES.filter(
      (c) => c.id !== "todos" && c.label.toLowerCase().includes(q)
    ).slice(0, 2);

    const totalCount =
      matchedBooks.length +
      matchedActivities.length +
      matchedVocab.length +
      matchedCategories.length;

    return {
      books: matchedBooks,
      activities: matchedActivities,
      vocab: matchedVocab,
      categories: matchedCategories,
      totalCount,
    };
  }, [query]);

  // Flattened items for keyboard navigation
  const flatItems = useMemo(() => {
    if (!results || results.totalCount === 0) return [];
    const items = [];
    results.books.forEach((b) => items.push({ type: "book", href: `/libros/${b.id}`, title: b.title }));
    results.activities.forEach((a) => items.push({ type: "activity", href: a.href, title: a.title }));
    results.vocab.forEach((v) => items.push({ type: "vocab", href: v.href, title: v.word }));
    results.categories.forEach((c) => items.push({ type: "category", href: `/catalogo`, title: c.label }));
    return items;
  }, [results]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global shortcut (Ctrl + K / Cmd + K)
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset selected index on query change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  function handleKeyDown(e) {
    if (e.key === "Escape") {
      setIsOpen(false);
      if (onCloseMobile) onCloseMobile();
      return;
    }

    if (!flatItems.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = flatItems[selectedIndex];
      if (selected) {
        navigateAndClose(selected.href);
      } else {
        navigateAndClose(`/catalogo?q=${encodeURIComponent(query.trim())}`);
      }
    }
  }

  function navigateAndClose(href) {
    setIsOpen(false);
    setQuery("");
    if (onCloseMobile) onCloseMobile();
    router.push(href);
  }

  const showDropdown = isOpen;

  return (
    <div ref={containerRef} className={`relative w-full ${isMobileModal ? "" : "max-w-xs lg:max-w-sm"}`}>
      {/* Input Bar */}
      <div
        className={`flex items-center gap-2.5 rounded-full bg-white pr-3.5 transition-colors duration-150 border ${
          isOpen
            ? "border-[#073471]"
            : "border-black/10 hover:border-black/20"
        } ${isMobileModal ? "h-11" : "h-9"} overflow-hidden shadow-none`}
        style={{ boxShadow: "none" }}
      >
        <div className="flex h-full aspect-square items-center justify-center rounded-full bg-[#e30613] text-white flex-shrink-0">
          <Search size={isMobileModal ? 16 : 14} strokeWidth={2.8} />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar libros, juegos, temas..."
          aria-label="Buscar en EnglishKids"
          style={{ outline: "none", boxShadow: "none", border: "none" }}
          className="min-w-0 flex-1 bg-transparent text-xs sm:text-sm text-[#073471] placeholder:text-slate-400 font-medium outline-none border-none focus:outline-none focus:ring-0 focus-visible:outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Borrar búsqueda"
            className="grid h-5 w-5 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X size={12} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Algolia-Style Floating Dropdown Popover */}
      {showDropdown && (
        <div
          className={`absolute left-0 z-50 mt-2 w-full origin-top rounded-2xl bg-white p-3 shadow-[0_20px_50px_rgba(7,52,113,0.22)] border border-slate-100 animate-in fade-in zoom-in-95 duration-150 ${
            isMobileModal ? "relative mt-3 max-h-[65vh] overflow-y-auto" : "min-w-[340px] sm:min-w-[380px] max-h-[460px] overflow-y-auto"
          }`}
        >
          {/* 1. When query is empty -> Popular / Quick Suggestions */}
          {!query.trim() && (
            <div>
              <div className="flex items-center justify-between px-2 py-1 mb-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#ffd83d]" /> Sugerencias populares
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {POPULAR_SEARCHES.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => navigateAndClose(item.href)}
                    className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold text-[#073471] hover:bg-slate-50 hover:text-[#00aef0] transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      {item.type === "book" ? <BookOpen size={14} className="text-slate-400 group-hover:text-[#00aef0]" /> : <Gamepad2 size={14} className="text-slate-400 group-hover:text-[#00aef0]" />}
                      {item.text}
                    </span>
                    <ArrowRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#00aef0]" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 2. When query has matches -> Algolia-style instant results */}
          {results && results.totalCount > 0 && (
            <div className="flex flex-col gap-3">
              
              {/* MATCHED BOOKS */}
              {results.books.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <BookOpen size={13} className="text-[#ea85be]" /> Libros ({results.books.length})
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {results.books.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => navigateAndClose(`/libros/${b.id}`)}
                        className="flex items-center gap-3 rounded-xl p-2 text-left hover:bg-[#f0f9ff] transition-colors group w-full"
                      >
                        <div className="relative h-10 w-10 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                          {UPLOADED_COVERS.has(b.id) ? (
                            <Image
                              src={`/catalog-images/${b.id}.png`}
                              alt=""
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <BookOpen size={18} className="text-[#073471]" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-extrabold text-[#073471] group-hover:text-[#00aef0] truncate">
                            {highlightMatch(b.title, query)}
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold mt-0.5">
                            <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold text-[10px]">
                              {b.unit}
                            </span>
                            <span className="truncate">{b.topics?.slice(0, 2).join(", ")}</span>
                          </div>
                        </div>
                        <ArrowRight size={14} className="text-slate-300 group-hover:text-[#00aef0] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MATCHED ACTIVITIES */}
              {results.activities.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Gamepad2 size={13} className="text-[#00aef0]" /> Actividades & Recursos
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    {results.activities.map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.id}
                          type="button"
                          onClick={() => navigateAndClose(a.href)}
                          className="flex items-center gap-3 rounded-xl p-2 text-left hover:bg-[#f0fdf4] transition-colors group w-full"
                        >
                          <div className="h-9 w-9 flex-shrink-0 rounded-lg bg-[#00aef0]/10 text-[#00aef0] flex items-center justify-center">
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs sm:text-sm font-extrabold text-[#073471] group-hover:text-[#53a762] truncate">
                              {highlightMatch(a.title, query)}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate font-medium">
                              {a.desc}
                            </div>
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            {a.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MATCHED VOCABULARY WORDS */}
              {results.vocab.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Sparkles size={13} className="text-[#ff7828]" /> Palabras de Vocabulario
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 mt-1">
                    {results.vocab.map((v, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => navigateAndClose(v.href)}
                        className="flex items-center gap-2 rounded-xl p-2 text-left bg-slate-50 hover:bg-[#fff7ed] hover:border-orange-200 border border-transparent transition-all group"
                      >
                        <span className="text-lg flex-shrink-0">{v.emoji}</span>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-black text-[#073471] group-hover:text-[#ff7828] truncate">
                            {highlightMatch(v.word, query)}
                          </div>
                          <div className="text-[10px] text-slate-400 font-semibold truncate">
                            {v.bookTitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* MATCHED CATEGORIES */}
              {results.categories.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Tag size={13} className="text-[#53a762]" /> Categorías
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1 px-1">
                    {results.categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => navigateAndClose(`/catalogo`)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-[#073471] hover:bg-[#ffd83d] hover:text-[#073471] transition-colors"
                      >
                        <span>{highlightMatch(c.label, query)}</span>
                        <ArrowRight size={11} />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FOOTER: View all in Catalog */}
              <div className="border-t border-slate-100 pt-2 mt-1">
                <button
                  type="button"
                  onClick={() => navigateAndClose(`/catalogo?q=${encodeURIComponent(query.trim())}`)}
                  className="flex items-center justify-between w-full rounded-xl bg-slate-50 px-3 py-2 text-xs font-black text-[#073471] hover:bg-[#073471] hover:text-white transition-all group"
                >
                  <span>Ver todos los resultados en el catálogo</span>
                  <div className="flex items-center gap-1 text-[11px] opacity-80">
                    <kbd className="bg-white/20 px-1 py-0.5 rounded text-[10px]">Enter</kbd>
                    <CornerDownLeft size={13} />
                  </div>
                </button>
              </div>

            </div>
          )}

          {/* 3. When query has NO matches */}
          {results && results.totalCount === 0 && (
            <div className="py-6 text-center px-4">
              <div className="text-3xl mb-2">🔍</div>
              <div className="text-sm font-extrabold text-[#073471]">
                No encontramos resultados para &quot;{query}&quot;
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Prueba buscando por palabras como <strong>animales</strong>, <strong>escuela</strong>, <strong>familia</strong> o <strong>juegos</strong>.
              </p>
              <button
                type="button"
                onClick={() => navigateAndClose("/catalogo")}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#00aef0] hover:underline"
              >
                Explorar catálogo completo <ArrowRight size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
