import Link from "next/link";
import Image from "next/image";
import { BookOpen, Gamepad2, Heart, Trophy, ArrowRight, Sparkles, Star, Volume2, Printer, Gamepad } from "lucide-react";
import heroImage from "../public/INICO.png";
import Rocket from "@/components/icons/Rocket";
import "./home.css";

const categories = [
  { 
    title: "Libros ilustrados", 
    desc: "Cuentos interactivos y lecturas guiadas para desarrollar la comprensión lectora.",
    href: "/catalogo", 
    icon: "book", 
    color: "#ea85be", 
    bg: "#fdf2f8",
    borderColor: "#fbcfe8",
    buttonText: "Ver catálogo",
    tag: "Lectura"
  },
  { 
    title: "Actividades & Juegos", 
    desc: "Quiz interactivos, retos contrarreloj, memoria y juegos de ortografía en inglés.",
    href: "/actividades", 
    icon: "game", 
    color: "#00aef0", 
    bg: "#f0f9ff",
    borderColor: "#bae6fd",
    buttonText: "Jugar ahora",
    tag: "Interactividad"
  },
  { 
    title: "Vocabulario & Audios", 
    desc: "Banco de palabras con pronunciación nativa y fichas didácticas imprimibles.",
    href: "/recursos", 
    icon: "cup", 
    color: "#53a762", 
    bg: "#f0fdf4",
    borderColor: "#bbf7d0",
    buttonText: "Explorar audios",
    tag: "Práctica"
  },
  { 
    title: "Sobre el método", 
    desc: "Acompañamos a los niños en sus primeros pasos con educación bilingüe y valores.",
    href: "/sobre-nosotros", 
    icon: "heart", 
    color: "#ff7828", 
    bg: "#fff7ed",
    borderColor: "#ffedd5",
    buttonText: "Conocer más",
    tag: "Comunidad"
  },
];

const books = [
  { 
    id: "my-world-in-english", 
    title: "My World in English", 
    photo: "world", 
    color: "#e0f2fe", 
    ink: "#0369a1",
    unit: "Unidad 1"
  },
  { 
    id: "animals-around-us", 
    title: "Animals Around Us", 
    photo: "animals", 
    color: "#dcfce7", 
    ink: "#15803d",
    unit: "Unidad 2"
  },
  { 
    id: "at-school", 
    title: "At School", 
    photo: "school", 
    color: "#ffedd5", 
    ink: "#c2410c",
    unit: "Unidad 3"
  },
  { 
    id: "my-family", 
    title: "My Family", 
    photo: "family", 
    color: "#fef9c3", 
    ink: "#a16207",
    unit: "Unidad 4"
  },
];

function FeatureIcon({ name }) {
  const icons = { book: BookOpen, game: Gamepad2, cup: Trophy, heart: Heart };
  const Icon = icons[name] || BookOpen;
  return <Icon size={30} strokeWidth={2.4} aria-hidden="true" />;
}

function RainbowWord({ children }) {
  const colors = ["#e84840", "#4b83ed", "#ef9230", "#63aa53", "#6d43d8"];
  return (
    <span className="hero-rainbow" aria-label={children}>
      {[...children].map((letter, index) => (
        <span key={index} aria-hidden="true" style={{ color: colors[index % colors.length] }}>
          {letter}
        </span>
      ))}
    </span>
  );
}

