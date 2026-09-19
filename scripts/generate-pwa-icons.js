const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICON_SRC = path.join(ROOT, "public/favicon.svg");
const SPLASH_SRC = path.join(ROOT, "public/logo_splash.svg");
const OUT = path.join(ROOT, "public/icons");

// Icono con fondo 100% transparente para el Splash Screen
// (permite que el color amarillo #ffd83d del manifest se vea de fondo continuo y perfecto)
async function splashTransparentIcon(size, file, scale = 0.88) {
  const innerW = Math.round(size * scale);
  const innerH = Math.round(innerW / 1.5602);
  const padX = Math.round((size - innerW) / 2);
  const padY = Math.round((size - innerH) / 2);

  await sharp(SPLASH_SRC, { limitInputPixels: false })
    .resize(innerW, innerH, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: padY,
      bottom: size - innerH - padY,
      left: padX,
      right: size - innerW - padX,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, file));
}

// Icono del lanzador de celular (puro personaje con fondo blanco y mayor margen para verse equilibrado)
async function solidCharacterIcon(size, file, bg, scale = 0.60) {
  const inner = Math.round(size * scale);
  const pad = Math.round((size - inner) / 2);
  await sharp(ICON_SRC, { density: 600 })
    .resize(inner, inner, { fit: "contain", background: bg })
    .extend({
      top: pad,
      bottom: size - inner - pad,
      left: pad,
      right: size - inner - pad,
      background: bg,
    })
    .resize(size, size)
    .flatten({ background: bg })
    .png()
    .toFile(path.join(OUT, file));
}

async function run() {
  // 1. Iconos del lanzador / instalación (puro personaje con fondo blanco limpio)
  await solidCharacterIcon(512, "icon-maskable-512.png", { r: 255, g: 255, b: 255, alpha: 1 });
  await solidCharacterIcon(180, "apple-touch-icon.png", { r: 255, g: 255, b: 255, alpha: 1 });

  // 2. Iconos de Splash Screen 192 y 512 (logo completo con letras blancas y FONDO TRANSPARENTE)
  await splashTransparentIcon(192, "icon-192.png", 0.88);
  await splashTransparentIcon(512, "icon-512.png", 0.88);

  console.log("PWA icons generated: Splash = Transparent Full Logo | Launcher = Pure Character Icon (White)");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
