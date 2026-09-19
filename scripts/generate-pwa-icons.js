const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const ROOT = path.join(__dirname, "..");
const ICON_DESKTOP = path.join(ROOT, "public/favicon.svg");
const ICON_MOBILE_MASTER = path.join(ROOT, "app/icono_ploopi.png");
const OUT = path.join(ROOT, "public/icons");
const PUBLIC_ICON = path.join(ROOT, "public/icono_ploopi.png");

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

// 2. Icono celular que llena el 100% del contenedor (Android Maskable e iOS)
async function generateMobileFullBleedIcon(size, destinationPath) {
  await sharp(ICON_MOBILE_MASTER, { limitInputPixels: false })
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(destinationPath);
}

async function run() {
  if (!fs.existsSync(OUT)) {
    fs.mkdirSync(OUT, { recursive: true });
  }

  // PC / Computadora (Icono normal con fondo transparente)
  await generateDesktopIcon(192, "icon-192.png", 0.9);
  await generateDesktopIcon(512, "icon-512.png", 0.9);

  // Celular (Icono que llena todo el espacio sin bordes blancos)
  await generateMobileFullBleedIcon(512, path.join(OUT, "icon-maskable-512.png"));
  await generateMobileFullBleedIcon(180, path.join(OUT, "apple-touch-icon.png"));
  
  // Guardar versión optimizada en public/icono_ploopi.png
  await generateMobileFullBleedIcon(512, PUBLIC_ICON);

  console.log("✅ PWA icons successfully generated from final icono_ploopi.png!");
}

run().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});

