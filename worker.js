const CACHE_NAME = "color-clicker-v0.alfa.231125";

self.addEventListener("activate", (event) => {
    event.waitUntil(
        (async () => {
            let _keys = await caches.keys();
            let _list = _keys.map(key => (key === CACHE_NAME) ? undefined : caches.delete(key));
            return Promise.all(_list);
        })()
    );
    self.clients.claim();
});

self.addEventListener("fetch", (event) => {    
    event.respondWith(
        (async () => {
            let _cached = await caches.match(event.request);
            if (_cached) return _cached;
            let _response = await fetch(event.request);
            let _cache = await caches.open(CACHE_NAME);
            _cache.put(event.request, _response.clone());
            return _response;
        })()
    );
});
