/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals, @typescript-eslint/ban-ts-comment */

// declare function importScripts(...urls: string[]): void;

// @ts-ignore

self.importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js");




if (self.workbox) {
    console.log("Workbox loaded 🎉");
    self.workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
} else {
    console.log("Workbox failed to load 😢");
}

// ✅ Service Worker Installation
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
});

// ✅ Service Worker Activation
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(self.clients.claim());
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
        url: "/" 
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

    const urlToOpen = event.notification.data?.url || "/";

    event.waitUntil(
        self.clients.matchAll({ type: "window", includeUncontrolled: true })
        .then((clientList) => {
            const matchingClient = clientList.find(client => client.url === urlToOpen);
            if (matchingClient && "focus" in matchingClient) {
                return matchingClient.focus();
            }
            return self.clients.openWindow(urlToOpen);
        })
    );
});
