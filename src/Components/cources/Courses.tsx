import React, { useState } from 'react';

interface Course {
  id: number;
  title: string;
  duration: number;
}

const initialCourses: Course[] = [
  { id: 1, title: 'Core Java', duration: 100 },
  { id: 2, title: 'Full-stack Java', duration: 300 },
  { id: 3, title: 'Core Python', duration: 100 },
  { id: 4, title: 'Full-stack Python', duration: 300 },
];

const Courses: React.FC = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [filter, setFilter] = useState('');

  const handleDelete = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="flex justify-between items-center mb-4">
        <button className="px-4 py-2 bg-gray-200 rounded">Manage</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
      </div>
      <input
        type="text"
        placeholder="Filter course..."
        className="mb-4 p-2 border border-gray-300 rounded w-full"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Title</th>
            <th className="border border-gray-300 px-4 py-2">Duration (hours)</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={course.id}>
              <td className="border border-gray-300 px-4 py-2">{course.title}</td>
              <td className="border border-gray-300 px-4 py-2">{course.duration}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="mr-2 text-blue-500">✏️</button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(course.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
