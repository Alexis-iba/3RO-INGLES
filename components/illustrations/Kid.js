// Personaje ilustrado reutilizable (cabeza redonda, pelo, cuerpo, brazos y piernas)
// compuesto con formas simples estilo "flat design", usado en hero, about y contacto.

export default function Kid({
  hair = "short",
  skin = "#f7c59a",
  hairColor = "#5b3a29",
  shirt = "#4c8dff",
  pants = "#1e2a4d",
  book,
  backpack = false,
  flip = false,
  transform = "",
}) {
  return (
    <g transform={`${transform} ${flip ? "scale(-1,1)" : ""}`}>
      {/* piernas */}
      <rect x="30" y="130" width="16" height="46" rx="7" fill={pants} />
      <rect x="54" y="130" width="16" height="46" rx="7" fill={pants} />
      <ellipse cx="38" cy="180" rx="11" ry="6" fill="#2b3557" />
      <ellipse cx="62" cy="180" rx="11" ry="6" fill="#2b3557" />

      {/* mochila (opcional, detrás del cuerpo) */}
      {backpack && (
        <rect x="16" y="78" width="20" height="46" rx="8" fill="#3ec6a8" stroke="#2fa88d" strokeWidth="2" />
      )}

      {/* cuerpo / playera */}
      <rect x="26" y="70" width="48" height="64" rx="18" fill={shirt} />
      <circle cx="50" cy="98" r="6" fill="rgba(255,255,255,0.35)" />

      {/* brazos */}
      <rect x="10" y="76" width="18" height="40" rx="9" fill={shirt} transform="rotate(18 19 96)" />
      <rect x="72" y="76" width="18" height="40" rx="9" fill={skin} transform="rotate(-25 81 96)" />

      {/* manos */}
      <circle cx="14" cy="118" r="8" fill={skin} />
      <circle cx="88" cy="112" r="8" fill={skin} />

      {/* libro sostenido (opcional) */}
      {book && (
        <g transform="translate(78,88) rotate(-12)">
          <rect x="0" y="0" width="30" height="22" rx="3" fill={book} stroke="#1e2a4d" strokeWidth="1.5" />
          <line x1="15" y1="2" x2="15" y2="20" stroke="#1e2a4d" strokeWidth="1.5" />
          <line x1="3" y1="7" x2="12" y2="7" stroke="#1e2a4d" strokeWidth="1" opacity="0.5" />
          <line x1="3" y1="12" x2="12" y2="12" stroke="#1e2a4d" strokeWidth="1" opacity="0.5" />
        </g>
      )}

      {/* cabeza */}
      <circle cx="50" cy="46" r="30" fill={skin} />

      {/* mejillas */}
      <circle cx="30" cy="54" r="5" fill="#ff9fae" opacity="0.55" />
      <circle cx="70" cy="54" r="5" fill="#ff9fae" opacity="0.55" />

      {/* ojos */}
      <circle cx="39" cy="44" r="3.4" fill="#1e2a4d" />
      <circle cx="61" cy="44" r="3.4" fill="#1e2a4d" />

      {/* sonrisa */}
      <path d="M38 56 Q50 66 62 56" stroke="#1e2a4d" strokeWidth="2.6" fill="none" strokeLinecap="round" />

      {/* pelo */}
      {hair === "short" && (
        <path
          d="M20 40 Q20 8 50 8 Q80 8 80 40 Q80 24 50 22 Q28 22 20 40Z"
          fill={hairColor}
        />
      )}
      {hair === "pigtails" && (
        <>
          <rect x="2" y="50" width="11" height="30" rx="5.5" fill={hairColor} />
          <rect x="87" y="50" width="11" height="30" rx="5.5" fill={hairColor} />
          <circle cx="7" cy="50" r="11" fill={hairColor} />
          <circle cx="93" cy="50" r="11" fill={hairColor} />
          <path
            d="M18 38 Q18 6 50 6 Q82 6 82 38 Q78 16 50 16 Q22 16 18 38Z"
            fill={hairColor}
          />
        </>
      )}
      {hair === "cap" && (
        <>
          <path d="M20 40 Q20 10 50 10 Q80 10 80 40 Q80 26 50 24 Q28 24 20 40Z" fill={hairColor} />
          <path d="M12 30 L88 30 L80 20 L20 20Z" fill="#1e2a4d" />
          <rect x="44" y="6" width="12" height="10" rx="2" fill="#1e2a4d" />
        </>
      )}
    </g>
  );
}
