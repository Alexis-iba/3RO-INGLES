export default function Rocket({ className = "" }) {
  return (
    <svg viewBox="0 0 64 64" className={className}>
      <path
        d="M32 4c8 6 12 16 12 26 0 6-2 11-4 14l-8 6-8-6c-2-3-4-8-4-14 0-10 4-20 12-26z"
        fill="#ffe3a3"
        stroke="#f5b400"
        strokeWidth="2"
      />
      <circle cx="32" cy="24" r="6" fill="#4c8dff" stroke="#1e2a4d" strokeWidth="1.5" />
      <path d="M20 34l-8 10 12-3z" fill="#ff8fa3" />
      <path d="M44 34l8 10-12-3z" fill="#ff8fa3" />
      <path d="M26 46l6 12 6-12-6 3z" fill="#ff9f5a" />
    </svg>
  );
}
