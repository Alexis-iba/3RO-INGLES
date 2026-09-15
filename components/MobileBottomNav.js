"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Gamepad2, Sparkles } from "lucide-react";

const TABS = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Libros", icon: BookOpen },
  { href: "/actividades", label: "Actividades", icon: Gamepad2 },
  { href: "/recursos", label: "Recursos", icon: Sparkles },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#ffd83d] border-t border-black/5 shadow-[0_-3px_15px_rgba(0,0,0,0.08)] px-2 pt-1.5 pb-2 transition-all"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="grid grid-cols-4 items-center justify-around gap-1 max-w-md mx-auto">
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
      </div>
    </nav>
  );
}
