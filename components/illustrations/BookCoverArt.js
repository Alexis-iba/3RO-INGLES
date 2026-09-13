// Ilustraciones de portada por categoría (formas planas, sin fotos/emoji).
// El fondo con degradado lo pone el contenedor (ver COVER_GRADIENTS); aquí solo el dibujo.

function World() {
  return (
    <g>
      <circle cx="100" cy="72" r="38" fill="#ffffff" stroke="#4c8dff" strokeWidth="3" />
      <path d="M62 72h76M100 34v76M70 50q30 20 60 0M70 94q30-20 60 0" fill="none" stroke="#4c8dff" strokeWidth="2.5" opacity="0.6" />
      <path d="M78 55q10-8 20 0t18 4q-4 12-18 10-14-2-20-14z" fill="#4caf7d" />
      <path d="M85 90q14 10 28 2q-2 10-14 12t-14-14z" fill="#4caf7d" />
      <circle cx="100" cy="72" r="38" fill="none" stroke="#1e2a4d" strokeWidth="2" />
      <g transform="translate(128,96) rotate(15)">
        <rect width="26" height="20" rx="3" fill="#ffc93c" stroke="#1e2a4d" strokeWidth="2" />
        <line x1="13" y1="2" x2="13" y2="18" stroke="#1e2a4d" strokeWidth="1.5" />
      </g>
    </g>
  );
}

function Animals() {
  return (
    <g>
      <circle cx="80" cy="76" r="30" fill="#f5a94e" />
      <g fill="#e8912f">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
          <rect key={a} x="76" y="34" width="8" height="20" rx="4" transform={`rotate(${a} 80 76)`} />
        ))}
      </g>
      <circle cx="80" cy="80" r="20" fill="#ffd9a0" />
      <circle cx="72" cy="78" r="2.6" fill="#1e2a4d" />
      <circle cx="88" cy="78" r="2.6" fill="#1e2a4d" />
      <path d="M74 88q6 6 12 0" stroke="#1e2a4d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g transform="translate(128,92)">
        <ellipse cx="20" cy="18" rx="20" ry="14" fill="#a7b6d9" />
        <ellipse cx="4" cy="8" rx="7" ry="10" fill="#a7b6d9" />
        <circle cx="30" cy="12" r="2" fill="#1e2a4d" />
      </g>
    </g>
  );
}

function School() {
  return (
    <g>
      <rect x="46" y="66" width="108" height="58" rx="6" fill="#ffffff" stroke="#4c8dff" strokeWidth="3" />
      <path d="M40 66l60-30 60 30z" fill="#4c8dff" />
      <rect x="94" y="90" width="12" height="34" rx="2" fill="#4c8dff" />
      <rect x="60" y="82" width="16" height="16" rx="2" fill="#ffc93c" />
      <rect x="124" y="82" width="16" height="16" rx="2" fill="#ffc93c" />
      <rect x="118" y="36" width="4" height="20" fill="#1e2a4d" />
      <path d="M122 36l16 6-16 6z" fill="#ff8fa3" />
    </g>
  );
}

function Family() {
  const people = [
    { x: 46, h: 60, shirt: "#4c8dff", skin: "#f2b98a" },
    { x: 82, h: 70, shirt: "#ff8fa3", skin: "#ffdcbf" },
    { x: 122, h: 48, shirt: "#3ec6a8", skin: "#f2b98a" },
    { x: 152, h: 40, shirt: "#ffc93c", skin: "#ffdcbf" },
  ];
  return (
    <g>
      {people.map((p, i) => (
        <g key={i} transform={`translate(${p.x},${124 - p.h})`}>
          <rect x="-14" y={p.h * 0.35} width="28" height={p.h * 0.65} rx="10" fill={p.shirt} />
          <circle cx="0" cy="0" r={p.h * 0.28} fill={p.skin} />
        </g>
      ))}
    </g>
  );
}

function Food() {
  return (
    <g>
      <path d="M100 40l46 84H54z" fill="#ffc93c" stroke="#1e2a4d" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="92" cy="76" r="6" fill="#e05555" />
      <circle cx="112" cy="88" r="6" fill="#e05555" />
      <circle cx="98" cy="100" r="6" fill="#e05555" />
      <circle cx="150" cy="100" r="16" fill="#ff6b57" stroke="#1e2a4d" strokeWidth="2" />
      <path d="M144 88q6-8 12 0" stroke="#3ec6a8" strokeWidth="3" fill="none" strokeLinecap="round" />
    </g>
  );
}

