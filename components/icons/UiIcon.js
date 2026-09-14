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
    home: <><path d="M4 11 12 4l8 7"/><path d="M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9"/></>,
    users: <><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c0-3.3 2.5-6 5.5-6s5.5 2.7 5.5 6"/><circle cx="17" cy="9" r="2.6"/><path d="M15.5 14.2c2.6.4 4.5 2.6 4.5 5.3"/></>,
    paw: <><circle cx="12" cy="15" r="4.2"/><circle cx="6" cy="9" r="2"/><circle cx="18" cy="9" r="2"/><circle cx="9" cy="5.5" r="1.8"/><circle cx="15" cy="5.5" r="1.8"/></>,
    utensils: <><path d="M5 2v6M7 2v6M9 2v6M7 8v14"/><path d="M17 2c-2 0-3 2-3 4.5S15 11 17 11s3-2 3-4.5S19 2 17 2Zm0 9v11"/></>,
    leaf: <><path d="M4 20C4 10 12 4 20 4c0 8-6 16-16 16Z"/><path d="M6 18C10 14 14 10 18 6"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.9 2-2 0-.6-.2-1-.5-1.4-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 0 0 4-4c0-4.4-4-7.5-9-7.5Z"/><circle cx="7.5" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="9" cy="8" r="1.1" fill="currentColor" stroke="none"/><circle cx="14" cy="7.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="17" cy="11" r="1.1" fill="currentColor" stroke="none"/></>,
    hash: <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18"/>,
    person: <><circle cx="12" cy="7" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></>,
    pin: <><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13Z"/><circle cx="12" cy="9" r="2.6"/></>,
    gift: <><rect x="4" y="10" width="16" height="10" rx="1.5"/><path d="M4 10h16M12 10v10M12 10C9 10 8 7 9.5 5.5 11 4 12 6 12 10ZM12 10c3 0 4-3 2.5-4.5C13 4 12 6 12 10Z"/></>,
    cap: <><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5"/><path d="M22 8v6"/></>,
    download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></>,
    heart: <path d="M12 21s-7.5-4.6-10-9.5C.5 7.8 3 4 7 4c2 0 3.6 1.1 5 3 1.4-1.9 3-3 5-3 4 0 6.5 3.8 5 7.5C19.5 16.4 12 21 12 21Z" fill="currentColor" stroke="none"/>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.2 3.2"/></>,
  };
  return <svg className={`ui-icon ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{shapes[name] || shapes.category}</svg>;
}
