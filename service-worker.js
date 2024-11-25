const CACHE_NAME = 'fln-odisha-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/manifest.json',
    '1.png',
    '2.png',
    '3.png',
    'teacher.png',
    'fln_logo.png'
];

// Install event: cache static assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(urlsToCache))
    );
});

// Fetch event: serve cached content or fetch from network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

// Activate event: clean up old caches
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Handle download button for mobile app
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('flnodisha.apk')) {
        event.respondWith(
            fetch(event.request).then((response) => {
                if (response.ok) {
                    return response;
                }
                throw new Error('APK download failed');
            }).catch(() => {
                return new Response('App download is temporarily unavailable. Please try again later.', {
                    status: 503,
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
        );
    }
});