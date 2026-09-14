import Kid from "./Kid";

export default function CatalogHero() {
  return (
    <svg viewBox="0 0 420 300" className="catalog-hero-art" aria-hidden="true">
      <g transform="translate(358,58)">
        <circle r="30" fill="#ffe28a" />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect key={i} x="-3" y="-46" width="6" height="14" rx="3" fill="#ffd35c" transform={`rotate(${i * 45})`} />
        ))}
        <circle cx="-9" cy="-6" r="4" fill="#fff3cf" />
      </g>

      <g transform="translate(288,142)">
        <rect x="-14" y="74" width="140" height="28" rx="7" fill="#4caf7d" />
        <text x="56" y="92" textAnchor="middle" fontFamily="var(--font-heading)" fontSize="13" fontWeight="800" fill="#fff" letterSpacing="1">GROW</text>
        <rect x="-4" y="42" width="120" height="28" rx="7" fill="#4c8dff" transform="rotate(-3 56 56)" />
        <text x="56" y="60" textAnchor="middle" fontFamily="var(--font-heading)" fontSize="13" fontWeight="800" fill="#fff" letterSpacing="1" transform="rotate(-3 56 56)">LEARN</text>
        <rect x="-10" y="10" width="132" height="28" rx="7" fill="#ff9f5a" transform="rotate(3 56 24)" />
        <text x="56" y="28" textAnchor="middle" fontFamily="var(--font-heading)" fontSize="13" fontWeight="800" fill="#fff" letterSpacing="1" transform="rotate(3 56 24)">EXPLORE</text>
      </g>

      <Kid hair="short" skin="#f2b98a" hairColor="#4a2f1e" shirt="#4c8dff" pants="#1e2a4d" book="#ffc93c" transform="translate(58,62) scale(2.15)" />

      <g fill="#ffc93c">
        <path d="M46 46l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        <path d="M246 236l2.5 6 6 .8-4.3 4.2 1 6-5.2-2.7-5.2 2.7 1-6-4.3-4.2 6-.8z" opacity="0.85" />
        <path d="M190 26l2 5 5 .6-3.6 3.5.9 5-4.3-2.3-4.3 2.3.9-5-3.6-3.5 5-.6z" opacity="0.8" />
      </g>
    </svg>
  );
}
