const CACHE_NAME = "ploopi-v10";
const OFFLINE_URL = "/offline.html";

// Páginas clave que se guardan apenas se instala el service worker, para que
// funcionen sin internet aunque el usuario aún no las haya visitado.
const PRECACHE_PAGES = ["/", "/catalogo", "/actividades", "/recursos"];
const PRECACHE_ASSETS = [OFFLINE_URL, "/icons/icon-192.png"];

// Además del HTML, se buscan y guardan los .js/.css que esa página necesita
// (Next.js les pone un hash distinto en cada build, así que no se pueden
// listar a mano de antemano).
async function precachePage(cache, url) {
  const response = await fetch(url);
  if (!response.ok) return;
  const html = await response.clone().text();
  await cache.put(url, response);

  const assetUrls = new Set();
  const attrRe = /(?:href|src)="(\/_next\/static\/[^"]+)"/g;
  let match;
  while ((match = attrRe.exec(html))) assetUrls.add(match[1]);

  await Promise.all(
    [...assetUrls].map((assetUrl) =>
      fetch(assetUrl)
        .then((res) => (res.ok ? cache.put(assetUrl, res) : null))
        .catch(() => {})
    )
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(PRECACHE_PAGES.map((url) => precachePage(cache, url).catch(() => {})));
      await Promise.all(
        PRECACHE_ASSETS.map((url) =>
          fetch(url)
            .then((res) => (res.ok ? cache.put(url, res) : null))
            .catch(() => {})
        )
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy).catch(() => {}));
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") return caches.match(OFFLINE_URL);
        return Response.error();
      })
  );
});
