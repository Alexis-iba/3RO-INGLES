"use client";

import { useEffect, useState } from "react";
import UiIcon from "./icons/UiIcon";

const STORAGE_KEY = "englishkids-favorites";

export default function FavoriteButton({ bookId }) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      setActive(saved.includes(bookId));
    } catch {
      setActive(false);
    }
  }, [bookId]);

  function toggle() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const next = saved.includes(bookId) ? saved.filter((id) => id !== bookId) : [...saved, bookId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setActive(next.includes(bookId));
    } catch {
      /* localStorage no disponible */
    }
  }

  return (
    <button type="button" onClick={toggle} aria-pressed={active} className={`btn-favorite ${active ? "is-active" : ""}`}>
      <UiIcon name="heart" size={18} /> {active ? "En favoritos" : "Agregar a favoritos"}
    </button>
  );
}
