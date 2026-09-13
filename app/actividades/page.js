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

export default function ActividadesPage() {
  const [active, setActive] = useState("juegos");
  const [round, setRound] = useState(0);

  function selectType(id) {
    setActive(id);
    setRound((r) => r + 1);
  }

  return (
    <div className="activities-page section-container py-8 md:py-12">
      <span className="activities-title-wrap">
        <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Actividades interactivas</h1>
        <Star className="activities-star activities-star-one" />
        <Star className="activities-star activities-star-two" />
      </span>
      <p className="mt-2 text-navy/60">Juega, practica y aprende de forma divertida.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => selectType(t.id)}
            className={`card px-4 py-6 text-center transition-transform hover:-translate-y-1 ${
              active === t.id ? "border-2 border-brand-blue" : "border-2 border-transparent"
            }`}
          >
            <ActivityIcon name={t.icon} />
            <h3 className="font-heading text-[15px] font-extrabold">{t.title}</h3>
            <p className="mt-1 text-xs text-navy/60">{t.desc}</p>
          </button>
        ))}
      </div>

      <div className="card mt-7 p-7">
        <h3 className="mb-4 font-heading text-lg font-extrabold">{TITLES[active]}</h3>
        {active === "juegos" && <QuizGame key={round} />}
        {active === "vocabulario" && <MatchGame key={round} />}
        {active === "escuchar" && <ListenGame key={round} />}
        {active === "escribir" && <WriteGame key={round} />}
      </div>
    </div>
  );
}
