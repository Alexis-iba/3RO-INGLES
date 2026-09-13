export default function BookLogo({ className = "" }) {
  return <svg viewBox="0 0 48 40" className={className} aria-hidden="true">
    <path d="M3 7Q14 3 24 9 34 3 45 7v29q-12-3-21 1-10-4-21-1Z" fill="#ffcc44" stroke="#174577" strokeWidth="2"/>
    <path d="M5 5Q15 2 23 8v26Q14 29 5 32Z" fill="#27bfc7" stroke="#174577" strokeWidth="1.5"/>
    <path d="M25 8Q34 2 43 5v27q-9-3-18 2Z" fill="#f36364" stroke="#174577" strokeWidth="1.5"/>
    <path d="M23 8h2v27h-2Z" fill="#fff6d6"/>
    <rect x="9" y="10" width="9" height="12" rx="2" fill="white"/><path d="m12 14 1.5 3 2.5-5" fill="none" stroke="#edb536" strokeWidth="1.5"/>
    <path d="M31 11h7m-7 4h7m-7 4h5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}
