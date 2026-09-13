"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BrandLogo from "./icons/BrandLogo";
import UiIcon from "./icons/UiIcon";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Libros" },
  { href: "/actividades", label: "Actividades" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    router.push(query.trim() ? `/catalogo?q=${encodeURIComponent(query.trim())}` : "/catalogo");
    setQuery("");
    setOpen(false);
  }

  return (
    <header className="site-header sticky top-0 z-50 bg-white text-navy shadow-[0_4px_14px_rgba(30,42,77,0.08)]">
      <div className="section-container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex flex-shrink-0 items-center">
          <BrandLogo className="h-11 w-auto sm:h-12" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-2 text-sm font-bold whitespace-nowrap ${
                pathname === l.href
                  ? "bg-brand-yellow text-navy-dark"
                  : "text-[#d6deef] hover:bg-white/10 hover:text-white"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="hidden items-center rounded-full bg-white/10 pl-3.5 pr-1 py-1 md:flex">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              aria-label="Buscar libros"
              className="w-36 bg-transparent text-sm text-white placeholder:text-[#c6cfe6] focus:outline-none"
            />
            <button type="submit" aria-label="Buscar" className="grid h-7 w-7 place-items-center rounded-full bg-brand-yellow text-sm">
              <UiIcon name="search" size={19} />
            </button>
          </form>

          <button
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span className={`block h-[3px] w-6 rounded bg-white transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`} />
            <span className={`block h-[3px] w-6 rounded bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[3px] w-6 rounded bg-white transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden bg-navy transition-[max-height] duration-300 lg:hidden ${open ? "max-h-[420px] pb-4" : "max-h-0"}`}>
        <nav className="flex flex-col">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-6 py-3 text-sm font-bold ${
                pathname === l.href ? "bg-brand-yellow text-navy-dark" : "text-[#d6deef]"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <form onSubmit={handleSearch} className="mx-6 mt-2 flex items-center gap-2 rounded-full bg-white/10 pl-3.5 pr-1 py-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar libros..."
              aria-label="Buscar libros"
              className="w-full bg-transparent text-sm text-white placeholder:text-[#c6cfe6] focus:outline-none"
            />
            <button type="submit" aria-label="Buscar" className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-brand-yellow text-sm">
              <UiIcon name="search" size={19} />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}

