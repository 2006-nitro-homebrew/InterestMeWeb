const cacheName = 'cache-v1';
const resourcesToPrecache = [
  '/',
  'index.html',
  'style.css',
  'background.jpg',
  'background.png'
]

self.addEventListener('install', event => {
  console.log('SERVICE WORKER INSTALLED')
  event.waitUntil(caches.open(cacheName).then(cache => {
    return cache.addAll(resourcesToPrecache)
    })
  )
})

self.addEventListener('activate', event => {
  console.log('SERVICE WORKER ACTIVATED')
})

self.addEventListener('fetch', event => {
  console.log('FETCH INTERCEPTED FOR:', event.request.url)
  event.respondWith(caches.match(event.request).then(cachedResponse => {
    return cachedResponse || fetch(event.request)
  })
)})

