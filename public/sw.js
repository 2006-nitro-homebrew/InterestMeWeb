const cacheName = 'cache-v1'
const resourcesToPrecache = [
  '/',
  'index.html',
  'style.css',
  'background1.jpg',
  'news2.jpg',
]

self.addEventListener('install', (event) => {
  console.log('SERVICE WORKER INSTALLED')
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToPrecache)
    })
  )
})

self.addEventListener('activate', (event) => {
  console.log('SERVICE WORKER ACTIVATED')
})

self.addEventListener('fetch', (event) => {
  //Checking to see if the fetch request is to firestore. Since it is already being saved to IndexedDB, we don't need to cache data from firestore.
  if (event.request.url.indexOf('firestore.googleapis.com' === -1)) {
    console.log('FETCH INTERCEPTED FOR:', event.request.url)
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request)
      })
    )
  }
})
