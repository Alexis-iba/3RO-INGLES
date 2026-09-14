import Image from "next/image";
import { ACTIVITY_ART } from "@/lib/activity-art";

// Una misma ilustración por palabra en las cuatro modalidades.
export default function ActivityImage({ word, className = "", decorative = false, priority = false, sizes = "220px" }) {
  const art = ACTIVITY_ART[word];
  if (!art) throw new Error(`Falta la ilustración de actividad: ${word}`);

  return (
    <Image
      src={`/activity-images/${art.file}`}
      alt={decorative ? "" : art.alt}
      width={512}
      height={512}
      sizes={sizes}
      priority={priority}
      className={`activity-art ${className}`}
    />
  );
}
