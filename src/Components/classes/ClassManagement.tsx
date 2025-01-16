import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

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
  const [editClass, setEditClass] = useState<Class | null>(null);

  // Handle edit action
  const handleEdit = (id: number): void => {
    const classToEdit = classes.find((cls) => cls.id === id);
    if (classToEdit) {
      setEditClass(classToEdit); // Set the class to be edited
    }
  };

  // Handle save edit
  const handleSave = (): void => {
    if (editClass) {
      setClasses(
        classes.map((cls) =>
          cls.id === editClass.id ? { ...cls, ...editClass } : cls
        )
      );
      setEditClass(null); // Reset the edit form
    }
  };

  // Handle cancel edit
  const handleCancel = (): void => {
    setEditClass(null); // Reset the edit form without saving
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
    <div className="max-w-screen-lg mx-auto p-6 bg-white rounded-lg shadow-lg min-h-screen mt-12">
      <h1 className="text-3xl font-bold mb-6">Classes</h1>
      <div className="flex justify-between mb-4">
        <div>
        <Link to="/manage">
          <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400">
            Manage
          </button>
        </Link > 
        <Link to="/create">
          <button className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Create
          </button>
        </Link>  
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
              <td className="p-4 border-b">
                {editClass && editClass.id === cls.id ? (
                  <input
                    type="text"
                    value={editClass.title}
                    onChange={(e) =>
                      setEditClass({
                        ...editClass,
                        title: e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  cls.title
                )}
              </td>
              <td className="p-4 border-b">
                {editClass && editClass.id === cls.id ? (
                  <input
                    type="number"
                    value={editClass.duration}
                    onChange={(e) =>
                      setEditClass({
                        ...editClass,
                        duration: +e.target.value,
                      })
                    }
                    className="border px-2 py-1 rounded"
                  />
                ) : (
                  cls.duration
                )}
              </td>
              <td className="p-4 border-b">
                {editClass && editClass.id === cls.id ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(cls.id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cls.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassManagement;

