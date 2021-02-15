/**
 * Demo Service Workers Events
 */

const precacheList = [
  "/",
  "/contact",
  "/about",
  "/styles/main.css",
  "/js/app.js"
]

const currentCacheName = "service-worker-demo-v3";

self.addEventListener("install", e => {
  e.waitUntil(
    caches
      .open(currentCacheName)
      .then(cache => {
        // put (needs response), add, addall
        // new Request or string
        // cache.addAll(precacheList);
        // more info on why doing this: https://fetch.spec.whatwg.org/#concept-request-redirect-mode
        precacheList.forEach((cacheItem) => {
          return cache.add(new Request(cacheItem, { credentials: 'same-origin', redirect: 'follow' }))
        })
      })
  )
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches
      .keys()
      .then(names => {
        const cachesToGetRidOf = names.map(cacheName => {
          if(cacheName !== currentCacheName) {
            return caches.delete(cacheName);
          }
        });
        Promise.all(cachesToGetRidOf);
      })
  )
});

self.addEventListener("message", e => {
  const { data: message } = e;
  switch (message.action) {
    case "ping":
      console.log('Received a ping!');
      sendPongToAll();
      break;
  }
});

const sendPongToAll = () => {
  clients.matchAll({
    includeUncontrollerd: false,
    type: "window"
  }).then(clients => {
    clients.forEach(client => client.postMessage({ action: "pong" }));
  })
}

self.addEventListener("fetch", e => {
  const parsedUrl = new URL(e.request.url);

  // PokeAPI

  if(parsedUrl.host === "pokeapi.co") {
    const pokemon = { results: [ { name: "3PGM", url: "https://pgm.gent" } ] };
    const jsonResponse = new Response(JSON.stringify(pokemon), {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/json"
      }
    });
    e.respondWith(jsonResponse);
  }

  else
  {
    // 1. Cache First

    // e.respondWith(
    //   caches
    //     .match(e.request)
    //     .then(response => {
    //       if(response) {
    //         return response; // the URL is cached
    //       } else {
    //         return fetch(e.request);
    //       }
    //     })
    // )

    // 2. Stale While Revalidate

    e.respondWith(
      caches
        .match(e.request)
        .then(response => {
          const networkFetch = fetch(e.request)
            .then(networkResponse => {
              return caches
                .open(currentCacheName)
                .then(cache => {
                  cache.put(
                    e.request,
                    networkResponse.clone()
                  )
                  return networkResponse;
                })
            })
            return response || networkFetch;
        })
    )
  }
});