import React, { useState } from "react";

const SessionForm: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Sessions</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg font-medium hover:bg-gray-300">
            Manage
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
            Create
          </button>
        </div>
      </div>

      {/* Form */}
      <form>
        {/* Course Dropdown */}
        <div className="mb-4">
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Select Course
          </label>
          <select
            id="course"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
            defaultValue=""
          >
            <option value="" disabled>
              Select a course to create a session
            </option>
          </select>
        </div>

        {/* Date Range */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select the Date Range
          </label>
          <input
            type="date"
            className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Start and End Time */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="start-time" className="block text-sm font-medium text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              id="start-time"
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="end-time" className="block text-sm font-medium text-gray-700">
              End Time
            </label>
            <input
              type="time"
              id="end-time"
              className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        {/* Days Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Days
          </label>
          <div className="flex flex-wrap gap-2 mt-2">
            {days.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-4 py-2 rounded-lg ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Additional Fields */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
            defaultValue={10}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700">
            Instructor
          </label>
          <input
            type="text"
            id="instructor"
            className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="session-capacity" className="block text-sm font-medium text-gray-700">
              Session Capacity
            </label>
            <input
              type="number"
              id="session-capacity"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              defaultValue={2}
            />
          </div>
          <div>
            <label htmlFor="waiting-capacity" className="block text-sm font-medium text-gray-700">
              Waiting Capacity
            </label>
            <input
              type="number"
              id="waiting-capacity"
              className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
              defaultValue={2}
            />
          </div>
        </div>

        {/* Total Hours */}
        <div className="mb-4 text-sm text-gray-700">
          <span className="font-medium">Total Hours:</span> 0.00
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
        >
          Create Session
        </button>
      </form>
    </div>
  );
};

export default SessionForm;
