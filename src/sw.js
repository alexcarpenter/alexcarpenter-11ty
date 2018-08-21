/*
This is a modified version of Ethan Marcotte's service worker (https://ethanmarcotte.com/theworkerofservices.js),
which is in turn a modified version of Jeremy Keith's service worker (https://adactio.com/serviceworker.js),
with a few additional edits borrowed from Filament Group's. (https://www.filamentgroup.com/sw.js)
*/

(function() {
  const version = 'v1';
  const cacheName = version + ':alexcarpenter:';

  const STATIC = cacheName + 'static';
  const PAGES = cacheName + 'pages';

  const staticAssets = [
    '/',
    '/posts/',
    '/newsletter/',
    '/contact/',
    '/offline/'
  ];

  function updateStatic() {
    return caches.open(STATIC).then(cache => {
      return cache.addAll(
        staticAssets.map(url => new Request(url, { credentials: 'include' }))
      );
    });
  }

  function clearCaches() {
    return caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key.indexOf(version) !== 0)
          .map(key => caches.delete(key))
      );
    });
  }

  self.addEventListener('install', event => {
    event.waitUntil(updateStatic().then(() => self.skipWaiting()));
  });

  self.addEventListener('activate', event => {
    event.waitUntil(clearCaches().then(() => self.clients.claim()));
  });

  self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    if (request.method !== 'GET') return;

    if (request.headers.get('Accept').includes('text/html')) {
      event.respondWith(
        fetch(request)
          .then(response => {
            let copy = response.clone();
            caches
              .open(staticAssets.includes(url.pathname) ? STATIC : PAGES)
              .then(cache => cache.put(request, copy));
            return response;
          })
          .catch(() => {
            return caches
              .match(request)
              .then(response => response || caches.match('/offline/'));
          })
      );
      return;
    }
  });
})();
