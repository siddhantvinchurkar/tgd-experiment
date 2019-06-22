/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "animations/crocket.json",
    "revision": "cfef8b82dc8cc76565054ad2ce04ff64"
  },
  {
    "url": "animations/load.json",
    "revision": "da979ba26e8e795542a0a4b5d3d31059"
  },
  {
    "url": "CODE_OF_CONDUCT.md",
    "revision": "c705391b8834a912453248e4d16b2c53"
  },
  {
    "url": "CONTRIBUTING.md",
    "revision": "8c57c1b5376e195b201db907060554d4"
  },
  {
    "url": "firebase.json",
    "revision": "658cbc648f9a12fc61a9df94db85dd3c"
  },
  {
    "url": "firestore.indexes.json",
    "revision": "6c1369bcee45fa3baebaaf77f2dc3ae3"
  },
  {
    "url": "firestore.rules",
    "revision": "a8a54d0e835798eab5051ee79b4119d7"
  },
  {
    "url": "fonts/material_icons.woff2",
    "revision": "570eb83859dc23dd0eec423a49e147fe"
  },
  {
    "url": "fonts/roboto.woff2",
    "revision": "479970ffb74f2117317f9d24d9e317fe"
  },
  {
    "url": "functions/index.js",
    "revision": "10be3e3e7e0ea62663880569677cc5c1"
  },
  {
    "url": "functions/package-lock.json",
    "revision": "1a8f1186d425190f9d65d15af0321abb"
  },
  {
    "url": "functions/package.json",
    "revision": "adb6e63d8fe496f8625ee2aaba85f427"
  },
  {
    "url": "images/icons/favicon-32.png",
    "revision": "56c6b2d8ebb410422ec18375917b5c3b"
  },
  {
    "url": "images/icons/favicon-512.png",
    "revision": "981a2953f5749faa43e687699fb2445a"
  },
  {
    "url": "images/shore-aerial-sequence.jp2",
    "revision": "82420cd2a128de0187239321bd9f9eed"
  },
  {
    "url": "images/shore-aerial-sequence.jpg",
    "revision": "6979d1551d3d0d4fb760b1cc15871ec7"
  },
  {
    "url": "index.html",
    "revision": "b6e09377bbe1fadf6548c9e6c3cf94f0"
  },
  {
    "url": "tgd-experiment.json",
    "revision": "dca03123446f30f9a6f4fd95ecc9ffdc"
  },
  {
    "url": "LICENSE.md",
    "revision": "36a2bfb767151986e819e88c3fa28b29"
  },
  {
    "url": "lottie.min.js",
    "revision": "f11e3439956e454d2e2764fbc5021e54"
  },
  {
    "url": "main.css",
    "revision": "fbe3886007038ed04d761d35494b16ff"
  },
  {
    "url": "main.js",
    "revision": "22c3f7f54cb7d46cc5c549f998967da7"
  },
  {
    "url": "manifest.json",
    "revision": "f739632991be312d6ce321933befa181"
  },
  {
    "url": "pull_request_template.md",
    "revision": "b8ea0623f6403b004189f3ba1fe36c35"
  },
  {
    "url": "README.md",
    "revision": "2362e220cb7a0c9762039c13bdb71cfa"
  },
  {
    "url": "storage.rules",
    "revision": "307549de80ebee91ac86a65766bd6d25"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.googleAnalytics.initialize({});

workbox.precaching.cleanupOutdatedCaches();

workbox.routing.registerRoute(
  new RegExp("https://tgde.hyperr.space/(.*)"),
  new workbox.strategies.CacheFirst({
    cacheName: 'global-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 256,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        })
    ]
  })
);
