export default function UiIcon({ name, className = "", size = 20 }) {
  const shapes = {
    search: <><circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/></>,
    book: <><path d="M3 4h7l2 2 2-2h7v16h-7l-2 2-2-2H3Z"/><path d="M12 6v16M6 8h3M15 8h3"/></>,
    pages: <><rect x="6" y="5" width="14" height="17" rx="2"/><path d="M16 5V2H3v16h3M10 10h6m-6 4h6m-6 4h4"/></>,
    format: <><path d="M3 8h7l2-3h9v15H3Z"/><path d="M8 8V2h8v3m-1 7v5m-2-2 2 2 2-2"/></>,
    language: <><circle cx="8" cy="6" r="3"/><circle cx="17" cy="12" r="3"/><path d="M2 17v-3a6 6 0 0 1 12 0m-3 8v-3a6 6 0 0 1 11 0v3M8 12v8m-3-3h6"/></>,
    category: <><rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 8h8m-8 4h8m-8 4h5"/></>,
    all: <><rect x="3" y="3" width="18" height="18" rx="4"/><path d="m12 7 1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L7 10.5l3.5-.5Z"/></>,
    check: <><rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" stroke="none"/><path d="m6 12 4 4 8-9" stroke="white"/></>,
    left: <path d="m10 5-7 7 7 7M3 12h18"/>, right: <path d="m14 5 7 7-7 7M3 12h18"/>,
  };
  return <svg className={`ui-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name] || shapes.category}</svg>;
}
