self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      if (res) return res;
      const request = e.request.clone();
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        if (!request.url.indexOf("https://api.github.com") === 0) {
          caches.open("api-cache-v1").then(cache => {
            cache.put(request, response.clone());
          });
        }
        return response;
      });
    })
  );
});

console.log("hello from sw");
