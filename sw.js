/* Service worker du Lexique Shona
 * - Met en cache l'application et le lexique à l'installation → fonctionne hors ligne.
 * - Stratégie « cache d'abord » pour les fichiers de l'appli ; les polices Google
 *   sont mises en cache au premier passage (sinon, polices système).
 * - Pour publier une mise à jour : modifier les fichiers, puis INCRÉMENTER VERSION.
 *   Les téléphones verront « Nouvelle version disponible » au lancement suivant.
 */
const VERSION = "lexique-v1.0.0";
const APP_FILES = [
  "./",
  "./index.html",
  "./lexique.json",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];
const FONT_CACHE = "lexique-fonts";

self.addEventListener("install", event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(APP_FILES)));
  // Pas de skipWaiting automatique : la page propose « Recharger » (voir index.html)
});

self.addEventListener("activate", event => {
  // Supprime les anciennes versions du cache (garde celui des polices)
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== VERSION && k !== FONT_CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

// La page envoie « skipWaiting » quand l'utilisateur accepte la mise à jour
self.addEventListener("message", event => {
  if (event.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Polices Google : cache puis réseau, mises de côté au premier chargement
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(FONT_CACHE).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok || res.type === "opaque") cache.put(req, res.clone());
          return res;
        } catch (e) {
          return new Response("", { status: 504 });
        }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Navigation (ouverture de l'appli) : toujours servir index.html depuis le cache
  if (req.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html").then(hit => hit || fetch(req))
    );
    return;
  }

  // Autres fichiers de l'appli : cache d'abord, réseau en secours
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req))
  );
});
