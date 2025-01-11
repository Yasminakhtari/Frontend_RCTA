import React, { useState, ChangeEvent } from 'react';

// Define the Class interface
interface Class {
  id: number;
  title: string;
  duration: number;
}

// Initial class data
const initialClasses: Class[] = [
  { id: 1, title: 'Tennis Foundations (for beginners)', duration: 100 },
  { id: 2, title: 'Rally Ready (for intermediate)', duration: 300 },
  { id: 3, title: 'Game Mastery (for advanced)', duration: 100 },
  { id: 4, title: 'Swing and Sweat (cardio-Focused)', duration: 300 },
];

const ClassManagement: React.FC = () => {
  // State management
  const [classes, setClasses] = useState<Class[]>(initialClasses);
  const [search, setSearch] = useState<string>('');

  // Handle edit action
  const handleEdit = (id: number): void => {
    console.log(`Edit class with id: ${id}`);
    // Logic for editing the class (e.g., navigate to another page)
  };

  // Handle delete action
  const handleDelete = (id: number): void => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      setClasses(classes.filter((cls) => cls.id !== id));
    }
  };

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value.toLowerCase());
  };

  // Filtered classes based on search input
  const filteredClasses = classes.filter((cls) =>
    cls.title.toLowerCase().includes(search)
  );

  return (
    <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>
      <div className="flex justify-between mb-4">
        <div>
          <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">
            Manage
          </button>
          <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create
          </button>
        </div>
        <input
          type="text"
          placeholder="Filter class..."
          value={search}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded px-4 py-2"
        />
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b p-4 text-left">Title</th>
            <th className="border-b p-4 text-left">Duration (hours)</th>
            <th className="border-b p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((cls) => (
            <tr key={cls.id} className="hover:bg-gray-100">
              <td className="p-4 border-b">{cls.title}</td>
              <td className="p-4 border-b">{cls.duration}</td>
              <td className="p-4 border-b">
                <button
                  onClick={() => handleEdit(cls.id)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 17h2m4-4H7m10 0a2 2 0 100 4 2 2 0 110-4z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(cls.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 inline-block"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagement;
