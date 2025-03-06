import { Modal, Button } from "@mantine/core";
import { base_url } from "../../apiConfig";
import { VAPID_PUBLIC_KEY } from "../../config";

interface PermissionModalProps {
  opened: boolean;
  onClose: () => void;
}
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

const PermissionModal: React.FC<PermissionModalProps> = ({ opened, onClose }) => {
  const handleAllow = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          // Trigger subscription
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
          });
          console.log("Push Notification Subscription:", JSON.stringify(subscription));

  
          // Save subscription to backend
          await fetch(`${base_url}/subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscription)
          });
        }
      } catch (error) {
        console.error('Push subscription failed:', error);
      } finally {
        onClose();
      }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Enable Notifications">
      <p>Receive important updates even when the app is closed.</p>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleAllow}>Allow</Button>
        <Button variant="outline" onClick={onClose}>Later</Button>
      </div>
    </Modal>
  );
};

export default PermissionModal;
