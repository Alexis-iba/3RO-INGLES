import Link from "next/link";
import BrandLogo from "./icons/BrandLogo";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./icons/SocialIcons";

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
    <footer className="mt-16 bg-navy text-white">
      <div className="section-container flex flex-col items-center gap-5 py-6 lg:flex-row lg:justify-between">
        <Link href="/" className="flex items-center">
          <BrandLogo className="h-9 w-auto" />
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-bold text-[#c7d0e8]">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <a href="#" aria-label="Facebook" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="Instagram" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a href="#" aria-label="YouTube" className="grid h-8 w-8 place-items-center rounded-full bg-white/10 hover:bg-white/20">
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
          <span className="hidden text-sm font-semibold text-[#c7d0e8] sm:inline">
            Pequeños lectores, grandes historias ❤️
          </span>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-xs text-[#93a0c2]">
        © {new Date().getFullYear()} EnglishKids — &quot;A new language is a new world.&quot;
      </div>
    </footer>
  );
}
