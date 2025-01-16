import React, { useState } from 'react';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
  enrolledSession: string;
  sessionStartDate: string;
  sessionExpirationDate: string;
}

const users: User[] = [
  { email: 'sonu@example.com', firstName: 'Sonu', lastName: 'Sharma', mobile: '1234567890', role: 'User', enrolledSession: 'Completed', sessionStartDate: '2023-08-01', sessionExpirationDate: '2023-11-01' },
  { email: 'admin@example.com', firstName: 'Admin', lastName: 'User', mobile: '9876543210', role: 'Coach', enrolledSession: 'Ongoing', sessionStartDate: '2023-09-01', sessionExpirationDate: '2023-12-01' },
  { email: 'subham@example.com', firstName: 'Subham', lastName: 'Kumar', mobile: '5555555555', role: 'Coach', enrolledSession: 'Upcoming', sessionStartDate: '2024-01-01', sessionExpirationDate: '2024-04-01' },
  { email: 'sonu@example.com', firstName: 'Sonu', lastName: 'Sharma', mobile: '1234567890', role: 'User', enrolledSession: 'Completed', sessionStartDate: '2023-08-01', sessionExpirationDate: '2023-11-01' },
  { email: 'admin@example.com', firstName: 'Admin', lastName: 'User', mobile: '9876543210', role: 'Coach', enrolledSession: 'Ongoing', sessionStartDate: '2023-09-01', sessionExpirationDate: '2023-12-01' },
];

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const filterUsers = () => {
    const today = new Date();
    return users.filter((user) => {
      const sessionStartDate = new Date(user.sessionStartDate);
      const sessionExpirationDate = new Date(user.sessionExpirationDate);

      const matchesSearch =
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm);

      let matchesFilter = true;
      if (filter === 'Present') {
        matchesFilter = sessionStartDate <= today && sessionExpirationDate >= today;
      } else if (filter === 'Past') {
        matchesFilter = sessionExpirationDate < today;
      } else if (filter === 'Future') {
        matchesFilter = sessionStartDate > today;
      }

      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
      {/* <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center">User Management</h1> */}

      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="flex-1 min-w-[200px] border rounded-lg px-4 py-2 text-base md:text-lg shadow-sm"
          onChange={handleSearchChange}
        />
        <select
          className="border rounded-lg px-4 py-2 text-base md:text-lg shadow-sm"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="All">All</option>
          <option value="Present">Current</option>
          <option value="Past">Past</option>
          <option value="Future">Future</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm md:text-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 md:p-4 border">Email</th>
              <th className="p-3 md:p-4 border">First Name</th>
              <th className="p-3 md:p-4 border">Last Name</th>
              <th className="p-3 md:p-4 border">Mobile</th>
              <th className="p-3 md:p-4 border">Role</th>
              <th className="p-3 md:p-4 border">Enrolled Session</th>
              <th className="p-3 md:p-4 border">Session Start Date</th>
              <th className="p-3 md:p-4 border">Session End Date</th>
              <th className="p-3 md:p-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers().map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="p-3 md:p-4 border">{user.email}</td>
                <td className="p-3 md:p-4 border">{user.firstName}</td>
                <td className="p-3 md:p-4 border">{user.lastName}</td>
                <td className="p-3 md:p-4 border">{user.mobile}</td>
                <td
                  className={`p-3 md:p-4 border ${
                    user.role === 'User' ? 'bg-red-100' : 'bg-yellow-100'
                  }`}
                >
                  {user.role}
                </td>
                <td
                  className={`p-3 md:p-4 border ${
                    user.enrolledSession === 'Completed'
                      ? 'bg-green-100'
                      : user.enrolledSession === 'Ongoing'
                      ? 'bg-blue-100'
                      : 'bg-yellow-100'
                  }`}
                >
                  {user.enrolledSession}
                </td>
                <td className="p-3 md:p-4 border">{user.sessionStartDate}</td>
                <td className="p-3 md:p-4 border">{user.sessionExpirationDate}</td>
                <td className="p-3 md:p-4 border">
                  <button
                    onClick={() =>
                      alert(`Change role for user with email: ${user.email}`)
                    }
                    className="bg-blue-500 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-blue-600"
                  >
                    Change Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
