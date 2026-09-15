import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync,writeFileSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const moduleUrl = path => pathToFileURL(process.cwd()+'/'+path);
const {WORKBOOK_PAGES,WORKBOOK_TOPICS} = await import(moduleUrl('lib/workbooks.js'));
const source=readFileSync('lib/data.js','utf8').replace("'./workbooks'", JSON.stringify(moduleUrl('lib/workbooks.js').href));
const {BOOKS}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const {WORKBOOK_READING,lineWords,lineChoices}=await import(moduleUrl('lib/workbook-reading.js'));
const {WORKBOOK_GALLERY,galleryImages}=await import(moduleUrl('lib/workbook-gallery.js'));
const {ACTIVITY_ART}=await import(moduleUrl('lib/activity-art.js'));
const {WORKBOOK_TRANSLATIONS}=await import(moduleUrl('lib/workbook-translations.js'));
const used = new Map();
for(const b of BOOKS){
 assert.equal(b.pages,20);assert.equal(b.pages,WORKBOOK_PAGES.length);
 const extra=WORKBOOK_READING[b.id];assert(extra);assert.equal(extra.readings.length,2);
 for(const r of extra.readings){
  assert(r.text.split(/\s+/).length<=70, `${b.id}: long story`);
  assert.equal(r.questions.length,3);
  for(const q of r.questions){assert.equal(q.options.length,3);assert.equal(new Set(q.options).size,3);assert(q.options.includes(q.answer));}
  for(const word of r.pictures)assert(ACTIVITY_ART[word]);
 }
 assert.equal(extra.sequence.length,3);assert.equal(extra.cloze.length,3);
 const covered=[...lineWords(b),...lineWords(b,true)];assert.deepEqual(covered,b.vocab);
 for(const second of [false,true]){const words=lineWords(b,second);const choices=lineChoices(words);assert.equal(words.length,choices.length);assert.deepEqual([...words].sort((a,b)=>a.word.localeCompare(b.word)),[...choices].sort((a,b)=>a.word.localeCompare(b.word)));}
 for(const word of b.vocab){assert(WORKBOOK_TRANSLATIONS[word.word]);const path='/activity-images/'+ACTIVITY_ART[word.word].file;assert(existsSync('public'+path));used.set(path,`${b.title}: páginas 1, 13 y 14`);}
 for(const src of WORKBOOK_GALLERY[b.id]){assert(existsSync('public'+src),src);used.set(src,`${b.title}: páginas 19 y 20`);}
 assert.deepEqual([...galleryImages(b),...galleryImages(b,true)],WORKBOOK_GALLERY[b.id]);
}
used.set('/workbook-images/garden-book.png','Todos: fondo de las 20 páginas');
const rasters=readdirSync('public',{recursive:true}).filter(f=>/\.(png|jpg|webp)$/i.test(f)).map(f=>'/'+f.replaceAll('\\','/'));
const missing=rasters.filter(f=>!used.has(f));assert.deepEqual(missing,[],'Unused educational raster assets');
const report='# Imágenes utilizadas en los libros\n\n'+[...used].sort().map(([p,use])=>`- ${p} — ${use}`).join('\n')+'\n';
writeFileSync('tmp/workbook-image-usage.md',report);
console.log(`${BOOKS.length} libros, ${BOOKS.length*20} páginas, ${BOOKS.length*3} lecturas y ${BOOKS.length*6} preguntas nuevas revisados. ${used.size} imágenes incluidas; ninguna imagen raster de public sin usar.`);
