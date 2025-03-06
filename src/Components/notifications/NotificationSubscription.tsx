import { useEffect } from 'react';
import { VAPID_PUBLIC_KEY } from "../../config";
import { base_url } from '../../apiConfig';

const urlBase64ToUint8Array = (base64String: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

const NotificationSubscription: React.FC = () => {
  console.log("NotificationSubscription component mounted!"); // ✅ Should appear on every render

  useEffect(() => {
    const subscribeUser = async () => {
      console.log("Attempting to subscribe user..."); // ✅ Should appear if conditions pass
      try {
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker Ready:", registration); // ✅ Check if this logs
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });
        console.log("Subscription from  NotificationSubscription component" + subscription);
        console.log(registration);
        // Send subscription to backend
        await fetch(`${base_url}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(subscription)
        });
      } catch (error) {
        console.error('Push subscription failed:', error);
      }
    };

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      Notification.requestPermission().then(permission => {
        console.log("Notification Permission:", permission); // ✅ Should log "granted" if accepted
        if (permission === 'granted') {
          subscribeUser();
        }
      });
    }
  }, []);

  return null;
};

export default NotificationSubscription;
