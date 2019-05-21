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
    "url": "index.html",
    "revision": "30b2ac72769fc74b0d46ee0624c4587a"
  },
  {
    "url": "LICENSE.md",
    "revision": "36a2bfb767151986e819e88c3fa28b29"
  },
  {
    "url": "main.css",
    "revision": "d41d8cd98f00b204e9800998ecf8427e"
  },
  {
    "url": "main.js",
    "revision": "069f1f3d38e49d4de62ffed59f95a2e1"
  },
  {
    "url": "manifest.json",
    "revision": "f1b373a06be74a75f6815a4cf1278a9f"
  },
  {
    "url": "README.md",
    "revision": "2362e220cb7a0c9762039c13bdb71cfa"
  },
  {
    "url": "storage.rules",
    "revision": "166a8a900000c71f8e5a5cb4247fa6d4"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
