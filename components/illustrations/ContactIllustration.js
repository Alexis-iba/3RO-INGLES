import Kid from "./Kid";

export default function ContactIllustration() {
  return (
    <div className="relative">
      <svg viewBox="0 0 260 240" className="w-full h-auto">
        <rect x="0" y="0" width="260" height="240" rx="28" fill="#eaf1fb" />
        <circle cx="210" cy="45" r="20" fill="#ffe28a" />
        <path d="M0 200 Q130 175 260 200 L260 240 L0 240Z" fill="#cdeede" />
        <Kid
          hair="pigtails"
          skin="#ffdcbf"
          hairColor="#6b3f22"
          shirt="#ff8fa3"
          pants="#4c8dff"
          backpack
          transform="translate(60,50) scale(1.7)"
        />
      </svg>
      <div className="absolute right-4 top-4 rounded-2xl rounded-br-sm bg-white px-4 py-2 text-sm font-extrabold text-navy shadow-soft">
        ¡Hablemos!
      </div>
    </div>
  );
}
