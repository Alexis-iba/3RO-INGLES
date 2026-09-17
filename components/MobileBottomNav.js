"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Gamepad2, Sparkles, Download } from "lucide-react";
import useInstallPrompt from "@/lib/useInstallPrompt";
import InstallInstructionsModal from "./InstallInstructionsModal";

const TABS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Libros", icon: BookOpen },
  { href: "/actividades", label: "Actividades", icon: Gamepad2 },
  { href: "/recursos", label: "Recursos", icon: Sparkles },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { canInstall, hasNativePrompt, platform, install } = useInstallPrompt();
  const [showInstructions, setShowInstructions] = useState(false);

  async function handleInstallClick() {
    const installed = hasNativePrompt && (await install());
    if (!installed) setShowInstructions(true);
  }

  return (
    <>
      <nav
        aria-label="Navegación móvil inferior"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#ffd83d] border-t border-black/5 shadow-[0_-3px_15px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-2 transition-all"
        style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
      >
        <div className={`grid items-center justify-around gap-1 max-w-md mx-auto ${canInstall ? "grid-cols-5" : "grid-cols-4"}`}>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-colors duration-150 ${
                  isActive
                    ? "bg-black/[0.08] text-black font-bold"
                    : "text-[#333333] hover:text-black font-medium"
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.4 : 2}
                  className={isActive ? "text-black" : "text-[#333333]"}
                />
                <span className="text-[11.5px] leading-tight mt-0.5 tracking-tight">
                  {tab.label}
                </span>
              </Link>
            );
          })}

          {canInstall && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl text-[#333333] hover:text-black font-medium transition-colors duration-150 cursor-pointer"
            >
              <Download size={20} strokeWidth={2} className="text-[#333333]" />
              <span className="text-[11.5px] leading-tight mt-0.5 tracking-tight">Instalar</span>
            </button>
          )}
        </div>
      </nav>

      {showInstructions && (
        <InstallInstructionsModal platform={platform} onClose={() => setShowInstructions(false)} />
      )}
    </>
  );
}
