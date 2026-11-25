/* Tier One service worker: keeps a copy of the site on the device so it works offline.
   Pages and scripts are network-first (so updates show up right away) with the cache as a fallback;
   icons are cache-first. Only this site's own files are handled. */
const CACHE_PREFIX = 'tier-one-v';
const CACHE = CACHE_PREFIX + '16';
const CORE = ['./', 'index.html', 'css/style.css', 'js/data.js', 'js/content-1.js', 'js/content-2.js', 'js/content-3.js', 'js/course.js', 'js/icons.js', 'js/app.js',
  'manifest.webmanifest?v=2', 'icon.svg?v=2', 'icon-192.png?v=2', 'icon-512.png?v=2', 'icon-maskable-512.png?v=2', 'apple-touch-icon.png?v=2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (/\.(png|svg)$/.test(url.pathname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
    return;
  }
  e.respondWith(fetch(req, { cache: 'no-cache' }).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  }).catch(() => caches.match(req, { ignoreSearch: true })
    .then(hit => hit || (req.mode === 'navigate' ? caches.match('index.html') : Response.error()))));
});
