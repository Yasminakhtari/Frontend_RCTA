import React, { useState } from 'react';
import { base_url } from "../../../apiConfig";

const AdminPushForm = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const sendNotification = async () => {
    await fetch(`${base_url}/send-push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, message }),
    });
    setTitle('');
    setMessage('');
  };
  
// const sendNotification = async () => {
//   await fetch(`${base_url}/send-push`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` 
//       },
//       body: JSON.stringify({ title, message }),
//   });
// };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Send Push Notification</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 mb-4 border rounded h-32"
      />
      <button
        onClick={sendNotification}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Send to All Users
      </button>
    </div>
  );
};

export default AdminPushForm;
