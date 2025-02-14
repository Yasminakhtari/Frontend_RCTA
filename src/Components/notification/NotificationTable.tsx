import React from 'react';

// Define the type for the notification data
type Notification = {
  class_name: string;
  session_name: string;
  start_date: string;
  end_date: string;
};

// Define the props for the NotificationTable component
type NotificationTableProps = {
  notifications: Notification[];
};

const NotificationTable: React.FC<NotificationTableProps> = ({ notifications }) => {
  // Handle the "Send" button click
  const handleSend = (notification: Notification) => {
    alert(`Send button clicked for: ${notification.class_name} - ${notification.session_name}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 border-b text-left">Class Name</th>
            <th className="py-3 px-4 border-b text-left">Session Name</th>
            <th className="py-3 px-4 border-b text-left">Start Date</th>
            <th className="py-3 px-4 border-b text-left">End Date</th>
            <th className="py-3 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 border-b">{notification.class_name}</td>
              <td className="py-3 px-4 border-b">{notification.session_name}</td>
              <td className="py-3 px-4 border-b">{notification.start_date}</td>
              <td className="py-3 px-4 border-b">{notification.end_date}</td>
              <td className="py-3 px-4 border-b">
                <button
                  onClick={() => handleSend(notification)}
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition duration-200"
                >
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationTable;