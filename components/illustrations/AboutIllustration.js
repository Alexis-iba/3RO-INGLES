import Kid from "./Kid";

export default function AboutIllustration() {
  return (
    <svg viewBox="0 0 360 260" className="w-full h-auto">
      <rect x="0" y="0" width="360" height="260" rx="28" fill="#eaf1fb" />
      <ellipse cx="60" cy="40" rx="20" ry="11" fill="#fff" opacity="0.9" />
      <ellipse cx="300" cy="34" rx="22" ry="12" fill="#fff" opacity="0.9" />
      <path d="M0 220 Q180 190 360 220 L360 260 L0 260Z" fill="#cdeede" />

      {/* libro abierto grande */}
      <g transform="translate(80,150)">
        <path d="M0 20 Q100 -10 200 20 L200 55 Q100 25 0 55Z" fill="#ffffff" stroke="#e3e8f4" strokeWidth="2" />
        <path d="M100 5 L100 40" stroke="#e3e8f4" strokeWidth="2" />
        <path d="M15 25 L85 15" stroke="#c9d3e8" strokeWidth="3" strokeLinecap="round" />
        <path d="M15 35 L80 27" stroke="#c9d3e8" strokeWidth="3" strokeLinecap="round" />
        <path d="M115 15 L185 25" stroke="#c9d3e8" strokeWidth="3" strokeLinecap="round" />
        <path d="M120 27 L185 35" stroke="#c9d3e8" strokeWidth="3" strokeLinecap="round" />
      </g>

      <Kid
        hair="short"
        skin="#f2b98a"
        hairColor="#3a2515"
        shirt="#3ec6a8"
        pants="#1e2a4d"
        transform="translate(40,60) scale(1.15)"
      />
      <Kid
        hair="pigtails"
        skin="#ffdcbf"
        hairColor="#6b3f22"
        shirt="#ff8fa3"
        pants="#7a4fb5"
        transform="translate(140,50) scale(1.25)"
      />
      <Kid
        hair="cap"
        skin="#c88a5c"
        hairColor="#211308"
        shirt="#ffc93c"
        pants="#1e2a4d"
        flip
        transform="translate(300,60) scale(1.15)"
      />
    </svg>
  );
}
