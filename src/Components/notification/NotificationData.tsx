import React from 'react';
import NotificationTable from '../notification/NotificationTable';

const NotificationData: React.FC = () => {
  // Sample notification data
  const notifications = [
    {
      class_name: 'Mathematics 101',
      session_name: 'Fall 2023',
      start_date: '2023-09-01',
      end_date: '2023-12-15',
    },
    {
      class_name: 'Physics 201',
      session_name: 'Spring 2024',
      start_date: '2024-01-10',
      end_date: '2024-05-20',
    },
    {
      class_name: 'Chemistry 101',
      session_name: 'Summer 2023',
      start_date: '2023-06-15',
      end_date: '2023-08-25',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Notification Table</h1>
      <NotificationTable notifications={notifications} />
    </div>
  );
};

export default NotificationData;
