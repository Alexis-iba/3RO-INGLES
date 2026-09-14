import Rocket from "./icons/Rocket";
import Star from "./icons/Star";

export default function PromoBanner() {
  return (
    <div className="promo-banner">
      <Rocket className="promo-rocket" />
      <Star className="promo-star promo-star-1" />
      <Star className="promo-star promo-star-2" />
      <Star className="promo-star promo-star-3" />

      <div className="promo-copy">
        <h2>
          English is a new <span>adventure!</span>
        </h2>
        <p>Aprende hoy, descubre un mejor mañana.</p>
      </div>

      <div className="promo-sun">
        <span className="promo-sun-text">
          Learn
          <br />
          Play
          <br />
          Grow <span aria-hidden="true">❤</span>
        </span>
        <svg viewBox="0 0 100 100" aria-hidden="true" className="promo-sun-art">
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x="47" y="2" width="6" height="18" rx="3" fill="#ffcf4d" transform={`rotate(${i * 30} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="30" fill="#ffde7a" />
          <circle cx="40" cy="46" r="4" fill="#1e2a4d" />
          <circle cx="60" cy="46" r="4" fill="#1e2a4d" />
          <path d="M38 58q12 12 24 0" stroke="#1e2a4d" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="33" cy="54" r="4.5" fill="#ff9fae" opacity="0.6" />
          <circle cx="67" cy="54" r="4.5" fill="#ff9fae" opacity="0.6" />
        </svg>
      </div>

      <div className="promo-clouds" aria-hidden="true" />
    </div>
  );
}
