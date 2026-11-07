// بوابة الجنة - Service Worker الاحترافي للعمل بدون إنترنت (Offline-First)
const CACHE_NAME = 'bawwabat-aljannah-v3-offline';
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
  './js/ayah-puzzle.js',
  './js/prophets-quest.js',
  './js/daily-feed.js',
  './js/kids-stories.js',
  './js/quran.js',
  './js/app.js',
  './assets/icons/app-icon.svg',
  './assets/icons/app-icon-circular.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/audio/adhan_makkah.mp3',
  './assets/audio/husary_muallim.mp3',
  './assets/audio/quran_fatihah.mp3',
  './assets/audio/quran_naba.mp3',
  './assets/audio/quran_duha.mp3',
  './assets/audio/quran_sharh.mp3',
  './assets/audio/quran_qadr.mp3',
  './assets/audio/quran_kawthar.mp3',
  './assets/audio/quran_nasr.mp3',
  './assets/audio/quran_ikhlas.mp3',
  './assets/audio/quran_falaq.mp3',
  './assets/audio/quran_nas.mp3',
  './assets/audio/water_drop.wav',
  './assets/audio/tasbeeh_click.wav',
  './assets/audio/success_chime.wav'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => {
      console.warn('Service Worker cache.addAll notice:', err);
    })
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
  const url = event.request.url;

  // تجاهل طلبات التتبع والامتدادات
  if (!url.startsWith('http')) return;

  // للأصول المحلية: إستراتيجية Cache-First لضمان العمل أوفلاين بسرعة فائقة
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
        // بدائل في حال انقطاع الشبكة
        if (event.request.headers && event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
          return caches.match('./index.html');
        }
        if (url.includes('.mp3')) {
          return caches.match('./assets/audio/quran_fatihah.mp3');
        }
      });
    })
  );
});
