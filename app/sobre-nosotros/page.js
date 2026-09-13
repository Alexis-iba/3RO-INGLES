import AboutIllustration from "@/components/illustrations/AboutIllustration";

export const metadata = { title: "Sobre nosotros — EnglishKids" };

export default function SobreNosotrosPage() {
  return (
    <div className="about-page section-container py-8 md:py-12">
      <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Sobre nosotros</h1>
      <p className="mt-2 max-w-xl text-navy/60">
        Creemos en un mundo con más oportunidades a través del aprendizaje del inglés.
      </p>

      <div className="about-illustration mt-8 grid items-center gap-9">
        <AboutIllustration />
        <p className="leading-relaxed text-navy/60">
          En EnglishKids diseñamos libros y recursos pensados especialmente para niños y niñas de 3° de
          primaria, combinando historias, vocabulario en contexto y actividades interactivas para que
          aprender inglés se sienta como un juego, no como una tarea.
        </p>
      </div>

      <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6">
          <h3 className="mb-3 font-heading text-[17px] font-extrabold">Nuestra misión</h3>
          <p className="text-sm text-navy/60">
            Hacer del aprendizaje del inglés una experiencia divertida, accesible y significativa para los niños.
          </p>
        </div>
        <div className="card p-6">
          <h3 className="mb-3 font-heading text-[17px] font-extrabold">Nuestros valores</h3>
          <ul className="flex flex-col gap-1.5 text-sm">
            <li>🔴 Educación de calidad</li>
            <li>🟢 Aprendizaje divertido</li>
            <li>🔵 Inclusión</li>
            <li>💗 Creatividad</li>
            <li>❤️ Un mejor futuro</li>
          </ul>
        </div>
        <div className="card p-6">
          <h3 className="mb-3 font-heading text-[17px] font-extrabold">Nuestro propósito</h3>
          <p className="text-sm text-navy/60">
            Acompañar a los niños en sus primeras etapas de aprendizaje del inglés, preparándolos para un
            mundo lleno de posibilidades.
          </p>
        </div>
      </div>

      <p className="mt-10 text-center font-heading text-xl italic text-navy md:text-2xl">
        &quot;A new language is a new world.&quot;
      </p>
    </div>
  );
}
