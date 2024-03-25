self.addEventListener("install", e => {
    console.log('service worker is installing');

    e.waitUntil(
        caches
            .open('static')
            .then(cache =>{
                return cache.addAll([
                    './', './src', './img'
                ])
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate',event=>{
        event.waitUntil(caches.delete('PWD_app'));
        console.log('service worker is activating'); 
    })

self.addEventListener("fetch", e => {
    //console.log(e);   
    console.log(`Intercepting fetch request for: ${e.request.url}`);
    e.respondWith(

        caches.match(e.request).then(async (response) => {
            if (response) {
                return response
            }

            let data = fetch(e.request);
            let data_clone = (await data).clone();
            e.waitUntil(caches.open('static').then(cache => cache.put(e.request, data_clone)));
            return data

        })
    )
});