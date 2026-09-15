import Image from "next/image";
import brandLogo from "../../public/english-kids-frog.png";

// Logotipo oficial (ranita + wordmark "EnglishKids") usado como título en
// todo el sitio, en vez del icono de libro + texto anterior.
export default function BrandLogo({ className = "h-11 w-auto", priority = false }) {
  return (
    <Image
      src={brandLogo}
      alt="EnglishKids"
      width={1713}
      height={918}
      priority={priority}
      className={className}
    />
  );
}
