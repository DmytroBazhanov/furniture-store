export const cacheInfo = (request, response) => {
    caches.open("v1").then((cache) => {
        cache.put(request, response);
    });
};
