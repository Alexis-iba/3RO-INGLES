// Iconos planos a color para las 4 tarjetas de tipo de actividad,
// calcados al diseño de referencia (bloques ABC, audífonos, lápiz, control).

function AbcBlocks() {
  return (
    <div className="abc-blocks" aria-hidden="true">
      <span className="abc-block abc-block-a">A</span>
      <span className="abc-block abc-block-b">B</span>
      <span className="abc-block abc-block-c">C</span>
    </div>
  );
}

function Headphones() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true">
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="5" height="7" rx="2" />
      <rect x="16.5" y="13" width="5" height="7" rx="2" />
    </svg>
  );
}

function Pencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="26" height="26" aria-hidden="true" transform="rotate(-6)">
      <path d="M4 20l1-4.5L16 4.5 19.5 8 8.5 19z" />
      <path d="M14 6.5 17.5 10" />
      <path d="M4 20l3-1-1.5-1.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Controller() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
      <path d="M6.5 8h11a4 4 0 0 1 4 4.5l-.7 4a2.6 2.6 0 0 1-4.4 1.4L14 15.5h-4l-2.4 2.4A2.6 2.6 0 0 1 3.2 16.5l-.7-4A4 4 0 0 1 6.5 8Z" />
      <path d="M8 10.5v3M6.5 12h3" />
      <circle cx="17" cy="10.5" r=".9" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r=".9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const ICONS = { abc: AbcBlocks, headphones: Headphones, pencil: Pencil, controller: Controller };

export default function ActivityIcon({ name, className = "" }) {
  const Icon = ICONS[name] || AbcBlocks;
  return (
    <div className={`activity-icon-box activity-icon-${name} ${className}`}>
      <Icon />
    </div>
  );
}
