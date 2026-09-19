const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICON_MOBILE = path.join(ROOT, "public/icono_ploopi.png");
const OUT = path.join(ROOT, "public/icons");

async function generateAppIcons() {
  // 1. Iconos estándar 192 y 512 (PNG de alta resolución con el nuevo icono squircle)
  await sharp(ICON_MOBILE)
    .resize(192, 192, { fit: "contain" })
    .png()
    .toFile(path.join(OUT, "icon-192.png"));

  await sharp(ICON_MOBILE)
    .resize(512, 512, { fit: "contain" })
    .png()
    .toFile(path.join(OUT, "icon-512.png"));

  // 2. Icono Maskable 512 para Android (centrado en área segura)
  const maskInner = Math.round(512 * 0.84);
  const maskPad = Math.round((512 - maskInner) / 2);
  await sharp(ICON_MOBILE)
    .resize(maskInner, maskInner, { fit: "contain" })
    .extend({
      top: maskPad,
      bottom: 512 - maskInner - maskPad,
      left: maskPad,
      right: 512 - maskInner - maskPad,
      background: { r: 254, g: 102, b: 19, alpha: 1 }, // Fondo naranja de marca continuo
    })
    .resize(512, 512)
    .png()
    .toFile(path.join(OUT, "icon-maskable-512.png"));

  // 3. Apple Touch Icon para iPhone / iPad (180x180)
  await sharp(ICON_MOBILE)
    .resize(180, 180, { fit: "contain" })
    .png()
    .toFile(path.join(OUT, "apple-touch-icon.png"));

  console.log("All PWA & Mobile icons generated successfully with icono_ploopi.png!");
}

generateAppIcons().catch((err) => {
  console.error(err);
  process.exit(1);
});
