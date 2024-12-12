import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const CreateCourse: React.FC = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState<number>(0);
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const courseData = {
      title,
      duration,
      description,
    };
    console.log(courseData);
    alert("Course created successfully!");
    setTitle("");
    setDuration(0);
    setDescription("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="flex justify-between items-center mb-6">
        <button className="px-4 py-2 bg-gray-200 rounded">Manage</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Create</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Duration */}
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="duration">
            Duration
          </label>
          <input
            id="duration"
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Duration in hours"
            className="w-full p-2 border border-gray-300 rounded"
            min={0}
          />
          <small className="text-gray-500">Duration in hours</small>
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            className="rounded border border-gray-300"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded font-bold hover:bg-blue-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