export default function HomePage() {
  return (
    <article className="reference-home">
      {/* Hero Section */}
      <section className="reference-hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <div className="hero-top-badge">
            <span>INGLÉS DIVERTIDO PARA 3° DE PRIMARIA</span>
          </div>

          <h1 id="home-title">
            Pequeños pasos,<br />
            <RainbowWord>grandes</RainbowWord> <RainbowWord>futuros</RainbowWord>
          </h1>
          
          <p>
            Cuentos interactivos, juegos y vocabulario diseñados para aprender jugando.
          </p>

          <Link className="reference-explore" href="/catalogo">
            Explora los libros <ArrowRight size={20} strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>

        <div className="hero-photograph hero-brand-art">
          <Image
            src={heroImage}
            alt="Ranita sonriente y perrito saludando, personajes de EnglishKids"
            fill
            priority
            sizes="(max-width: 700px) 90vw, 50vw"
          />
        </div>

        <span className="hero-motto">
          Play<br />
          Learn<br />
          Grow <i aria-hidden="true">♥</i>
        </span>
        <div className="hero-clouds" aria-hidden="true" />
      </section>

      {/* 4 Solid Colored Category Cards - 100% Full Width Edge to Edge */}
      <section className="clean-categories-section">
        <div className="section-title-centered">
          <span className="section-pill-tag">EXPLORA POR ÁREAS</span>
          <h2>¿Qué te gustaría aprender hoy?</h2>
        </div>

        <div className="clean-categories-grid">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className="solid-color-category-box"
              style={{ 
                backgroundColor: cat.color,
                "--cat-color": cat.color 
              }}
            >
              <div className="solid-category-top">
                <FeatureIcon name={cat.icon} />
                <span className="solid-category-tag">
                  {cat.tag}
                </span>
              </div>

              <h3 className="solid-category-heading">
                {cat.title}
              </h3>

              <p className="solid-category-description">
                {cat.desc}
              </p>

              <div className="solid-category-footer">
                <Link 
                  href={cat.href}
                  className="solid-category-btn"
                  style={{ color: cat.color }}
                >
                  {cat.buttonText}
                  <ArrowRight size={15} strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Container */}
      <section className="home-content-wrap">

        {/* Featured Books Section */}
        <section className="featured-books-section" aria-labelledby="featured-title">
          <div className="section-header-clean">
            <div>
              <div className="section-eyebrow">
                <Sparkles size={16} className="text-[#e30613]" />
                <span>COLECCIÓN DESTACADA</span>
              </div>
              <h2 id="featured-title" className="section-main-title">
                Libros para 3° de primaria
              </h2>
            </div>
            <Link href="/catalogo" className="section-view-all-btn">
              Ver todos los libros
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="clean-books-grid">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/libros/${book.id}`}
                className="clean-book-card"
                aria-label={`Ver libro ${book.title}`}
              >
                <div className="clean-book-cover-wrap" style={{ backgroundColor: book.color }}>
                  <div className="clean-book-tags">
                    <span className="clean-book-grade">3° PRIMARIA</span>
                    <span className="clean-book-unit" style={{ color: book.ink }}>{book.unit}</span>
                  </div>
                  <div className="clean-book-image-box">
                    <Image
                      src={`/book-images/${book.photo}.png`}
                      alt={`Portada de ${book.title}`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 260px"
                    />
                  </div>
                </div>
                <div className="clean-book-details">
                  <h3 className="clean-book-title" title={book.title}>
                    {book.title}
                  </h3>
                  <div className="clean-book-action">
                    <span className="clean-book-btn">
                      Ver libro
                      <ArrowRight size={14} strokeWidth={2.5} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </section>

      {/* Playful Full-Width Mattel / Fisher-Price Style Ribbon Banner (Flush to Footer) */}
      <section className="fisher-price-banner" aria-label="Aprende y juega">
        <div className="banner-svg-left" aria-hidden="true">
          <svg className="banner-loop-arcs" viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 90 C 25 10, 115 10, 145 90" stroke="#ff7828" strokeWidth="6" strokeLinecap="round" />
            <path d="M95 90 C 130 25, 210 25, 236 90" stroke="#ff7828" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>

        <div className="banner-center-action">
          <Link href="/actividades" className="banner-pill-cta">
            ¡Comenzar la aventura!
          </Link>
        </div>

        <div className="banner-svg-right" aria-hidden="true">
          <svg className="banner-loop-arcs" viewBox="0 0 240 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 90 C 30 25, 110 25, 145 90" stroke="#ff7828" strokeWidth="6" strokeLinecap="round" />
            <path d="M95 90 C 125 10, 215 10, 236 90" stroke="#ff7828" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
      </section>
    </article>
  );
}




