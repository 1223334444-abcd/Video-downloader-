const CACHE_NAME = 'video-dl-v1';
const STATIC_CACHE = 'video-dl-static-v1';
const DYNAMIC_CACHE = 'video-dl-dynamic-v1';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js'
];

// Install event - cache static assets
self.addEventListener('install', e => {
  e.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(urlsToCache)),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', e => {
  const { request } = e;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external APIs and video streams
  if (url.hostname !== location.hostname && request.url.includes('/api/')) {
    e.respondWith(fetch(request));
    return;
  }

  // Static assets - Cache first, then network
  if (request.destination === 'style' || 
      request.destination === 'script' || 
      request.destination === 'font') {
    e.respondWith(
      caches.match(request).then(res => {
        return res || fetch(request).then(response => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        });
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // HTML pages - Network first, then cache
  if (request.destination === 'document') {
    e.respondWith(
      fetch(request)
        .then(response => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // API calls - Network first, then cache
  if (url.pathname.includes('/api/')) {
    e.respondWith(
      fetch(request)
        .then(response => {
          if (response.status === 200) {
            return caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, response.clone());
              return response;
            });
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Default - Cache first, then network
  e.respondWith(
    caches.match(request).then(res => {
      return res || fetch(request).then(response => {
        if (response.status === 200 && request.destination !== 'video') {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, response.clone());
            return response;
          });
        }
        return response;
      });
    }).catch(() => {
      if (request.destination === 'image') {
        return caches.match('/index.html');
      }
    })
  );
});