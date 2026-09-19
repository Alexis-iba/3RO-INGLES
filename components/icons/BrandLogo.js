import Image from "next/image";
import brandLogo from "../../public/logo_ploopi.svg";

// Logotipo oficial (Ploopi) usado como título en la cabecera
export default function BrandLogo({ className = "h-20 w-auto sm:h-18 md:h-20 lg:h-22", priority = false }) {
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
