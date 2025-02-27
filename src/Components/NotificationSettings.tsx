// src/components/NotificationSettings.tsx
import { requestNotificationPermission } from '../utils/notifications';

const NotificationSettings = () => {
  const handleEnableNotifications = async () => {
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      // Perform additional actions after permission granted
    }
  };

  return (
    <button 
      onClick={handleEnableNotifications}
      className="notification-toggle-btn"
    >
      Enable Notifications
    </button>
  );
};