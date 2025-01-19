import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa';

interface Student {
  username: string;
  email: string;
  phoneNumber: string;
  name: string;
  status: string;
}

const students: Student[] = [
  {
    username: 'Abinashpatri',
    email: 'abinashpatri5@gmail.com',
    phoneNumber: '+917735147053',
    name: 'Abinash Patri',
    status: 'Booked',
  },
];

const StudentDetails: React.FC = () => {
  const { sessionNo } = useParams<{ sessionNo: string }>();
  const [search, setSearch] = useState('');

  const filteredStudents = students.filter(
    (student) =>
      student.username.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase()) ||
      student.phoneNumber.includes(search) ||
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen mt-20">
      <h1 className="text-2xl font-semibold mb-4">Student Details for Session {sessionNo}</h1>

      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          placeholder="Search all fields..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3 px-1 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center">
          <FaDownload className="mr-2" /> Download CSV
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-blue-500">
            <tr>
              <th className="px-6 py-3 border-b text-left text-white font-medium">Username</th>
              <th className="px-6 py-3 border-b text-left text-white font-medium">Email</th>
              <th className="px-6 py-3 border-b text-left text-white font-medium">Phone Number</th>
              <th className="px-6 py-3 border-b text-left text-white font-medium">Name</th>
              <th className="px-6 py-3 border-b text-left text-white font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-gray-800">{student.username}</td>
                <td className="px-6 py-4 border-b text-gray-800">{student.email}</td>
                <td className="px-6 py-4 border-b text-gray-800">{student.phoneNumber}</td>
                <td className="px-6 py-4 border-b text-gray-800">{student.name}</td>
                <td className="px-6 py-4 border-b text-gray-800">{student.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Previous</button>
        <span className="text-gray-600">{filteredStudents.length} of {students.length} row(s) selected.</span>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">Next</button>
      </div>
    </div>
  );
};

export default StudentDetails;

