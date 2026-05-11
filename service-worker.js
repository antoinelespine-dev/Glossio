const CACHE_NAME = 'glossio-v1';
const urlsToCache = [
  '/Glossio/',
  '/Glossio/index.html',
  '/Glossio/manifest.json',
  '/Glossio/src/main.jsx',
  '/Glossio/src/App.jsx',
  '/Glossio/src/styles.css',
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});