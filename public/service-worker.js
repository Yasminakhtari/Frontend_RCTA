// /// <reference lib="webworker" />
// /* eslint-disable no-restricted-globals */
// // const swSelf = self as unknown as ServiceWorkerGlobalScope;
// // declare let self: ServiceWorkerGlobalScope;

// /* global self */
// // service-worker.js
// self.addEventListener("install", (event) => {
//     console.log("Service Worker Installed");
//     self.skipWaiting();
//   });
  
//   self.addEventListener("activate", (event) => {
//     console.log("Service Worker Activated");
//   });
  
//   self.addEventListener("fetch", (event) => {
//     console.log("Fetching:", event.request.url);
//   });
  
// self.addEventListener('push', (event) => {
    
//     console.log("THis is from service-worker.js file /// Push Notification Received:" + event);
//     const data = event.data ? event.data.json() : { title: "Notification", body: "No content" };
//     console.log("THis is from service-worker.js file" + data);
//     const options = {
//         body: data.body,
//         icon: '/icons/bell.jpeg',
//         badge: '/icons/bell.jpeg',
//         vibrate: [200, 100, 200],
//         data: {
//             url: data.url
//         }
//     };

//     event.waitUntil(
//         self.registration.showNotification(data.title, options)
//     );
// });

// self.addEventListener('notificationclick', (event) => {
//     console.log("Notification Clicked:", event.notification);
//     event.notification.close();
//     event.waitUntil(
//         self.clients.openWindow(event.notification.data.url || "/")
//     );
// });


// export {};
/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
});

self.addEventListener("fetch", (event) => {
    console.log("Fetching:", event.request.url);
});

self.addEventListener('push', (event) => {
    console.log("Push Notification Received:", event);

    const data = event.data ? event.data.json() : { 
        title: "Notification", 
        body: "No content" 
    };

    console.log("Notification Data:", data);

    const options = {
        body: data.body,
        icon: '/icons/bell.jpeg',
        badge: '/icons/bell.jpeg',
        vibrate: [200, 100, 200],
        data: { url: data.url }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    console.log("Notification Clicked:", event.notification);
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow(event.notification.data.url || "/")
    );
});
