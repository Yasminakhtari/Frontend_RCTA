import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Added for navigation
import { getFilteredProducts } from '../../Services/TennisService';
import { getAllUsers } from '../../Services/UserService';
import { getSessionById, saveSession, updateSession } from '../../Services/SessionService';
import { getAllLocation } from '../../Services/LocationService';
import { errorNotification, successNotification } from '../../Services/NotificationService';

interface SessionFormData {
  courseId: string;
  fromDate: string;
  toDate: string;
  startTime: string;
  endTime: string;
  days: string[];
  price: string;
  coachId: string;
  maxCapacity: string;
  maxWaitingCapacity: string;
  locationId: string; // Added location field
}

interface User {
  id: number;
  username: string;
  firstName:string;
  lastName:string;
  role: {
    id: number;
    name: string;
  };
}

interface Location{
  id?: any; // Optional to handle cases where ID might not exist initially
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: string;
}

const SessionCreatePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get `id` from the route
  const navigate = useNavigate(); // Added for navigation
  // const [categories, setCategories] = useState<{ [key: string]: string[] }>({});
  const [categories, setCategories] = useState<{ [key: string]: { id: number; subcategory: string }[] }>({});
  const [coaches, setCoaches] = useState<User[]>([]);
  const [location, setLocations] = useState<Location[]>([]);
  const [formData, setFormData] = useState<SessionFormData>({
    courseId: '',
    fromDate: '',
    toDate: '',
    startTime: '',
    endTime: '',
    days: [],
    price: '',
    coachId: '',
    maxCapacity: '',
    maxWaitingCapacity: '',
    locationId: '', // Initialize location
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
      days: prevData.days.includes(day)
        ? prevData.days.filter((d) => d !== day)
        : [...prevData.days, day],
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

  const handleCreateSession = async () => {
    try {
      if (id) {
        // If `id` exists, it's an update operation
        const updatedSession = { ...formData };
        const response = await updateSession(Number(id), updatedSession); // Call update API
       successNotification("Success",'Session updated successfully!');
        console.log('Session updated:', response);
      } else {
        // If `id` doesn't exist, it's a create operation
        const response = await saveSession(formData);
        successNotification("Success",'Session created successfully!');
        console.log('Session created:', response);
      }
      navigate('/manage');
    } catch (error) {
      errorNotification("error","Failed to create session. Please try again.");
    }
  };

  const fetchSessionData = async () => {
    if (!id) return; // If no `id` is provided, skip fetching
    try {
      const response = await getSessionById(Number(id)); // Call API to fetch session by ID
      const session = response.data; // Assuming `response.data` contains the session

       // Fetch course and coach names
    const course = await getFilteredProducts('Classes'); // Fetch all courses
    const coach = await getAllUsers(); // Fetch all users (to get coaches)

    // Find course and coach names
    const courseData = course.find((c: any) => c.id === session.courseId);
    const coachData = coach.data.find((u: any) => u.id === session.coachId);
      // Prepopulate categories if courseData is available
    if (courseData) {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [courseData.category]: [{ id: courseData.id, subcategory: courseData.subcategory }],
      }));
    } else {
      console.warn(`Course with ID ${session.courseId} not found`);
    }

    // Prepopulate coaches if coachData is available
    if (coachData) {
      setCoaches((prevCoaches) => [
        ...prevCoaches,
        {
          id: coachData.id,
          firstName: coachData.firstName, // Add firstName
          lastName: coachData.lastName,   // Add lastName
          username: coachData.username,
          role: coachData.role,
        },
      ]);
    } 
    else {
      console.warn(`Coach with ID ${session.coachId} not found`);
    }

      setFormData({
        courseId: session.courseId.toString(),
        fromDate: session.fromDate.split('-').reverse().join('-'), // Format date as YYYY-MM-DD
        toDate: session.toDate.split('-').reverse().join('-'),
        startTime: session.startTime,
        endTime: session.endTime,
        days: session.days.map((day: string) => day),
        price: session.price.toString(),
        coachId: session.coachId.toString(),
        maxCapacity: session.maxCapacity.toString(),
        maxWaitingCapacity: session.maxWaitingCapacity.toString(),
        locationId: session.locationId.toString(),
      });
    } catch (error) {
      console.error('Error fetching session data:', error);
      errorNotification("error",'Failed to fetch session data. Please try again.');
    }
  };

  const fetchSession = async () => {
    try {
      const data = await getFilteredProducts("Classes");

      // Define the type of categoryMap
      const categoryMap: { [key: string]: { id: number; subcategory: string }[] } = {};

      // Process data into categories and subcategories with IDs
      data.forEach((classes: { id: number; category: string; subcategory: string }) => {
        const { id, category, subcategory } = classes;

        if (!categoryMap[category]) {
          categoryMap[category] = [];
        }

        // Add subcategory with ID if not already included
        if (!categoryMap[category].some((sub) => sub.id === id)) {
          categoryMap[category].push({ id, subcategory });
        }
      });

      setCategories(categoryMap); // Set the updated category map
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  // Fetch all users and filter by roleId
  const fetchCoaches = async () => {
    try {
      const users = await getAllUsers();
      const filteredCoaches = users.data.filter((user: { role: { id: number } }) => user.role?.id === 3);
      setCoaches(filteredCoaches);
    } catch (error) {
      console.error("Error fetching coaches:", error);
    }
  };
  //Fetch Location
  const fetchLocations = async () => {
    try {
      const location = await getAllLocation();
  
      // Filter locations where status is 'active'
      const activeLocations = location.data.filter((location: { status: string }) => location.status === 'active');
  
      setLocations(activeLocations);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  
  useEffect(() => {
    fetchSession();
    fetchCoaches();
    fetchSessionData(); // Fetch session if `id` exists in the route
    fetchLocations();
  }, [id]);

  return (
    //<div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-16">
    <div className="w-3/5 mx-auto p-6 bg-white rounded shadow mt-16">
      <h1 className="text-lg font-bold mb-2">{ id ? "Update Session" : "Create Session"}</h1>
      <div className="mb-2 space-x-2">
        <button onClick={() => navigate('/manage')} className="bg-gray-200 px-3 py-1 rounded-sm text-sm">Manage</button>
        <button onClick={() => navigate('/create')} className="bg-blue-500 text-white px-3 py-1 rounded-sm text-sm">Create</button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block font-medium">Select Course</label>
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
            <option value="">Select a course to create a session</option>
            {Object.entries(categories).map(([category, subcategories]) =>
              subcategories.map(({ id, subcategory }) => (
                <option key={id} value={id}>
                  {`${subcategory} (${category})`}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label className="block font-medium">Select the Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              className="border p-2 rounded w-1/2"
            />
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
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
                  checked={formData.days.includes(day)}
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
            name="locationId"
            value={formData.locationId}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
          >
             <option value="">Select a location</option>
        {location.map((location) => (
          <option key={location.id} value={location.id}>
            {location.locationName}, {location.address}
                {/* {location.locationName}, {location.address}, {location.city}, {location.state}, {location.zipCode} */}
          </option>
        ))}
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
            <select
              name="coachId"  // Corrected to match formData key
              value={formData.coachId}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Select a coach</option>
              {coaches.map((coach) => (
                <option key={coach.id} value={coach.id}>
                   {`${coach.firstName} ${coach.lastName}`}
                </option>
              ))}
            </select>

          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium">Session Capacity</label>
            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleInputChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block font-medium">Waiting Capacity</label>
            <input
              type="number"
              name="maxWaitingCapacity"
              value={formData.maxWaitingCapacity}
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
          { id ? "Update Session" : "Create Session"}
        </button>
      </div>
    </div>
  );
};

export default SessionCreatePage;