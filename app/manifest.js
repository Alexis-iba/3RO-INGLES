export default function manifest() {
  return {
    name: "EnglishKids — Aprende inglés jugando",
    short_name: "EnglishKids",
    description: "Libros y recursos de inglés para niños de 3° de primaria.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffd83d",
    theme_color: "#ffd83d",
    lang: "es",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
