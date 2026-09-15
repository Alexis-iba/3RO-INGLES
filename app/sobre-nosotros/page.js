import Image from "next/image";

export const metadata = { title: "Sobre nosotros — EnglishKids" };

export default function SobreNosotrosPage() {
  return (
    <div className="about-page section-container py-8 md:py-12">
      <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Sobre nosotros</h1>
      <p className="mt-2 max-w-xl text-navy/60">
        Creemos en un mundo con más oportunidades a través del aprendizaje del inglés.
      </p>

      <div className="about-hero">
        <div className="about-hero-clouds" aria-hidden="true" />
        <div className="about-hero-art">
          <Image
            src="/about-images/about-illustration.png"
            alt="Tres niños leyendo un libro gigante junto a un globo terráqueo, con las frases 'A new language is a new world' y 'English Opens New Doors'"
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className="object-cover"
            priority
          />
        </div>

        <div className="about-hero-cards">
          <div className="card p-6 border border-purple-100 shadow-[0_4px_16px_rgba(7,52,113,0.06)] bg-white/95 backdrop-blur-xs">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-black uppercase tracking-wider mb-3">
              Misión
            </span>
            <h3 className="mb-2 font-heading text-lg font-extrabold text-navy">Nuestra misión</h3>
            <p className="text-sm text-navy/70 leading-relaxed">
              Hacer del aprendizaje del inglés una experiencia divertida, accesible y significativa para los niños.
            </p>
          </div>
          <div className="card p-6 border border-emerald-100 shadow-[0_4px_16px_rgba(7,52,113,0.06)] bg-white/95 backdrop-blur-xs">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black uppercase tracking-wider mb-3">
              Pilares
            </span>
            <h3 className="mb-2 font-heading text-lg font-extrabold text-navy">Nuestros valores</h3>
            <ul className="flex flex-col gap-1.5 text-sm font-bold text-navy/80">
              <li className="flex items-center gap-2"><span>🌟</span> Educación de calidad</li>
              <li className="flex items-center gap-2"><span>🎮</span> Aprendizaje lúdico</li>
              <li className="flex items-center gap-2"><span>🤝</span> Inclusión y calidez</li>
              <li className="flex items-center gap-2"><span>💡</span> Creatividad activa</li>
            </ul>
          </div>
          <div className="card p-6 border border-amber-100 shadow-[0_4px_16px_rgba(7,52,113,0.06)] bg-white/95 backdrop-blur-xs">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-wider mb-3">
              Objetivo
            </span>
            <h3 className="mb-2 font-heading text-lg font-extrabold text-navy">Nuestro propósito</h3>
            <p className="text-sm text-navy/70 leading-relaxed">
              Acompañar a los niños en sus primeras etapas de aprendizaje del inglés, preparándolos para un mundo lleno de posibilidades.
            </p>
          </div>
        </div>

        <p className="about-hero-quote">
          <span>&quot;A new language is a new world.&quot;</span>
          <span aria-hidden="true">🚀</span>
        </p>
      </div>

      <p className="about-lead">
        En EnglishKids diseñamos libros y recursos pensados especialmente para niños y niñas de 3° de
        primaria, combinando historias, vocabulario en contexto y actividades interactivas para que
        aprender inglés se sienta como un juego, no como una tarea.
      </p>
    </div>
  );
}
