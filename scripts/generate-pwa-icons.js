const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public/favicon.svg");
const OUT = path.join(ROOT, "public/icons");

async function standardIcon(size, file) {
  const inner = Math.round(size * 0.88);
  const pad = Math.round((size - inner) / 2);
  await sharp(SRC, { density: 600 })
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

async function solidIcon(size, file, bg) {
  const inner = Math.round(size * 0.72);
  const pad = Math.round((size - inner) / 2);
  await sharp(SRC, { density: 600 })
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
  await standardIcon(192, "icon-192.png");
  await standardIcon(512, "icon-512.png");
  await solidIcon(512, "icon-maskable-512.png", { r: 255, g: 216, b: 61, alpha: 1 });
  await solidIcon(180, "apple-touch-icon.png", { r: 255, g: 216, b: 61, alpha: 1 });
  console.log("PWA icons generated successfully in public/icons");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
