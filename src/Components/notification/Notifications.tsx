import React, { useEffect, useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
}

interface NotificationsProps {
  userId: string;
}

interface NotificationState {
  unread: Notification[];
  read: Notification[];
}

const Notifications: React.FC<NotificationsProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<NotificationState>({
    unread: [],
    read: [],
  });

  useEffect(() => {
    fetch(`/api/notifications/${userId}`)
      .then((response) => response.json())
      .then((data) => setNotifications(data));
  }, [userId]);

  const markAsRead = (id: number) => {
    fetch(`/api/notifications/${id}/read`, { method: "POST" })
      .then(() => {
        setNotifications((prev) => ({
          ...prev,
          unread: prev.unread.filter((n) => n.id !== id),
          read: [...prev.read, prev.unread.find((n) => n.id === id)!],
        }));
      });
  };

  const markAllAsRead = () => {
    fetch(`/api/notifications/${userId}/read-all`, { method: "POST" })
      .then(() => {
        setNotifications((prev) => ({
          unread: [],
          read: [...prev.read, ...prev.unread],
        }));
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen mt-16">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <button
        onClick={markAllAsRead}
        className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Mark All as Read
      </button>

      <h2 className="text-xl font-semibold mb-2">Unread Notifications</h2>
      <ul className="mb-6 space-y-4">
        {notifications.unread.map((notification) => (
          <li key={notification.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p className="text-gray-700">{notification.message}</p>
            <button
              onClick={() => markAsRead(notification.id)}
              className="mt-2 px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Mark as Read
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Read Notifications</h2>
      <ul className="space-y-4">
        {notifications.read.map((notification) => (
          <li key={notification.id} className="p-4 border rounded shadow-sm">
            <h3 className="text-lg font-semibold">{notification.title}</h3>
            <p className="text-gray-700">{notification.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
