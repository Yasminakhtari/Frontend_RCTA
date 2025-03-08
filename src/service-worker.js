/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */
// const swSelf = self as unknown as ServiceWorkerGlobalScope;
// declare let self: ServiceWorkerGlobalScope;
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST || []);

/* global self */
self.addEventListener('push', (event) => {
    const data = event.data?.json();
    const options = {
        body: data.body,
        icon: '/icons/bell.jpeg',
        badge: '/icons/bell.jpeg',
        vibrate: [200, 100, 200],
        data: {
            url: data.url
        }
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        self.clients.openWindow(event.notification.data.url || "/")
    );
});


export {};
