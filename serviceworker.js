console.log("I am a service worker ready to serve anything from the cache")
const url = ["/", "app.js", "styles.css", "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"]

// Whenever this service worker is installed, store the things in the url array in the cache
// This is known as prefetching the assets
globalThis.addEventListener("install", event => {
    caches.open("pwa").then(cache => {
        cache.addAll(url)
    })
})

globalThis.addEventListener("fetch", event => {
    event.respondWith(
        // the match method accepts string, url or a request object
        caches.match(event.request) // Searching in the cache
            .then(response => {
                if(response) {
                    // If the request is found in the cache
                    // If it is a cache hit it gives the response to respondWith
                    return response // Cache hit
                } else {
                    // We need to go to the network
                    return fetch(event.request); // Cache miss
                }
            })
    )
})
// NOTE: Cache storage is key based storage with the key being the HTTP request
// globalThis.addEventListener('fetch', (event) => {
//     console.log("HTTP requested", event.request.url)

//     event.respondWith(new Response("Hey! hehehe"))
// })