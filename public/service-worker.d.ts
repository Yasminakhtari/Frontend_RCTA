// // public/service-worker.js
// /// <reference lib="webworker" />  // Add this at the top

// self.addEventListener('push', (event) => {
//   /** @type {PushEvent} */
//   const pushEvent = event;
//   const payload = pushEvent.data?.json() || { title: 'New Notification' };
  
//   pushEvent.waitUntil(
//     self.registration.showNotification(payload.title, {
//       body: payload.body,
//       icon: '/notification-icon.png',
//       data: { url: payload.url }
//     })
//   );
// });

// self.addEventListener('notificationclick', (event) => {
//   /** @type {NotificationEvent} */
//   const notificationEvent = event;
//   notificationEvent.notification.close();
  
//   if (notificationEvent.notification.data.url) {
//     notificationEvent.waitUntil(
//       self.clients.openWindow(notificationEvent.notification.data.url)
//     );
//   }
// });