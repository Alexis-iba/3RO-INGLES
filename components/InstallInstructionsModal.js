"use client";

import { X, Share, MoreVertical, Plus } from "lucide-react";

const STEPS = {
  ios: {
    title: "Instalar en iPhone / iPad",
    icon: Share,
    items: [
      <>Toca el botón <b>Compartir</b> en Safari (el ícono con la flecha hacia arriba).</>,
      <>Elige <b>Agregar a pantalla de inicio</b>.</>,
      <>Confirma tocando <b>Agregar</b>.</>,
    ],
  },
  android: {
    title: "Instalar en Android",
    icon: MoreVertical,
    items: [
      <>Toca el menú <b>⋮</b> de tu navegador (arriba a la derecha).</>,
      <>Elige <b>Instalar aplicación</b> o <b>Agregar a pantalla de inicio</b>.</>,
      <>Confirma tocando <b>Instalar</b>.</>,
    ],
  },
  desktop: {
    title: "Instalar en tu computadora",
    icon: Plus,
    items: [
      <>Busca el ícono de instalar <b>⊕</b> en la barra de direcciones.</>,
      <>Si no lo ves, abre el menú <b>⋮</b> del navegador.</>,
      <>Elige <b>Instalar Ploopi...</b>.</>,
    ],
  },
  other: {
    title: "Instalar la app",
    icon: Plus,
    items: [
      <>Abre el menú de tu navegador.</>,
      <>Busca la opción <b>Agregar a pantalla de inicio</b> o <b>Instalar aplicación</b>.</>,
    ],
  },
};

export default function InstallInstructionsModal({ platform, onClose }) {
  const config = STEPS[platform] || STEPS.other;
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-navy/60 p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div role="dialog" aria-modal="true" aria-label={config.title} className="relative w-full max-w-sm rounded-3xl bg-white p-5">
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 text-navy/40 hover:text-navy cursor-pointer"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
        <img src="/icons/icon-192.png" alt="" className="h-12 w-12 rounded-xl" />
        <h3 className="mt-3 flex items-center gap-2 font-heading text-lg font-extrabold text-navy">
          <Icon size={18} strokeWidth={2.5} />
          {config.title}
        </h3>
        <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm font-semibold text-navy/70">
          {config.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
