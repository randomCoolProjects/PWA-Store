const staticResources = [

    './index.html',

    './raw-html/index/main.html',
    './raw-html/index/main.css',
    './raw-html/index/main.js',

    './elements/appCategory/main.html',
    './elements/appCategory/main.css',
    './elements/appCategory/main.js',

    './elements/appMiniature/main.html',
    './elements/appMiniature/main.css',
    './elements/appMiniature/main.js',

    './global/css/bootstrap.css',
    './global/css/main.css',

    './global/src/bootstrap.js',
    './global/src/jquery.js',
    './global/src/main.js',
    './global/src/popper.js',
    './global/src/swal.js',

    './loader.js',

    './img/icon/fav.png',
    './img/icon/i512.png',
    './img/icon/i192.png',

    './img/arrow.png',
    './img/checked.png',
    './img/quest.png',

    './rules.json',

    //'./appLoad.html',
    './manifest.json',
];

const CACHE_NAME = 'pwa-st-cache';

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(staticResources);
        })
    )
});

self.addEventListener('activate', function activator(event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(keys
                .filter(function (key) {
                    return key.indexOf(CACHE_NAME) !== 0;
                })
                .map(function (key) {
                    return caches.delete(key);
                })
            );
        })
    );
});

function tryFetch(req) {
    try {
        return fetch(req)
            .then(value => {
                return value;
            })
            .catch(why => {
                if (req.url.includes('.html') && !req.url.includes('?offline=true')) {
                    return Response.redirect(req.url + '?offline=true');
                }
                return Response.error();
            });
    }
    catch{
        return Response.error();
    }
}

self.addEventListener('fetch', function (event) {
    var req = event.request;
    event.respondWith(
        caches.match(req).then(function (cachedResponse) {
            return cachedResponse || tryFetch(req);
        })
    );
});
