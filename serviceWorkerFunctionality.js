const cacheName = "v1";

const keyResources = ["/", "/index.html"];

self.addEventListener("install", (ev) => {
    ev.waitUntil(
        caches.delete(cacheName).then(() => {
            caches.open(cacheName).then((caches) => {
                return caches.addAll(keyResources);
            });
        })
    );
});

self.addEventListener("activate", (ev) => {
    ev.waitUntil(
        caches.keys().then((cacheKeys) => {
            cacheKeys.forEach((cacheKey) => {
                if (cacheKey !== cacheName) caches.delete(cacheKey);
            });
        })
    );
});

self.addEventListener("fetch", (ev) => {
    if (ev.request.mode === "navigate") {
        return ev.respondWith(
            caches.match("/index.html").then((cacheResponse) => cacheResponse || fetch(ev.request))
        );
    }

    return ev.respondWith(
        caches.match(ev.request).then((cacheResponse) => {
            if (
                ev.request.url.includes("https://firebasestorage.googleapis.com") ||
                ev.request.url.includes("apis.google.com") ||
                ev.request.url.includes("graph.facebook.com")
            ) {
                return fetch(ev.request).then((response) => response);
            }

            return fetch(ev.request)
                .then((fetchResponse) => {
                    if (!fetchResponse) return fetchResponse;

                    const type = fetchResponse.headers.get("content-type");

                    if (
                        type.match(/^text\/css/i) ||
                        type.match(/^font\//i) ||
                        type.match(/^image\/svg/i) ||
                        type.match(/^application\/javascript/i)
                    ) {
                        return caches.open(cacheName).then((cache) => {
                            return cache
                                .put(ev.request, fetchResponse.clone())
                                .then(() => fetchResponse);
                        });
                    }

                    return fetchResponse;
                })
                .catch((error) => {
                    return cacheResponse;
                });
        })
    );
});
