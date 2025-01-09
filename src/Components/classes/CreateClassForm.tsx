// Import required packages
import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill'; // Rich text editor
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Define a TypeScript interface for the class form state
interface ClassFormData {
  title: string;
  duration: number | string;
  description: string;
}

// Toolbar options for the rich text editor
const quillModules = {
  toolbar: [
    [{ font: [] }],  // Font dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // Header dropdown
    ['bold', 'italic', 'underline', 'strike'], // Text formatting
    [{ color: [] }, { background: [] }], // Color and background
    [{ script: 'sub' }, { script: 'super' }], // Subscript / superscript
    ['blockquote', 'code-block'], // Blockquote and code block
    [{ list: 'ordered' }, { list: 'bullet' }], // Ordered and unordered lists
    [{ align: [] }], // Text alignment
    ['link', 'image'], // Link and image
    ['clean'], // Remove formatting
  ],
};

const CreateClassForm: React.FC = () => {
  const [formData, setFormData] = useState<ClassFormData>({
    title: '',
    duration: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'duration' ? parseFloat(value) : value,
    });
  };

  const handleDescriptionChange = (value: string) => {
    setFormData({ ...formData, description: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Class Created:', formData);
    // Add form submission logic (e.g., API call) here
  };

  return (
    <div className="max-w-screen-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Classes</h1>
      <div className="flex space-x-4 mb-6">
        <button className="bg-gray-200 text-black py-2 px-4 rounded hover:bg-gray-300">Manage</button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            required
          />
          <p className="text-gray-500 text-sm">Duration in hours</p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm  font-medium text-gray-700">Description</label>
          <ReactQuill
            value={formData.description}
            onChange={handleDescriptionChange}
            modules={quillModules}
            className="mt-1"
            theme="snow"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Classes
        </button>
      </form>
    </div>
  );
};

export default CreateClassForm;
