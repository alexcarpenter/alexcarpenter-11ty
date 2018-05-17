// Refs: https://github.com/csswizardry/csswizardry.github.com/blob/master/sw.js
var cacheName = 'alexcarpenter:0003';
var cacheFiles = [
  '/',
  '/offline/'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
      .then(function(cache) {
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Grab the asset from SW cache.
        if (response) {
          return response;
        }
        return fetch(event.request);
    }).catch(function() {
      // Can't access the network return an offline page from the cache
      return caches.match('/offline/');
    })
  );
});

// Empty out any caches that don’t match the ones listed.
self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['alexcarpenter:0003'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
