"use client";

import { useState } from "react";
import Image from "next/image";
import UiIcon from "@/components/icons/UiIcon";

const FIELDS = [
  { name: "name", label: "Nombre", type: "text", placeholder: "Tu nombre", validate: (v) => v.trim().length >= 2, error: "Por favor escribe tu nombre." },
  { name: "email", label: "Correo electrónico", type: "email", placeholder: "tucorreo@ejemplo.com", validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), error: "Escribe un correo electrónico válido." },
  { name: "subject", label: "Asunto", type: "text", placeholder: "¿Sobre qué nos escribes?", validate: (v) => v.trim().length >= 3, error: "Por favor escribe un asunto." },
];

export default function ContactoPage() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function update(name, value) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  function validateAll() {
    const nextErrors = {};
    FIELDS.forEach((f) => {
      if (!f.validate(values[f.name] || "")) nextErrors[f.name] = f.error;
    });
    if (values.message.trim().length < 10) nextErrors.message = "Por favor escribe tu mensaje (mínimo 10 caracteres).";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validateAll()) return;

    try {
      const stored = JSON.parse(localStorage.getItem("englishkids_messages") || "[]");
      stored.push({ ...values, date: new Date().toISOString() });
      localStorage.setItem("englishkids_messages", JSON.stringify(stored));
    } catch {
      /* localStorage no disponible; el envío sigue mostrando confirmación */
    }

    setSuccess(true);
    setValues({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  }

  return (
    <div className="contact-page section-container py-8 md:py-12">
      <h1 className="font-heading text-3xl font-extrabold text-navy md:text-[34px]">Contacto</h1>
      <p className="font-bold">¡Nos encantaría saber de ti!</p>
      <p className="mt-2 max-w-xl text-navy/60">
        Si tienes dudas, sugerencias o quieres más información sobre nuestros libros y recursos, escríbenos.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="contact-hero">
          <div className="contact-hero-clouds" aria-hidden="true" />
          <div className="contact-hero-info">
            <InfoRow icon="mail" color="text-brand-blue" label="Correo electrónico" value="info@englishkids.com" />
            <InfoRow icon="pin" color="text-brand-pink" label="Ubicación" value="Morelia, Michoacán, México" />
            <InfoRow icon="clock" color="text-brand-blue" label="Horario de atención" value="Lunes a viernes, 9:00 a.m. - 6:00 p.m." />
          </div>
          <div className="contact-hero-art">
            <Image
              src="/contact-images/contact-illustration.png"
              alt="Niña sonriente abrazando un libro, sobre una pila de libros que dicen Explore, Learn, Grow, junto a un globo terráqueo, con una burbuja de diálogo que dice ¡Hablemos!"
              fill
              sizes="(max-width: 700px) 240px, 300px"
              className="object-contain"
            />
          </div>
          <p className="contact-hero-quote">&quot;Better learners, brighter tomorrows.&quot;</p>
        </div>

        <div className="card p-7">
          {success && (
            <div className="mb-4 rounded-xl bg-[#e3f7ee] px-4.5 py-3.5 font-bold text-[#1c7a4d]">
              ✅ ¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate>
            {FIELDS.map((f) => (
              <div key={f.name} className="mb-4">
                <label htmlFor={f.name} className="mb-1.5 block text-[13px] font-extrabold">
                  {f.label}
                </label>
                <input
                  id={f.name}
                  type={f.type}
                  value={values[f.name]}
                  onChange={(e) => update(f.name, e.target.value)}
                  placeholder={f.placeholder}
                  className={`w-full rounded-xl border-2 px-3.5 py-3 text-sm focus:outline-none focus:border-brand-blue ${
                    errors[f.name] ? "border-[#d64545]" : "border-blue-light"
                  }`}
                />
                {errors[f.name] && <span className="mt-1 block text-xs text-[#d64545]">{errors[f.name]}</span>}
              </div>
            ))}
            <div className="mb-4">
              <label htmlFor="message" className="mb-1.5 block text-[13px] font-extrabold">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={5}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Escribe tu mensaje aquí..."
                className={`w-full rounded-xl border-2 px-3.5 py-3 text-sm focus:outline-none focus:border-brand-blue ${
                  errors.message ? "border-[#d64545]" : "border-blue-light"
                }`}
              />
              {errors.message && <span className="mt-1 block text-xs text-[#d64545]">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Enviar mensaje →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, color, label, value }) {
  return (
    <div className="flex items-start gap-3.5 rounded-2xl bg-white p-4 shadow-[0_4px_14px_rgba(30,42,77,0.08)]">
      <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-blue-light ${color}`}>
        <UiIcon name={icon} size={20} />
      </span>
      <span>
        <strong className="block text-sm">{label}</strong>
        <span className="text-[13px] text-navy/60">{value}</span>
      </span>
    </div>
  );
}
