self.addEventListener('install',event => {
    event.waitUntil(
        caches.open('v1').then(cache => {
            return cache.addAll([
                '/LifeCare/', // Update this path
                '/LifeCare/index.html', // Update this path
                '/LifeCare/styles/style.css', // Update this path
                '/LifeCare/scripts/script.js', // Update this path
                '/LifeCare/favicon/favicon-32x32.png', // Update this path
                '/LifeCare/favicon/favicon-16x16.png', // Update this path

            ])
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);

        })
    );
});