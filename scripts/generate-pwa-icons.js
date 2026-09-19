const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const ICON_SRC = path.join(ROOT, "public/favicon.svg");
const OUT = path.join(ROOT, "public/icons");

async function generateTransparentIcon(size, file, scale = 0.9) {
  const inner = Math.round(size * scale);
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

async function run() {
  await generateTransparentIcon(192, "icon-192.png", 0.9);
  await generateTransparentIcon(512, "icon-512.png", 0.9);
  await generateTransparentIcon(512, "icon-maskable-512.png", 0.8);
  await generateTransparentIcon(180, "apple-touch-icon.png", 0.9);
  console.log("All PWA icons generated with transparent background and pure character icon");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
