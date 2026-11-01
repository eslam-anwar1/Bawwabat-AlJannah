// بوابة الجنة - Service Worker لتخزين الملفات والعمل بدون اتصال
const CACHE_NAME = 'bawwabat-aljannah-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/responsive.css',
  './css/animations.css',
  './js/content-data.js',
  './js/quran-data.js',
  './js/storage.js',
  './js/audio-player.js',
  './js/prayer-times.js',
  './js/qibla.js',
  './js/garden-game.js',
  './js/quiz-game.js',
  './js/memory-game.js',
  './js/kids-stories.js',
  './js/quran.js',
  './js/app.js',
  './assets/icons/app-icon.svg',
  './assets/audio/water_drop.wav',
  './assets/audio/tasbeeh_click.wav',
  './assets/audio/success_chime.wav',
  './assets/audio/prayer_bell.wav',
  './assets/audio/peace_tone.wav',
  './assets/audio/nasheed_mother.wav',
  './assets/audio/nasheed_prayer.wav',
  './assets/audio/nasheed_arkan.wav',
  './assets/audio/nasheed_badr.wav',
  './assets/audio/quran_fatihah.wav'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // للطلبات الصوتية والفيديو، اعتمد الشبكة أولاً مع بديل
  if (event.request.url.includes('audio') || event.request.url.includes('mp3') || event.request.url.includes('youtube')) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});
