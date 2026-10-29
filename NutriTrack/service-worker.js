const CACHE_NAME = "nutritrack-v2";
const APP_FILES = [
    "./",
    "./index.html",
    "./styles.css",
    "./script.js",
    "./manifest.webmanifest",
    "./assets/icons/nutritrack-192.png",
    "./assets/icons/nutritrack-512.png",
    "./assets/icons/nutritrack.svg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_FILES)),
            self.skipWaiting()
        ])
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames
                    .filter((cacheName) =>
                        cacheName.startsWith("nutritrack-") && cacheName !== CACHE_NAME
                    )
                    .map((cacheName) => caches.delete(cacheName))
            ).then(() => self.clients.claim())
        )
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method !== "GET") {
        return;
    }

    const requestUrl = new URL(event.request.url);
    if (requestUrl.origin !== self.location.origin) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) =>
            cachedResponse || fetch(event.request).then((response) => {
                if (response.ok) {
                    const responseCopy = response.clone();
                    caches.open(CACHE_NAME).then((cache) =>
                        cache.put(event.request, responseCopy)
                    );
                }
                return response;
            })
        )
    );
});
