export default function ActivityIcon({ name, className = "" }) {
  return <div className={`activity-icon-box activity-icon-${name} ${className}`} aria-hidden="true">
    <svg viewBox="0 0 80 80" fill="none">
      <defs>
        <linearGradient id={`paint-${name}`} x1="12" y1="8" x2="65" y2="75" gradientUnits="userSpaceOnUse"><stop stopColor={name === 'headphones' ? '#9858ff' : name === 'pencil' ? '#ffe17b' : '#4369bd'}/><stop offset="1" stopColor={name === 'headphones' ? '#4812bb' : name === 'pencil' ? '#ee960d' : '#15295f'}/></linearGradient>
      </defs>
      {name === 'abc' && <>
        <rect x="26" y="5" width="30" height="30" rx="5" fill="#79bf69"/><path d="M30 9h21" stroke="#ade19d" strokeWidth="3" strokeLinecap="round"/>
        <rect x="9" y="37" width="30" height="30" rx="5" fill="#ed8739"/><rect x="42" y="37" width="30" height="30" rx="5" fill="#599ce1"/>
        <g fill="white" fontFamily="Arial,sans-serif" fontSize="25" fontWeight="bold" textAnchor="middle"><text x="41" y="30">B</text><text x="24" y="61">B</text><text x="57" y="61">C</text></g>
      </>}
      {name === 'headphones' && <>
        <path d="M13 45V34a27 27 0 0154 0v11" stroke={`url(#paint-${name})`} strokeWidth="8"/><path d="M19 33a21 21 0 0142 0" stroke="#d3b6ff" strokeWidth="3"/>
        <rect x="8" y="37" width="16" height="30" rx="7" fill="#6324d4"/><rect x="56" y="37" width="16" height="30" rx="7" fill="#6324d4"/><rect x="19" y="35" width="9" height="34" rx="4" fill="#a167fc"/><rect x="52" y="35" width="9" height="34" rx="4" fill="#a167fc"/>
      </>}
      {name === 'pencil' && <g transform="rotate(40 40 40)"><rect x="29" y="5" width="23" height="16" rx="6" fill="#f06b64"/><path d="M29 22h23v39H29z" fill={`url(#paint-${name})`}/><path d="M32 23v36" stroke="#fff3a1" strokeWidth="5"/><path d="M29 17h23v8H29z" fill="#e0ccd0"/><path d="M29 61h23L40.5 77z" fill="#eac28b"/><path d="m36 71 4.5 6 4.5-6" fill="#34415b"/></g>}
      {name === 'controller' && <>
        <path d="M23 19c-9 0-13 8-16 24L4 59c-1 11 8 14 14 7l12-14h20l12 14c6 7 15 4 14-7l-3-16C70 27 66 19 57 19c-7 0-8 4-17 4s-10-4-17-4Z" fill={`url(#paint-${name})`}/>
        <path d="M23 29v17m-8-8h16" stroke="#c8d7f1" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="59" cy="31" r="4" fill="#ffc959"/><circle cx="66" cy="39" r="4" fill="#80b2f4"/><circle cx="52" cy="39" r="4" fill="#a08add"/><circle cx="59" cy="47" r="4" fill="#82c5a0"/>
      </>}
    </svg>
  </div>;
}
