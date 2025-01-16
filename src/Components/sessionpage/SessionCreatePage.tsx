import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Added for navigation

interface SessionFormData {
  course: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  selectedDays: string[];
  price: string;
  coach: string;
  sessionCapacity: string;
  waitingCapacity: string;
  location: string; // Added location field
}

const SessionCreatePage: React.FC = () => {
  const navigate = useNavigate(); // Added for navigation
  const [formData, setFormData] = useState<SessionFormData>({
    course: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    selectedDays: [],
    price: '',
    coach: '',
    sessionCapacity: '',
    waitingCapacity: '',
    location: '', // Initialize location
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDay = (day: string) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedDays: prevData.selectedDays.includes(day)
        ? prevData.selectedDays.filter((d) => d !== day)
        : [...prevData.selectedDays, day],
    }));
  };

  const calculateTotalHours = () => {
    if (!formData.startTime || !formData.endTime) return '0.00';
    const [startHour, startMinute] = formData.startTime.split(':').map(Number);
    const [endHour, endMinute] = formData.endTime.split(':').map(Number);
    const totalMinutes = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const totalHours = totalMinutes / 60;
    return totalHours > 0 ? totalHours.toFixed(2) : '0.00';
  };

  const handleCreateSession = () => {
    alert('Session created successfully!'); // Placeholder
  };

  return (
    //<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-16">
    <div className="w-3/5 mx-auto p-6 bg-white rounded shadow mt-16">
      <h1 className="text-lg font-bold mb-2">Create Session</h1>
      <div className="mb-2 space-x-2">
        <button onClick={() => navigate('/manage')} className="bg-blue-500 text-white px-3 py-1 rounded-sm text-sm">Manage</button>
        <button onClick={() => navigate('/create')} className="bg-gray-200 px-3 py-1 rounded-sm text-sm">Create</button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Select Course</label>
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a course to create a session</option>
            <option value="Tennis Foundations">Tennis Foundations</option>
            <option value="Rally Ready">Rally Ready</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Select the Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-1/2"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block font-medium">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
        <div>
          <label className="block font-medium">Select Days</label>
          <div className="grid grid-cols-4 gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <label key={day} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.selectedDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />
                <span>{day}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a location</option>
            <option value="College Park High School">College Park High School</option>
            <option value="Garden">Garden</option>
          </select>
        </div>
        <div>
          <p className="font-medium">Total Hours: {calculateTotalHours()}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Coach</label>
            {/* <input
              type="text"
              name="instructor"
              value={formData.coach}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            /> */}
            <select
              name="coach"  // Corrected to match formData key
              value={formData.coach}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select a coach</option>
              <option value="Rafael Carbungco">Rafael Carbungco</option>
              <option value="Abinash Patri">Abinash Patri</option>
              <option value="Yasmin Nani">Yasmin Nani</option>
              <option value="Sourav Mohanty">Sourav Mohanty</option>
            </select>

          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium">Session Capacity</label>
            <input
              type="number"
              name="sessionCapacity"
              value={formData.sessionCapacity}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Waiting Capacity</label>
            <input
              type="number"
              name="waitingCapacity"
              value={formData.waitingCapacity}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleCreateSession}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Create Session
        </button>
      </div>
    </div>
  );
};

export default SessionCreatePage;