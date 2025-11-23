const CACHE_NAME = "bgp-shell-v25";
const APP_SHELL = [
  "/",
  "/index.html",
  "/css/globais.css",
  "/css/app.css",
  "/css/mobile/base.css",
  "/css/desktop/base.css",
  "/js/globais.js",
  "/js/utils.js",
  "/js/bloqueios.js",
  "/js/hud.js",
  "/js/inicio.js",
  "/js/missoes.js",
  "/js/estudos.js",
  "/js/inventario.js",
  "/js/loja.js",
  "/js/perfil.js",
  "/js/configuracoes.js",
  "/js/ranking.js",
  "/js/conquistas.js",
  "/js/splash.js",
  "/js/login.js",
  "/js/tutorial.js",
  "/js/avataaars.js",
  "/js/bible-api.js",
  "/js/avatar-editor.js",
  "/dados/config_global.json",
  "/dados/status_player_base.json",
  "/dados/usuarios.json",
  "/dados/missoes.json",
  "/dados/estudos.json",
  "/dados/inventario.json",
  "/dados/loja.json",
  "/dados/conquistas.json",
  "/dados/ranking.json",
  "/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request)
        .then((response) => {
          // Só cacheia se a resposta for completa (não parcial)
          if (response.status === 200 && response.type === 'basic') {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              // Verifica se não é uma resposta parcial antes de cachear
              if (response.status !== 206) {
                cache.put(event.request, copy).catch((err) => {
                  console.warn('[SW] Erro ao cachear:', event.request.url, err);
                });
              }
            });
          }
          return response;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});