function Nature() {
  return (
    <g>
      <path d="M40 40q20-16 40 0" stroke="#ffc93c" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="40" cy="46" r="14" fill="#ffe28a" />
      <rect x="94" y="80" width="12" height="34" fill="#8a5a35" />
      <circle cx="100" cy="62" r="30" fill="#4caf7d" />
      <circle cx="80" cy="78" r="20" fill="#3ec6a8" />
      <circle cx="122" cy="78" r="20" fill="#3ec6a8" />
      <path d="M20 124q80-24 160 0" fill="#cdeede" />
    </g>
  );
}

function Colors() {
  return (
    <g>
      <circle cx="72" cy="70" r="26" fill="#ff8fa3" opacity="0.9" />
      <rect x="96" y="56" width="46" height="46" rx="8" fill="#4c8dff" opacity="0.9" />
      <path d="M130 100l24 40h-48z" fill="#ffc93c" opacity="0.9" />
    </g>
  );
}

function Numbers() {
  return (
    <g fontFamily="var(--font-heading)" fontWeight="800">
      <rect x="44" y="50" width="34" height="50" rx="10" fill="#4c8dff" />
      <text x="61" y="85" fontSize="30" fill="#fff" textAnchor="middle">1</text>
      <rect x="84" y="50" width="34" height="50" rx="10" fill="#ff8fa3" />
      <text x="101" y="85" fontSize="30" fill="#fff" textAnchor="middle">2</text>
      <rect x="124" y="50" width="34" height="50" rx="10" fill="#3ec6a8" />
      <text x="141" y="85" fontSize="30" fill="#fff" textAnchor="middle">3</text>
    </g>
  );
}

function Body() {
  return (
    <g>
      <circle cx="100" cy="46" r="18" fill="#f2b98a" />
      <rect x="82" y="64" width="36" height="46" rx="14" fill="#4c8dff" />
      <rect x="60" y="70" width="16" height="34" rx="8" fill="#f2b98a" />
      <rect x="124" y="70" width="16" height="34" rx="8" fill="#f2b98a" />
      <rect x="86" y="108" width="14" height="30" rx="7" fill="#1e2a4d" />
      <rect x="100" y="108" width="14" height="30" rx="7" fill="#1e2a4d" />
      <g stroke="#ff8fa3" strokeWidth="2" strokeDasharray="4 3" fill="none">
        <circle cx="100" cy="46" r="26" />
        <circle cx="68" cy="86" r="14" />
        <circle cx="93" cy="130" r="12" />
      </g>
    </g>
  );
}

function Places() {
  return (
    <g>
      <rect x="46" y="76" width="46" height="48" fill="#ffffff" stroke="#4c8dff" strokeWidth="3" />
      <path d="M40 76l32-22 32 22z" fill="#ff8fa3" />
      <rect x="112" y="56" width="30" height="68" fill="#ffffff" stroke="#3ec6a8" strokeWidth="3" />
      <rect x="118" y="66" width="8" height="8" fill="#3ec6a8" />
      <rect x="130" y="66" width="8" height="8" fill="#3ec6a8" />
      <rect x="118" y="82" width="8" height="8" fill="#3ec6a8" />
      <rect x="130" y="82" width="8" height="8" fill="#3ec6a8" />
      <rect x="62" y="98" width="16" height="26" fill="#4c8dff" />
    </g>
  );
}

function Party() {
  return (
    <g>
      {[
        { x: 66, c: "#ff8fa3" },
        { x: 100, c: "#4c8dff" },
        { x: 134, c: "#ffc93c" },
      ].map((b, i) => (
        <g key={i}>
          <ellipse cx={b.x} cy={60 + (i % 2 === 0 ? 0 : -10)} rx="16" ry="20" fill={b.c} />
          <line x1={b.x} y1={80 + (i % 2 === 0 ? 0 : -10)} x2={b.x + (i - 1) * 6} y2="120" stroke="#1e2a4d" strokeWidth="1.5" />
        </g>
      ))}
      <g fill="#3ec6a8">
        <circle cx="50" cy="110" r="3" />
        <circle cx="150" cy="100" r="3" />
        <circle cx="70" cy="120" r="3" fill="#ffc93c" />
        <circle cx="130" cy="118" r="3" fill="#ff8fa3" />
      </g>
    </g>
  );
}

const ART = {
  world: World,
  animals: Animals,
  school: School,
  family: Family,
  food: Food,
  nature: Nature,
  colors: Colors,
  numbers: Numbers,
  body: Body,
  places: Places,
  party: Party,
};

export default function BookCoverArt({ art, className = "" }) {
  const Art = ART[art] || World;
  return (
    <svg viewBox="0 0 200 150" className={className}>
      <Art />
    </svg>
  );
}
