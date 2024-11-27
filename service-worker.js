const cacheName = 'fln-cache-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/fln_logo.png',
  // Add other assets (icons, images)
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(assetsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});