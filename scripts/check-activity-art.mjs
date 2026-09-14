import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { getAllVocab } from "../lib/data.js";
import { ACTIVITY_ART } from "../lib/activity-art.js";

const words = [...new Set(getAllVocab().map(({ word }) => word))];
const readyWords = JSON.parse(await readFile(new URL("../lib/activity-art-ready.json", import.meta.url), "utf8"));
assert.deepEqual([...readyWords].sort(), [...words].sort(), "Todas las palabras deben estar habilitadas al terminar la colección");
assert.equal(Object.keys(ACTIVITY_ART).length, words.length, "El banco debe cubrir todo el vocabulario");
const hashes = new Set();
let bytes = 0;
for (const word of words) {
  const art = ACTIVITY_ART[word];
  assert.ok(art?.file && art?.alt, `Falta imagen o descripción: ${word}`);
  const file = fileURLToPath(new URL(`../public/activity-images/${art.file}`, import.meta.url));
  const buffer = await readFile(file);
  const metadata = await sharp(buffer).metadata();
  assert.equal(metadata.format, "webp", `${word}: formato optimizado`);
  assert.equal(metadata.width, 512, `${word}: ancho`);
  assert.equal(metadata.height, 512, `${word}: alto`);
  const hash = createHash("sha256").update(buffer).digest("hex");
  assert.ok(!hashes.has(hash), `${word}: imagen duplicada`);
  hashes.add(hash);
  bytes += buffer.length;
}
console.log(`${words.length} palabras verificadas: imágenes únicas, completas y de 512 × 512 px. Total: ${(bytes / 1024 / 1024).toFixed(2)} MB.`);
