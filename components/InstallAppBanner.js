"use client";

import { useEffect, useState } from "react";
import { X, Download, Share } from "lucide-react";
import useInstallPrompt from "@/lib/useInstallPrompt";

const DISMISS_KEY = "englishkids-install-dismissed";

export default function InstallAppBanner() {
  const { hasNativePrompt, platform, install } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(true);
  const [showIosSteps, setShowIosSteps] = useState(false);

  useEffect(() => {
    setDismissed(!!localStorage.getItem(DISMISS_KEY));
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  // Solo se muestra cuando hay algo concreto que ofrecer: instalación con un
  // clic (Chrome/Edge) o los pasos claros de iOS. El resto de navegadores
  // siguen teniendo el botón "Instalar" fijo en la barra/menú.
  const show = !dismissed && (hasNativePrompt || platform === "ios");
  if (!show) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 z-40 mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-3.5 shadow-[0_12px_28px_rgba(7,52,113,0.18)] md:bottom-5 md:left-auto md:right-5 md:inset-x-auto">
      <div className="flex items-start gap-3">
        <img src="/icons/icon-192.png" alt="" className="h-11 w-11 flex-shrink-0 rounded-xl" />
        <div className="min-w-0 flex-1">
          <p className="font-heading text-sm font-extrabold text-navy">Instala EnglishKids</p>
          <p className="mt-0.5 text-xs font-semibold text-navy/60">
            {platform === "ios"
              ? "Agrégala a tu pantalla de inicio para abrirla como app."
              : "Agrégala a tu celular para abrirla como app, sin buscador."}
          </p>

          {hasNativePrompt && (
            <button
              onClick={install}
              className="btn btn-primary btn-sm mt-2.5 rounded-xl font-extrabold cursor-pointer"
            >
              <Download size={16} strokeWidth={2.5} className="mr-1" />
              Instalar app
            </button>
          )}

          {platform === "ios" && (
            <button
              onClick={() => setShowIosSteps((v) => !v)}
              className="btn btn-outline btn-sm mt-2.5 rounded-xl font-extrabold cursor-pointer"
            >
              <Share size={16} strokeWidth={2.5} className="mr-1" />
              Cómo instalarla
            </button>
          )}

          {platform === "ios" && showIosSteps && (
            <ol className="mt-2.5 list-decimal space-y-1 pl-4 text-xs font-semibold text-navy/70">
              <li>
                Toca el botón <span className="font-extrabold">Compartir</span> (
                <Share size={12} strokeWidth={2.5} className="inline -mt-0.5" />) en Safari.
              </li>
              <li>Elige <span className="font-extrabold">Agregar a pantalla de inicio</span>.</li>
              <li>Confirma tocando <span className="font-extrabold">Agregar</span>.</li>
            </ol>
          )}
        </div>
        <button
          onClick={dismiss}
          aria-label="Cerrar"
          className="flex-shrink-0 rounded-full p-1 text-navy/40 hover:bg-slate-100 hover:text-navy cursor-pointer"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
