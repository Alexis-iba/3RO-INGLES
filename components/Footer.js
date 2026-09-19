import Link from "next/link";
import Image from "next/image";
import logoFooter from "../public/logo_ploopi.svg";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Libros" },
  { href: "/actividades", label: "Actividades" },
  { href: "/recursos", label: "Recursos" },
  { href: "/sobre-nosotros", label: "Sobre nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="section-container flex flex-col items-center gap-5 py-8 lg:flex-row lg:justify-between">
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <Image
            src={logoFooter}
            alt="Ploopi"
            width={24098}
            height={7920}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold text-[#c7d0e8]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm font-semibold text-[#c7d0e8] sm:inline">
            Pequeños lectores, grandes historias ❤️
          </span>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 pb-20 md:pb-3 text-center text-xs text-[#93a0c2]">
        © {new Date().getFullYear()} EnglishKids — &quot;A new language is a new world.&quot;
      </div>
    </footer>
  );
}
