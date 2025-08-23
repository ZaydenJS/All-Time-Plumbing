// Service Worker for All Time Plumbing
// Optimized for instant loading and offline performance

const CACHE_NAME = 'all-time-plumbing-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/ChatGPT Image Aug 10, 2025, 04_02_41 PM.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Images to cache on demand
const IMAGE_CACHE_PATTERNS = [
  /https:\/\/images\.unsplash\.com/,
  /\.webp$/,
  /\.jpg$/,
  /\.png$/,
  /\.gif$/
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch(err => {
        console.error('Service Worker: Cache failed', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        // Return cached version if available
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }
        
        // Network request with caching strategy
        return fetch(request)
          .then(networkResponse => {
            // Don't cache if not successful
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Determine cache strategy based on resource type
            const shouldCache = shouldCacheResource(request.url);
            
            if (shouldCache) {
              const responseClone = networkResponse.clone();
              const cacheToUse = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;
              
              caches.open(cacheToUse)
                .then(cache => {
                  console.log('Service Worker: Caching new resource', request.url);
                  cache.put(request, responseClone);
                })
                .catch(err => {
                  console.error('Service Worker: Cache put failed', err);
                });
            }
            
            return networkResponse;
          })
          .catch(err => {
            console.error('Service Worker: Fetch failed', err);
            
            // Return offline fallback for HTML pages
            if (request.headers.get('accept').includes('text/html')) {
              return caches.match('/index.html');
            }
            
            throw err;
          });
      })
  );
});

// Helper functions
function shouldCacheResource(url) {
  // Cache images, fonts, CSS, JS
  return /\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot)$/i.test(url) ||
         IMAGE_CACHE_PATTERNS.some(pattern => pattern.test(url)) ||
         url.includes('fonts.googleapis.com') ||
         url.includes('cdnjs.cloudflare.com');
}

function isStaticAsset(url) {
  return STATIC_ASSETS.some(asset => url.includes(asset)) ||
         /\.(css|js)$/i.test(url);
}

// Background sync for form submissions (if supported)
if ('sync' in self.registration) {
  self.addEventListener('sync', event => {
    if (event.tag === 'contact-form') {
      event.waitUntil(
        // Handle offline form submissions
        handleOfflineFormSubmission()
      );
    }
  });
}

function handleOfflineFormSubmission() {
  // Implementation for handling offline form submissions
  return Promise.resolve();
}
