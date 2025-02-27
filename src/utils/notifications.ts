
export async function requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return false;
    }
  
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        await registerServiceWorker();
        return true;
      }
      console.warn('Notification permission denied.');
      return false;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }
  
  async function registerServiceWorker(): Promise<ServiceWorkerRegistration> {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered');
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  }