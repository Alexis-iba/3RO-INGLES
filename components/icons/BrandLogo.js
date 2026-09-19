import Image from "next/image";
import brandLogo from "../../public/logo_ploopi.svg";

// Logotipo oficial (Ploopi) usado como título en la cabecera
export default function BrandLogo({ className = "h-11 w-auto", priority = false }) {
  return (
    <Image
      src={brandLogo}
      alt="Ploopi"
      width={24098}
      height={7920}
      priority={priority}
      className={className}
    />
  );
}
