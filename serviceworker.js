console.log("I am a service worker ready to serve")

globalThis.addEventListener('fetch', (event) => {
    console.log("HTTP requested", event.request.url)

    event.respondWith(new Response("Hey! hehehe"))
})