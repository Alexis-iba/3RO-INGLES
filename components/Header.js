"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Gamepad2, Sparkles, Search, X, Download } from "lucide-react";
import BrandLogo from "./icons/BrandLogo";
import InstantSearch from "./InstantSearch";
import useInstallPrompt from "@/lib/useInstallPrompt";
import InstallInstructionsModal from "./InstallInstructionsModal";

const LINKS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Libros", icon: BookOpen },
  { href: "/actividades", label: "Actividades", icon: Gamepad2 },
  { href: "/recursos", label: "Recursos", icon: Sparkles },
];

export default function Header() {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const pathname = usePathname();
  const { canInstall, hasNativePrompt, platform, install } = useInstallPrompt();

  async function handleInstallClick() {
    const installed = hasNativePrompt && (await install());
    if (!installed) setShowInstructions(true);
  }

  return (
    <header className="site-header sticky top-0 z-40 w-full bg-[#ffd83d] shadow-xs">
      <div className="section-container flex items-center justify-between gap-3 sm:gap-4 py-2.5">
        
        {/* Logo a la izquierda */}
        <Link href="/" className="flex flex-shrink-0 items-center transition-transform duration-150 hover:scale-105">
          <BrandLogo className="h-20 w-auto sm:h-18 md:h-20 lg:h-22" priority />
        </Link>

        {/* Links de navegación para computadoras / tablets grandes */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {LINKS.map((l) => {
            const Icon = l.icon;
            const isActive = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[14.5px] whitespace-nowrap transition-colors duration-150 ${
                  isActive
                    ? "bg-black/[0.08] text-black font-bold"
                    : "text-[#333333] hover:text-black hover:bg-black/[0.05] font-semibold"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={2.2}
                  className={isActive ? "text-black" : "text-[#444444]"}
                />
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Buscador Algolia-Style */}
        <div className="flex items-center gap-2">
          {canInstall && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[14.5px] font-semibold text-[#333333] hover:text-black hover:bg-black/[0.05] whitespace-nowrap transition-colors duration-150 cursor-pointer"
            >
              <Download size={18} strokeWidth={2.2} className="text-[#444444]" />
              Instalar app
            </button>
          )}

          {/* Desktop Instant Search (flotante en vivo) */}
          <div className="hidden md:block w-48 lg:w-72">
            <InstantSearch />
          </div>

          {/* Botón lupa móvil */}
          <button
            type="button"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label={mobileSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
            className="flex md:hidden h-9 w-9 items-center justify-center rounded-full bg-[#e30613] text-white shadow-xs hover:bg-[#c7000c] transition-colors"
          >
            {mobileSearchOpen ? <X size={18} strokeWidth={2.5} /> : <Search size={18} strokeWidth={2.5} />}
          </button>
        </div>
      </div>

      {/* Buscador flotante en móvil tipo Algolia Modal */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t border-black/5 bg-[#ffd83d] p-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <InstantSearch
            isMobileModal={true}
            onCloseMobile={() => setMobileSearchOpen(false)}
          />
        </div>
      )}

      {showInstructions && (
        <InstallInstructionsModal platform={platform} onClose={() => setShowInstructions(false)} />
      )}
    </header>
  );
}
