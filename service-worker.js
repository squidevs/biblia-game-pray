const CACHE_NAME = 'biblia-gamepray-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/globais.css',
  '/css/mobile/base.css',
  '/css/mobile/components.css',
  '/js/globais.js',
  '/js/data-manager.js',
  '/js/auth.js',
  '/js/components.js',
  '/js/screens.js',
  '/js/integrations.js',
  '/assets/logotipos/logo/logo.svg',
  '/dados/config_global.json',
  '/dados/usuarios.json',
  '/dados/status_player_base.json',
  '/dados/missoes.json',
  '/dados/acoes.json',
  '/dados/itens.json',
  '/dados/conquistas.json',
  '/dados/estudos.json',
  '/dados/loja.json'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estratégia: Cache First para assets estáticos, Network First para APIs
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Navigation requests: try network first, fallback to offline page cached
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return response;
        })
        .catch(() => {
          return caches.match('/offline.html');
        })
    );
    return;
  }

  // Same-origin assets listed in urlsToCache: Cache First
  if (url.origin === self.location.origin && urlsToCache.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((res) => {
        // populate cache for future
        const resClone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, resClone));
        return res;
      }))
    );
    return;
  }

  // Cross-origin or dynamic requests: Network First with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(request))
  );
});

// Push notifications
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Bíblia GamePray';
  const options = {
    body: data.body || 'Você tem uma nova notificação',
    icon: 'assets/logotipos/notext-perfil-logo/favicon-96x96.png',
    badge: 'assets/logotipos/notext-perfil-logo/favicon-96x96.png',
    data: data.url || '/'
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data || '/')
  );
});

// Background Sync: solicitar que os clientes processem a fila quando o navegador disparar um sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'syncQueue') {
    event.waitUntil(
      self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clientList => {
        for (const client of clientList) {
          client.postMessage({ type: 'process-queue' });
        }
      })
    );
  }
});

