/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { precacheAndRoute } from 'workbox-precaching';

// ✅ Ensure Workbox precaching is set up correctly
precacheAndRoute(self.__WB_MANIFEST || []);

// ✅ Service Worker Installation
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
});

// ✅ Service Worker Activation
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(self.clients.claim()); // Ensures control of all clients
});

// ✅ Fetch Event Handling
self.addEventListener("fetch", (event) => {
    console.log("Fetching:", event.request.url);
});

// ✅ Push Notification Event
self.addEventListener("push", (event) => {
    console.log("Push Notification Received:", event);

    const data = event.data ? event.data.json() : { 
        title: "Notification", 
        body: "No content",
        url: "/" // Provide a default URL if missing
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

// ✅ Notification Click Event
self.addEventListener("notificationclick", (event) => {
    console.log("Notification Clicked:", event.notification);

    event.notification.close();
    
    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
            // Open the URL in the existing tab if possible
            for (const client of clientList) {
                if (client.url === event.notification.data.url && "focus" in client) {
                    return client.focus();
                }
            }
            // Otherwise, open a new window/tab
            return self.clients.openWindow(event.notification.data.url || "/");
        })
    );
});
