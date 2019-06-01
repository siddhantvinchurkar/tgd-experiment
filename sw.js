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
    "url": "CODE_OF_CONDUCT.md",
    "revision": "c705391b8834a912453248e4d16b2c53",
    "maxAgeSeconds": 999
  },
  {
    "url": "CONTRIBUTING.md",
    "revision": "8c57c1b5376e195b201db907060554d4",
    "maxAgeSeconds": 999
  },
  {
    "url": "firebase.json",
    "revision": "658cbc648f9a12fc61a9df94db85dd3c",
    "maxAgeSeconds": 999
  },
  {
    "url": "firestore.indexes.json",
    "revision": "6c1369bcee45fa3baebaaf77f2dc3ae3",
    "maxAgeSeconds": 999
  },
  {
    "url": "firestore.rules",
    "revision": "a8a54d0e835798eab5051ee79b4119d7",
    "maxAgeSeconds": 999
  },
  {
    "url": "functions/index.js",
    "revision": "10be3e3e7e0ea62663880569677cc5c1",
    "maxAgeSeconds": 999
  },
  {
    "url": "functions/package-lock.json",
    "revision": "1a8f1186d425190f9d65d15af0321abb",
    "maxAgeSeconds": 999
  },
  {
    "url": "functions/package.json",
    "revision": "adb6e63d8fe496f8625ee2aaba85f427",
    "maxAgeSeconds": 999
  },
  {
    "url": "images/icons/favicon-32.png",
    "revision": "56c6b2d8ebb410422ec18375917b5c3b",
    "maxAgeSeconds": 999
  },
  {
    "url": "images/icons/favicon-512.png",
    "revision": "981a2953f5749faa43e687699fb2445a",
    "maxAgeSeconds": 999
  },
  {
    "url": "images/shore-aerial-sequence.jp2",
    "revision": "82420cd2a128de0187239321bd9f9eed",
    "maxAgeSeconds": 999
  },
  {
    "url": "images/shore-aerial-sequence.jpg",
    "revision": "6979d1551d3d0d4fb760b1cc15871ec7",
    "maxAgeSeconds": 999
  },
  {
    "url": "index.html",
    "revision": "b2accdc74a216e30c1377a2a7c42a95b",
    "maxAgeSeconds": 999
  },
  {
    "url": "key.json",
    "revision": "dca03123446f30f9a6f4fd95ecc9ffdc",
    "maxAgeSeconds": 999
  },
  {
    "url": "LICENSE.md",
    "revision": "36a2bfb767151986e819e88c3fa28b29",
    "maxAgeSeconds": 999
  },
  {
    "url": "main.css",
    "revision": "594a9554660ba112d8e54e71dbe7d7f2",
    "maxAgeSeconds": 999
  },
  {
    "url": "main.js",
    "revision": "83170429698ee84a9ced6a446626fb72",
    "maxAgeSeconds": 999
  },
  {
    "url": "manifest.json",
    "revision": "f739632991be312d6ce321933befa181",
    "maxAgeSeconds": 999
  },
  {
    "url": "pull_request_template.md",
    "revision": "b8ea0623f6403b004189f3ba1fe36c35",
    "maxAgeSeconds": 999
  },
  {
    "url": "README.md",
    "revision": "2362e220cb7a0c9762039c13bdb71cfa",
    "maxAgeSeconds": 999
  },
  {
    "url": "sounds/background.mp3",
    "revision": "bc8f0384d342ae915b2bdfce98465c8a",
    "maxAgeSeconds": 999
  },
  {
    "url": "storage.rules",
    "revision": "307549de80ebee91ac86a65766bd6d25",
    "maxAgeSeconds": 999
  },
  {
    "url": "videos/shore-aerial-sequence.mp4",
    "revision": "839f9fe23a7001786093ee6812fdf27c",
    "maxAgeSeconds": 999
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
