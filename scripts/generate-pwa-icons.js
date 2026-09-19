const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICON_SRC = path.join(ROOT, "public/favicon.svg");
const SPLASH_SRC = path.join(ROOT, "public/logo_splash.svg");
const OUT = path.join(ROOT, "public/icons");

async function standardIcon(size, file) {
  const inner = Math.round(size * 0.9);
  const pad = Math.round((size - inner) / 2);
  await sharp(ICON_SRC, { density: 600 })
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

async function solidCharacterIcon(size, file, bg) {
  const inner = Math.round(size * 0.72);
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

async function splashLogoIcon(size, file, scale = 0.84) {
  const innerW = Math.round(size * scale);
  const innerH = Math.round(innerW / 1.5602);
  const padX = Math.round((size - innerW) / 2);
  const padY = Math.round((size - innerH) / 2);

  await sharp(SPLASH_SRC, { limitInputPixels: false })
    .resize(innerW, innerH, { fit: "contain", background: { r: 255, g: 216, b: 61, alpha: 1 } })
    .extend({
      top: padY,
      bottom: size - innerH - padY,
      left: padX,
      right: size - innerW - padX,
      background: { r: 255, g: 216, b: 61, alpha: 1 },
    })
    .resize(size, size)
    .flatten({ background: { r: 255, g: 216, b: 61, alpha: 1 } })
    .png()
    .toFile(path.join(OUT, file));
}

async function run() {
  // 1. Iconos del lanzador / instalación (puro personaje)
  await standardIcon(192, "icon-192.png");
  await solidCharacterIcon(512, "icon-maskable-512.png", { r: 255, g: 255, b: 255, alpha: 1 });
  await solidCharacterIcon(180, "apple-touch-icon.png", { r: 255, g: 255, b: 255, alpha: 1 });

  // 2. Icono de Splash Screen (logo completo personaje + ploopi en blanco)
  await splashLogoIcon(512, "icon-512.png", 0.84);

  console.log("PWA icons generated: Splash = Full Logo | Launcher = Pure Character Icon");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
