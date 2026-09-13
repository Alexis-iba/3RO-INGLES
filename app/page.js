import Link from "next/link";
import Image from "next/image";
import BrandLogo from "@/components/icons/BrandLogo";
import Rocket from "@/components/icons/Rocket";
import "./home.css";

const links = [["/", "Inicio"], ["/catalogo", "Libros"], ["/actividades", "Actividades"], ["/recursos", "Recursos"], ["/sobre-nosotros", "Sobre nosotros"], ["/contacto", "Contacto"]];
const features = [
  { title: <>Libros<br />ilustrados</>, href: "/catalogo", icon: "book", color: "#7847d8", background: "#f7f3ff" },
  { title: <>Actividades<br />divertidas</>, href: "/actividades", icon: "game", color: "#16a584", background: "#f0fbf7" },
  { title: <>Vocabulario<br />en contexto</>, href: "/recursos", icon: "cup", color: "#edae24", background: "#fffbef" },
  { title: <>Aprendizaje<br />para la vida</>, href: "/sobre-nosotros", icon: "heart", color: "#ef657a", background: "#fff3f6" },
];
const books = [
  { id: "my-world-in-english", title: "My World in English", photo: "world", color: "#c7eaff", ink: "#07528b", alt: "Ilustración infantil del planeta Tierra", art: ["world", "boy", "girl"] },
  { id: "animals-around-us", title: "Animals Around Us", photo: "animals", color: "#dcf1cb", ink: "#326527", alt: "Ilustraciones infantiles de un elefante y un león", art: ["elephant", "lion"] },
  { id: "at-school", title: "At School", photo: "school", color: "#bfeaf4", ink: "#ce492c", alt: "Una escuela de colores con niños", art: ["school", "boy", "girl"] },
  { id: "my-family", title: "My Family", photo: "family", color: "#ffe39b", ink: "#b63e32", alt: "Ilustración infantil de una familia", art: ["family"] },
];
function FeatureIcon({ name }) {
  const paths = {
    book: <><path d="M12 6C8 3 4 3 2 4v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-2-1-6-1-10 2Z"/><path d="M12 6v15"/></>,
    game: <><path d="M7 6h10c3 0 4 3 5 10 0 3-2 4-4 2l-3-3H9l-3 3c-2 2-4 1-4-2 1-7 2-10 5-10Z"/><path d="M7 9v5m-2.5-2.5h5M16 10h.1M19 13h.1"/></>,
    cup: <><path d="M7 3h10v7a5 5 0 0 1-10 0V3Zm5 12v6m-4 0h8M7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4"/></>,
    heart: <path d="M12 21 3 12C-3 5 7-2 12 6c5-8 15-1 9 6Z" />,
  };
  return <svg viewBox="0 0 24 24" fill={name === "heart" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}
export default function HomePage() {
  return (
    <article className="reference-home">
      <header className="reference-header">
        <Link className="reference-logo" href="/" aria-label="EnglishKids — Inicio"><BrandLogo className="reference-logo-img" priority /></Link>
        <nav aria-label="Navegación principal">{links.map(([href, title]) => <Link key={href} href={href} aria-current={href === "/" ? "page" : undefined}>{title}</Link>)}</nav>
        <Link className="reference-search" href="/catalogo" aria-label="Buscar libros"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="10" cy="10" r="6.5" /><path d="m15 15 6 6" /></svg></Link>
      </header>
      <section className="reference-hero" aria-labelledby="home-title">
        <div className="hero-copy"><h1 id="home-title">Pequeños<br />pasos, <span className="word-green">grandes</span><br /><span className="word-orange">futuros</span></h1><p>Libros y recursos de inglés para niños de <strong>3° de primaria.</strong></p><Link className="reference-explore" href="/catalogo">Explora los libros <span aria-hidden="true">→</span></Link></div>
        <div className="hero-photograph hero-brand-art"><Image src="/INICO.png" alt="Ranita sonriente y perrito saludando, personajes de EnglishKids" fill priority sizes="(max-width: 700px) 90vw, 50vw" /></div>
        <span className="hero-motto">Play<br />Learn<br />Grow</span><span className="hero-star star-one" aria-hidden="true">✦</span><span className="hero-star star-two" aria-hidden="true">✦</span><div className="hero-clouds" aria-hidden="true" />
      </section>
      <section className="reference-features" aria-label="Aprende con EnglishKids">{features.map((feature) => <Link key={feature.icon} href={feature.href} className="reference-feature" style={{ background: feature.background, "--icon-color": feature.color }}><FeatureIcon name={feature.icon} /><span>{feature.title}</span></Link>)}</section>
      <section className="reference-books" aria-labelledby="featured-title">
        <div className="reference-books-heading"><h2 id="featured-title">Libros destacados para 3° de primaria</h2><Link href="/catalogo">Ver todos →</Link></div>
        <div className="reference-book-grid">{books.map((book) => <Link key={book.id} href={`/libros/${book.id}`} className="reference-book" style={{ background: book.color, color: book.ink }} aria-label={`Ver ${book.title}`}><h3>{book.title}</h3><div className="cover-photo supplied-book-art"><Image src={`/book-images/${book.photo}.png`} alt={`Ilustración de niños con libros para ${book.title}`} fill sizes="(max-width: 700px) 45vw, 23vw" /></div><span className="cover-level">ENGLISH · 3° PRIMARIA</span></Link>)}</div>
      </section>
      <div className="reference-bottom"><Rocket /><h2>English is a new<br /><span>adventure!</span></h2><span className="banner-star" aria-hidden="true">✦</span></div>
    </article>
  );
}




