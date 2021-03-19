//Asignar un nombre y versión al cache
const Cache_Name = 'v1_cache_tasko',
    urlsToCache = [
        './',
        './css/all.min.css',
        './css/bootstrap.min.css',
        './css/main.css',
        './js/bootstrap.bundle.min.js',
        './js/bootstrap.min.js',
        './js/jquery.js',
        './js/tareas2.0.js',
    ];

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e =>{

    e.waitUntil(
        caches.open(Cache_Name)
          .then(cache => {
            return cache.addAll(urlsToCache)
              .then(() => self.skipWaiting())
          })
          .catch(err => console.log('Falló registro de cache', err))
      )

    

});

//Se activa y guarda los recursos en cache para funcionar sin internet
self.addEventListener('activate', e =>{

    const cacheWhitelist = [Cache_Name];

    e.waitUntil(
        caches.keys()
          .then(cacheNames => {
            return Promise.all(
              cacheNames.map(cacheName => {
                //Eliminamos lo que ya no se necesita en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                  return caches.delete(cacheName)
                }
              })
            )
          })
          // Le indica al SW activar el cache actual
          .then(() => self.clients.claim())
      )

});

//Cuando el navegador recupera una url
self.addEventListener('fetch', e =>{

    e.respondWith(
        caches.match(e.request)
          .then(res => {
            if (res) {
              //recuperar del cache
              return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
          })
      )

})
