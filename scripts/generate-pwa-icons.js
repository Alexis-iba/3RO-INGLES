const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICON_DESKTOP = path.join(ROOT, "public/favicon.svg");
const ICON_MOBILE = path.join(ROOT, "public/icono_ploopi.png");
const OUT = path.join(ROOT, "public/icons");

const ORANGE_BG = { r: 251, g: 86, b: 1, alpha: 1 };

// 1. Icono normal con fondo transparente para Computadora (Windows / Mac / Barra de tareas / Escritorio)
async function generateDesktopIcon(size, file, scale = 0.9) {
  const inner = Math.round(size * scale);
  const pad = Math.round((size - inner) / 2);
  await sharp(ICON_DESKTOP, { density: 600 })
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: pad,
      bottom: size - inner - pad,
      left: pad,
      right: size - inner - pad,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .resize(size, size)
    .png()
    .toFile(path.join(OUT, file));
}

// 2. Icono naranja que llena todo el contenedor para Celular (Android Maskable e iOS)
async function generateMobileFullBleedIcon(size, file) {
  const scaledSize = Math.round(size * 1.16);
  const cropOffset = Math.round((scaledSize - size) / 2);

  await sharp(ICON_MOBILE)
    .resize(scaledSize, scaledSize, { fit: "cover" })
    .extract({ left: cropOffset, top: cropOffset, width: size, height: size })
    .flatten({ background: ORANGE_BG })
    .png()
    .toFile(path.join(OUT, file));
}

async function run() {
  // PC / Computadora (Icono normal con fondo transparente)
  await generateDesktopIcon(192, "icon-192.png", 0.9);
  await generateDesktopIcon(512, "icon-512.png", 0.9);

  // Celular (Icono naranja completo que llena todo el contenedor)
  await generateMobileFullBleedIcon(512, "icon-maskable-512.png");
  await generateMobileFullBleedIcon(180, "apple-touch-icon.png");

  console.log("PWA icons generated: Desktop (192, 512) = Normal Transparent | Mobile (Maskable, Apple) = Orange Full-Bleed");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
