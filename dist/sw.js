const cacheName = "api-cache-v1";

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.open(cacheName).then(cache => {
      return cache.match(e.request).then(res => {
        if (res) {
          console.log("cache hit!", e.request.url);
          return res;
        }
        const request = e.request.clone();
        return fetch(request).then(response => {
          if (!response || response.status !== 200) {
            return response;
          }
          console.log(request.url);
          if (request.url.indexOf("https://api.github.com") === 0) {
            console.log("cached");
            cache.put(request, response.clone());
          }
          return response;
        });
      });
    })
  );
});

console.log("hello from sw");
