import Kid from "./Kid";
import Star from "../icons/Star";

export default function HeroIllustration() {
  return (
    <div className="relative">
      <svg viewBox="0 0 340 260" className="w-full h-auto">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#eaf1fb" />
            <stop offset="100%" stopColor="#dcebff" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="340" height="260" rx="28" fill="url(#skyGrad)" />

        {/* nubes */}
        <g opacity="0.9">
          <ellipse cx="60" cy="42" rx="22" ry="12" fill="#ffffff" />
          <ellipse cx="80" cy="36" rx="16" ry="10" fill="#ffffff" />
          <ellipse cx="270" cy="30" rx="24" ry="13" fill="#ffffff" />
          <ellipse cx="290" cy="24" rx="14" ry="9" fill="#ffffff" />
        </g>

        {/* sol */}
        <circle cx="300" cy="60" r="18" fill="#ffe28a" />

        {/* pasto */}
        <path d="M0 230 Q170 200 340 230 L340 260 L0 260Z" fill="#cdeede" />

        {/* niño con mochila y libro amarillo */}
        <Kid
          hair="short"
          skin="#f2b98a"
          hairColor="#4a2f1e"
          shirt="#4c8dff"
          pants="#1e2a4d"
          book="#ffc93c"
          backpack
          transform="translate(30,26) scale(1.55)"
        />

        {/* niña con libro verde */}
        <Kid
          hair="pigtails"
          skin="#ffdcbf"
          hairColor="#6b3f22"
          shirt="#ff8fa3"
          pants="#7a4fb5"
          book="#4caf7d"
          flip
          transform="translate(310,26) scale(1.55)"
        />

        {/* estrellas decorativas */}
        <g fill="#ffc93c">
          <path d="M40 60l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
          <path d="M300 150l2.5 6 6 .8-4.3 4.2 1 6-5.2-2.7-5.2 2.7 1-6-4.3-4.2 6-.8z" opacity="0.8" />
        </g>
      </svg>

      <div className="absolute -right-3 top-6 rotate-3 rounded-2xl bg-white px-4 py-3 text-center text-[13px] font-extrabold leading-relaxed text-navy shadow-soft">
        <span className="flex items-center justify-center gap-1 text-brand-yellow-dark">
          <Star className="h-3 w-3" /> Play
        </span>
        Learn
        <br />
        Grow
      </div>
    </div>
  );
}
