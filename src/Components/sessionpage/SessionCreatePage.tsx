// import React, { useState, useEffect } from 'react';

// const SessionCreatePage: React.FC = () => {
//   const [screenWidth, setScreenWidth] = useState(window.innerWidth);
//   const [screenHeight, setScreenHeight] = useState(window.innerHeight);

//   const [course, setCourse] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [endTime, setEndTime] = useState('');
//   const [days, setDays] = useState<string[]>([]);
//   const [price, setPrice] = useState('');
//   const [instructor, setInstructor] = useState('');
//   const [sessionCapacity, setSessionCapacity] = useState('');
//   const [waitingCapacity, setWaitingCapacity] = useState('');

//   useEffect(() => {
//     const handleResize = () => {
//       setScreenWidth(window.innerWidth);
//       setScreenHeight(window.innerHeight);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleDayToggle = (day: string) => {
//     setDays((prevDays) =>
//       prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
//     );
//   };

//   const handleCreateSession = () => {
//     alert('Session created successfully!'); // Placeholder for session creation logic
//   };

//   return (
//     <div className="p-4 mt-11">
//       <div className="text-xs mb-2">
//         <strong>Screen Size:</strong> {screenWidth} x {screenHeight}
//       </div>
//       <h1 className="text-lg font-bold mb-2">Create Session</h1>
//       <div className="mb-2 space-x-2">
//         <button className="bg-gray-200 px-3 py-1 rounded-sm text-sm">Manage</button>
//         <button className="bg-blue-500 text-white px-3 py-1 rounded-sm text-sm">Create</button>
//       </div>
//       <div className="space-y-2 text-sm">
//         <div>
//           <label className="block mb-1 font-semibold">Select Course</label>
//           <select
//             value={course}
//             onChange={(e) => setCourse(e.target.value)}
//             className="border border-gray-300 p-1 rounded w-full"
//           >
//             <option value="">Select a course</option>
//             <option value="Tennis Foundations">Tennis Foundations</option>
//             <option value="Rally Ready">Rally Ready</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Date Range</label>
//           <div className="flex space-x-2">
//             <input
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//             <input
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label className="block mb-1 font-semibold">Start Time</label>
//             <input
//               type="time"
//               value={startTime}
//               onChange={(e) => setStartTime(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">End Time</label>
//             <input
//               type="time"
//               value={endTime}
//               onChange={(e) => setEndTime(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Select Days</label>
//           <div className="grid grid-cols-4 gap-1">
//             {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
//               <button
//                 key={day}
//                 onClick={() => handleDayToggle(day)}
//                 className={`border px-2 py-1 rounded-sm text-xs ${
//                   days.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-100'
//                 }`}
//               >
//                 {day}
//               </button>
//             ))}
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label className="block mb-1 font-semibold">Price</label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Instructor</label>
//             <input
//               type="text"
//               value={instructor}
//               onChange={(e) => setInstructor(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//         </div>
//         <div className="grid grid-cols-2 gap-2">
//           <div>
//             <label className="block mb-1 font-semibold">Session Capacity</label>
//             <input
//               type="number"
//               value={sessionCapacity}
//               onChange={(e) => setSessionCapacity(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Waiting Capacity</label>
//             <input
//               type="number"
//               value={waitingCapacity}
//               onChange={(e) => setWaitingCapacity(e.target.value)}
//               className="border border-gray-300 p-1 rounded w-full"
//             />
//           </div>
//         </div>
//         <div className="mt-4">
//           <button
//             onClick={handleCreateSession}
//             className="bg-green-500 text-white px-3 py-1 rounded-sm"
//           >
//             Create Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SessionCreatePage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const [course, setCourse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [price, setPrice] = useState('');
  const [instructor, setInstructor] = useState('');
  const [sessionCapacity, setSessionCapacity] = useState('');
  const [waitingCapacity, setWaitingCapacity] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDayToggle = (day: string) => {
    setDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };

  const handleCreateSession = () => {
    alert('Session created successfully!'); // Placeholder for session creation logic
  };

  return (
    <div className="p-4 mt-11">
      <div className="text-xs mb-2">
        <strong>Screen Size:</strong> {screenWidth} x {screenHeight}
      </div>
      <h1 className="text-lg font-bold mb-2">Create Session</h1>
      <div className="mb-2 space-x-2">
        <button onClick={() => navigate('/manage')} className="bg-gray-200 px-3 py-1 rounded-sm text-sm">Manage</button>
        <button onClick={() => navigate('/create')} className="bg-blue-500 text-white px-3 py-1 rounded-sm text-sm">Create</button>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <label className="block mb-1 font-semibold">Select Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border border-gray-300 p-1 rounded w-full"
          >
            <option value="">Select a course</option>
            <option value="Tennis Foundations">Tennis Foundations</option>
            <option value="Rally Ready">Rally Ready</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Date Range</label>
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 font-semibold">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Select Days</label>
          <div className="grid grid-cols-4 gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <button
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`border px-2 py-1 rounded-sm text-xs ${
                  days.includes(day) ? 'bg-blue-500 text-white' : 'bg-gray-100'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 font-semibold">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Instructor</label>
            <input
              type="text"
              value={instructor}
              onChange={(e) => setInstructor(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block mb-1 font-semibold">Session Capacity</label>
            <input
              type="number"
              value={sessionCapacity}
              onChange={(e) => setSessionCapacity(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Waiting Capacity</label>
            <input
              type="number"
              value={waitingCapacity}
              onChange={(e) => setWaitingCapacity(e.target.value)}
              className="border border-gray-300 p-1 rounded w-full"
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={handleCreateSession}
            className="bg-green-500 text-white px-3 py-1 rounded-sm"
          >
            Create Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCreatePage;
