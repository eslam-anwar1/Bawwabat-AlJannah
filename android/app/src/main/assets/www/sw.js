// بوابة الجنة - Service Worker الاحترافي المحدث للعمل بدون إنترنت (Offline-First)
const CACHE_NAME = 'bawwabat-aljannah-v5-complete-offline';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './privacy.html',
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
  './js/voice-azkar.js',
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
  './assets/audio/nasheed_badr.wav',
  './assets/audio/nasheed_arkan.wav',
  './assets/audio/nasheed_prayer.wav',
  './assets/audio/nasheed_mother.wav',
  './assets/audio/nasheed_tayba.wav',
  './assets/audio/nasheed_farshi.wav',
  './assets/audio/nasheed_qamarun.wav',
  './assets/audio/nasheed_somood.wav',
  './assets/audio/nasheed_mawlay.wav',
  './assets/audio/nasheed_yanabi.wav',
  './assets/audio/nasheed_assalamu.wav',
  './assets/audio/peace_tone.wav',
  './assets/audio/prayer_bell.wav',
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

  if (!url.startsWith('http')) return;

  const isHtmlNavigation = event.request.mode === 'navigate' || 
    (event.request.headers && event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

  // لصفحات الـ HTML: استخدام Network-First لضمان ظهور التحديثات والتعديلات الفورية للمستخدم
  if (isHtmlNavigation) {
    event.respondWith(
      fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseToCache));
        }
        return networkResponse;
      }).catch(() => {
        return caches.match('./index.html') || caches.match(event.request);
      })
    );
    return;
  }

  // لباقي الأصول (صوتيات، صور، ملفات css/js): استخدام Cache-First للأداء والعمل أوفلاين
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
        if (url.includes('.mp3')) {
          return caches.match('./assets/audio/quran_fatihah.mp3');
        }
      });
    })
  );
});
