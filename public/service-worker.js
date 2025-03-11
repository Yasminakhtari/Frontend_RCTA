// /// <reference lib="webworker" />
// /* eslint-disable no-restricted-globals, @typescript-eslint/ban-ts-comment */

// // declare function importScripts(...urls: string[]): void;

// // @ts-ignore

// self.importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");




// if (self.workbox) {
//     console.log("Workbox loaded 🎉");
//     self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
// } else {
//     console.log("Workbox failed to load 😢");
// }

// // ✅ Service Worker Installation
// self.addEventListener("install", (event) => {
//     console.log("Service Worker Installed");
//     self.skipWaiting();
// });

// // ✅ Service Worker Activation
// self.addEventListener("activate", (event) => {
//     console.log("Service Worker Activated");
//     event.waitUntil(self.clients.claim());
// });

// // ✅ Fetch Event Handling
// self.addEventListener("fetch", (event) => {
//     console.log("Fetching:", event.request.url);
// });

// // ✅ Push Notification Event
// self.addEventListener("push", (event) => {
//     console.log("Push Notification Received:", event);

//     const data = event.data ? event.data.json() : { 
//         title: "Notification", 
//         body: "No content",
//         url: "/" 
//     };

//     console.log("Notification Data:", data);

//     const options = {
//         body: data.body,
//         icon: '/icons/bell.jpeg',
//         badge: '/icons/bell.jpeg',
//         vibrate: [200, 100, 200],
//         data: { url: data.url }
//     };

//     event.waitUntil(
//         self.registration.showNotification(data.title, options)
//     );
// });

// // ✅ Notification Click Event
// self.addEventListener("notificationclick", (event) => {
//     console.log("Notification Clicked:", event.notification);
//     event.notification.close();

//     const urlToOpen = event.notification.data?.url || "/";

//     event.waitUntil(
//         self.clients.matchAll({ type: "window", includeUncontrolled: true })
//         .then((clientList) => {
//             const matchingClient = clientList.find(client => client.url === urlToOpen);
//             if (matchingClient && "focus" in matchingClient) {
//                 return matchingClient.focus();
//             }
//             return self.clients.openWindow(urlToOpen);
//         })
//     );
// });
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals, @typescript-eslint/ban-ts-comment */

import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkFirst, StaleWhileRevalidate, CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

// Precaching with automatic manifest injection
precacheAndRoute(self.__WB_MANIFEST);

// Cache strategies for different resource types
registerRoute(
  ({request}) => request.destination === 'document',
  new NetworkFirst({
    cacheName: 'pages',
    networkTimeoutSeconds: 3
  })
);

registerRoute(
  ({request}) => ['script', 'style'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 1 Week
      })
    ]
  })
);

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
      })
    ]
  })
);

// Service Worker Lifecycle Events
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== 'pages' && 
              cache !== 'static-resources' && 
              cache !== 'images') {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  console.log('Service Worker activated');
});

// Push Notification Handling
self.addEventListener('push', event => {
  const data = event.data?.json() || {
    title: 'New Notification',
    body: 'You have new updates!',
    icon: '/icons/bell.jpeg',
    data: { url: '/' }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: '/icons/bell.jpeg',
      vibrate: [200, 100, 200],
      data: data.data
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({type: 'window'})
      .then(clientList => {
        const client = clientList.find(c => c.url === url);
        return client ? client.focus() : self.clients.openWindow(url);
      })
  );
});