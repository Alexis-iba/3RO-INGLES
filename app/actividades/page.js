"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ActivityIcon from "@/components/activities/ActivityIcon";
import Star from "@/components/icons/Star";
import "./activities.css";

// Los juegos generan preguntas al azar en el primer render; se cargan solo en
// cliente para evitar que el HTML del servidor no coincida con el del navegador.
const QuizGame = dynamic(() => import("@/components/activities/QuizGame"), { ssr: false });
const MatchGame = dynamic(() => import("@/components/activities/MatchGame"), { ssr: false });
const ListenGame = dynamic(() => import("@/components/activities/ListenGame"), { ssr: false });
const WriteGame = dynamic(() => import("@/components/activities/WriteGame"), { ssr: false });
const SpeedGame = dynamic(() => import("@/components/activities/SpeedGame"), { ssr: false });
const MemoryFlipGame = dynamic(() => import("@/components/activities/MemoryFlipGame"), { ssr: false });
const TrueFalseGame = dynamic(() => import("@/components/activities/TrueFalseGame"), { ssr: false });
const ScrambleGame = dynamic(() => import("@/components/activities/ScrambleGame"), { ssr: false });
const SpellingChoiceGame = dynamic(() => import("@/components/activities/SpellingChoiceGame"), { ssr: false });
const HuntGame = dynamic(() => import("@/components/activities/HuntGame"), { ssr: false });

const TYPES = [
  { id: "vocabulario", icon: "abc", title: "Vocabulario", desc: "Une palabras con imágenes" },
  { id: "escuchar", icon: "headphones", title: "Escuchar", desc: "Escucha y elige la respuesta" },
  { id: "escribir", icon: "pencil", title: "Escribir", desc: "Completa las palabras" },
  { id: "juegos", icon: "controller", title: "Juegos", desc: "Diviértete mientras aprendes" },
];

const TITLES = {
  juegos: "Ejemplo de actividad",
  vocabulario: "Vocabulario: une palabras con imágenes",
  escuchar: "Escuchar: elige la palabra correcta",
  escribir: "Escribir: completa la palabra",
};

// Tres juegos distintos por apartado, todos usando el mismo banco de 87 ilustraciones.
const GAME_MODES = {
  vocabulario: [
    { id: "match", label: "Emparejar", Component: MatchGame },
    { id: "memory", label: "🧠 Memoria", Component: MemoryFlipGame },
    { id: "truefalse", label: "✅ Verdadero o falso", Component: TrueFalseGame, props: { mode: "image" } },
  ],
  escuchar: [
    { id: "listen", label: "Elige la respuesta", Component: ListenGame },
    { id: "truefalse-audio", label: "✅ Verdadero o falso", Component: TrueFalseGame, props: { mode: "audio" } },
    { id: "hunt-audio", label: "⚡ Caza por audio", Component: HuntGame, props: { mode: "audio" } },
  ],
  escribir: [
    { id: "write", label: "Completar", Component: WriteGame },
    { id: "scramble", label: "🔤 Ordena las letras", Component: ScrambleGame },
    { id: "spelling", label: "📝 Elige la ortografía", Component: SpellingChoiceGame },
  ],
  juegos: [
    { id: "quiz", label: "Preguntas", Component: QuizGame },
    { id: "contrarreloj", label: "⚡ Contrarreloj", Component: SpeedGame },
    { id: "hunt", label: "🔎 Caza la imagen", Component: HuntGame, props: { mode: "visual" } },
  ],
};

export default function ActividadesPage() {
  const [active, setActive] = useState("juegos");
  const [round, setRound] = useState(0);
  const [gameModes, setGameModes] = useState({ vocabulario: "match", escuchar: "listen", escribir: "write", juegos: "quiz" });

  function selectType(id) {
    setActive(id);
    setRound((r) => r + 1);
  }

  function selectGameMode(id) {
    setGameModes((prev) => ({ ...prev, [active]: id }));
    setRound((r) => r + 1);
  }

  const modes = GAME_MODES[active];
  const current = modes.find((m) => m.id === gameModes[active]) || modes[0];
  const { Component, props } = current;

  return (
    <div className="activities-page section-container">
      <span className="activities-title-wrap">
        <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Actividades interactivas</h1>
        <Star className="activities-star activities-star-one" />
        <Star className="activities-star activities-star-two" />
      </span>
      <p className="mt-2 text-navy/60">Juega, practica y aprende de forma divertida.</p>

      <div className="activity-types">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => selectType(t.id)}
            aria-pressed={active === t.id}
            className={`activity-type activity-type-${t.id}`}
          >
            <ActivityIcon name={t.icon} />
            <h3 className="font-heading text-[15px] font-extrabold">{t.title}</h3>
            <p className="mt-1 text-xs text-navy/60">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="activity-example">
        <h3 className="mb-4 font-heading text-lg font-extrabold">{TITLES[active]}</h3>
        <div className="game-mode-switch">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => selectGameMode(m.id)}
              aria-pressed={current.id === m.id}
              className="game-mode-btn"
            >
              {m.label}
            </button>
          ))}
        </div>
        <Component key={`${active}-${round}`} {...props} />
      </div>
    </div>
  );
}
