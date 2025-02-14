import React, { useState } from 'react';

const NotificationTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    {
      class_name: 'Biology 102',
      session_name: 'Winter 2024',
      start_date: '2024-02-01',
      end_date: '2024-06-01',
    },
  ];

  const handleSendClick = (className: string) => {
    alert(`Notification sent successfully for ${className}`);
  };

  const filteredNotifications = notifications.filter(notification =>
    notification.class_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Notification Table</h1>
      <input
        type="text"
        placeholder="Search by Class Name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2">Class Name</th>
              <th className="px-4 py-2">Session Name</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedNotifications.map((notification, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2 text-center">{notification.class_name}</td>
                <td className="px-4 py-2 text-center">{notification.session_name}</td>
                <td className="px-4 py-2 text-center">{notification.start_date}</td>
                <td className="px-4 py-2 text-center">{notification.end_date}</td>
                <td className="px-4 py-2 text-center">
                  <button 
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                    onClick={() => handleSendClick(notification.class_name)}
                  >
                    Send
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NotificationTable;
