// Uso: node scripts/prepare-activity-art.mjs <manifiesto local de generación>
// Solo prepara tamaño y compresión; las ilustraciones se crean con image_gen.
import { readFile, writeFile } from "node:fs/promises";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { ACTIVITY_ART } from "../lib/activity-art.js";

const project = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(project, "public/activity-images");
const records = JSON.parse(await readFile(process.argv[2], "utf8"));
const inputs = [{ word: "Lion", source: resolve(output, "lion.png") }, ...records];
for (const { word, source } of inputs) {
  if (!ACTIVITY_ART[word] || !source) throw new Error(`Origen incompleto: ${word}`);
  const target = resolve(output, ACTIVITY_ART[word].file);
  if (!target.startsWith(output + sep)) throw new Error("Destino fuera del banco de imágenes");
  await sharp(source).resize(512, 512, { fit: "contain" }).webp({ quality: 86, effort: 5 }).toFile(target);
}
const readyWords = inputs.map(({ word }) => word);
await writeFile(resolve(project, "lib/activity-art-ready.json"), JSON.stringify(readyWords, null, 2) + "\n");
const prompts = records.map(({ word, prompt }) => `## ${word}\n\n${prompt}\n`).join("\n");
await writeFile(resolve(output, "PROMPTS.md"), `# Colección de ilustraciones de Actividades\n\n86 imágenes nuevas generadas con la herramienta integrada image_gen. Referencia de estilo: lion.png, aprobado por el usuario. Versiones para la web: 512 × 512 px, WebP. El león original se conserva.\n\n${prompts}`);

const cards = Object.entries(ACTIVITY_ART).filter(([word]) => readyWords.includes(word)).map(([word, art]) => `<figure><img src="${art.file}" alt="${art.alt}" width="130" height="130"><figcaption>${word}</figcaption></figure>`).join("\n");
await writeFile(resolve(output, "gallery.html"), `<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>EnglishKids · Ilustraciones de actividades</title><style>body{margin:0;padding:24px;background:#f4f9ff;color:#243875;font-family:system-ui,sans-serif}h1{font-size:24px;margin:0 0 6px}p{margin:0 0 24px;color:#617698}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(125px,1fr));gap:14px}figure{margin:0;padding:8px;background:white;border-radius:18px;text-align:center}img{display:block;width:100%;height:auto;aspect-ratio:1;object-fit:contain;border-radius:12px;background:#fff3cf}figcaption{font-weight:700;font-size:13px;margin-top:8px}a{color:inherit}</style><h1>Ilustraciones de actividades</h1><p>87 palabras con el mismo estilo visual. <a href="/actividades">Volver a las actividades</a></p><main>${cards}</main></html>`);
console.log(`Preparadas ${inputs.length} ilustraciones y galería de revisión.`);
