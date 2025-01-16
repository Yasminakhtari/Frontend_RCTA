// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface Session {
//   sessionNo: number;
//   class: string;
//   timeline: string;
//   timing: string;
//   days: string;
//   coaches: string;
//   location: string;
//   // enrolled: string;
//   // waiting: string;
//   updatedOn: string;
// }

// const initialSessions: Session[] = [
//   {
//     sessionNo: 2,
//     class: 'Tennis Foundations',
//     timeline: 'Jan 6, 2025 - Mar 14, 2025',
//     timing: '18:00 - 20:00',
//     days: 'mon, tue, wed, thu, fri',
//     coaches: 'Rafael Carbungco',
//     location: 'College Park High School',
//     // enrolled: '0/25',
//     // waiting: '0/5',
//     updatedOn: 'Nov 17, 2024, 3:19 AM',
//   },
//   {
//     sessionNo: 1,
//     class: 'Rally Ready',
//     timeline: 'Dec 17, 2024 - Dec 27, 2024',
//     timing: '12:30 - 18:30',
//     days: 'mon',
//     coaches: 'Abinash Patri',
//     location: 'College Park High School',
//     // enrolled: '0/2',
//     // waiting: '0/2',
//     updatedOn: 'Dec 14, 2024, 9:29 PM',
//   },
//   {
//     sessionNo: 1,
//     class: 'Swing and Sweat',
//     timeline: 'Feb 1, 2025 - Feb 28, 2025',
//     timing: '10:00 - 13:00',
//     days: 'sat',
//     coaches: 'Rafael Carbungco',
//     location: 'College Park High School',
//     // enrolled: '0/20',
//     // waiting: '0/2',
//     updatedOn: 'Dec 14, 2024, 9:32 PM',
//   },
//   {
//     sessionNo: 1,
//     class: 'Game Mastery',
//     timeline: 'Feb 1, 2025 - Feb 28, 2025',
//     timing: '07:00 - 12:00',
//     days: 'wed, fri, sat, tue',
//     coaches: 'Rafael Carbungco',
//     location: 'College Park High School',
//     // enrolled: '0/20',
//     // waiting: '0/2',
//     updatedOn: 'Jan 13, 2025, 6:15 PM',
//   },
// ];

// const SessionManagePage: React.FC = () => {
//   const [sessions, setSessions] = useState<Session[]>(initialSessions);
//   const [searchTerm, setSearchTerm] = useState('');
//   const navigate = useNavigate();

//   const handleEdit = (sessionNo: number) => {
//     alert(`Edit session: ${sessionNo}`);
//   };

//   const handleDelete = (sessionNo: number) => {
//     if (window.confirm(`Are you sure you want to delete session ${sessionNo}?`)) {
//       setSessions(sessions.filter(session => session.sessionNo !== sessionNo));
//     }
//   };

//   const handleManageParticipants = (sessionNo: number) => {
//     alert(`Manage participants for session: ${sessionNo}`);
//   };

//   const filteredSessions = sessions.filter(session =>
//     session.class.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//    // <div className="p-6 w-2/4 max-w-screen-lg mx-auto min-h-screen mt-16">
//    <div className="w-5/6 mx-auto p-6 bg-white rounded shadow min-h-screen mt-16"> 
//       <div className="flex justify-between items-center mb-5">
//         <h1 className="text-xl sm:text-2xl font-semibold">Sessions</h1>
//         <input
//           type="text"
//           placeholder="Search by class"
//           className="border rounded-md px-3 py-2 text-sm sm:text-base"
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//         />
//       </div>
//       <div className="mb-5">
//         <button onClick={() => navigate('/manage')} className="bg-gray-300 px-4 sm:px-5 py-2 rounded-md mr-3 text-sm sm:text-base">Manage</button>
//         <button onClick={() => navigate('/create')} className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-md text-sm sm:text-base">Create</button>
//       </div>
//       <table className="w-full border-collapse border border-gray-400 text-sm sm:text-base">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-400 p-2">Session no.</th>
//             <th className="border border-gray-400 p-2">Class</th>
//             <th className="border border-gray-400 p-2">Timeline</th>
//             <th className="border border-gray-400 p-2">Timing</th>
//             <th className="border border-gray-400 p-2">Days</th>
//             <th className="border border-gray-400 p-2">Coaches</th>
//             <th className="border border-gray-400 p-2">Location</th>
//             {/* <th className="border border-gray-400 p-2">Enrolled</th>
//             <th className="border border-gray-400 p-2">Waiting</th> */}
//             <th className="border border-gray-400 p-2">Updated on</th>
//             <th className="border border-gray-400 p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredSessions.map((session, index) => (
//             <tr key={index} className="odd:bg-white even:bg-gray-100">
//               <td className="border border-gray-400 p-2">{session.sessionNo}</td>
//               <td className="border border-gray-400 p-2">{session.class}</td>
//               <td className="border border-gray-400 p-2">{session.timeline}</td>
//               <td className="border border-gray-400 p-2">{session.timing}</td>
//               <td className="border border-gray-400 p-2">{session.days}</td>
//               <td className="border border-gray-400 p-2">{session.coaches}</td>
//               <td className="border border-gray-400 p-2">{session.location}</td>
//               {/* <td className="border border-gray-400 p-2">{session.enrolled}</td>
//               <td className="border border-gray-400 p-2">{session.waiting}</td> */}
//               <td className="border border-gray-400 p-2">{session.updatedOn}</td>
//               <td className="border border-gray-400 p-2">
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleEdit(session.sessionNo)}
//                     className="bg-yellow-400 px-3 py-1 rounded-md text-sm"
//                   >
//                     ✏️ Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(session.sessionNo)}
//                     className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                   >
//                     🗑️ Delete
//                   </button>
//                   <button
//                     onClick={() => handleManageParticipants(session.sessionNo)}
//                     className="bg-gray-300 px-3 py-1 rounded-md text-sm"
//                   >
//                     👥 Manage
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SessionManagePage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Session {
  sessionNo: number;
  class: string;
  timeline: string;
  timing: string;
  days: string;
  coaches: string;
  location: string;
  updatedOn: string;
}

const initialSessions: Session[] = [
  {
    sessionNo: 2,
    class: 'Tennis Foundations',
    timeline: 'Jan 6, 2025 - Mar 14, 2025',
    timing: '18:00 - 20:00',
    days: 'mon, tue, wed, thu, fri',
    coaches: 'Rafael Carbungco',
    location: 'College Park High School',
    updatedOn: 'Nov 17, 2024, 3:19 AM',
  },
  {
    sessionNo: 1,
    class: 'Rally Ready',
    timeline: 'Dec 17, 2024 - Dec 27, 2024',
    timing: '12:30 - 18:30',
    days: 'mon',
    coaches: 'Abinash Patri',
    location: 'College Park High School',
    updatedOn: 'Dec 14, 2024, 9:29 PM',
  },
  {
    sessionNo: 1,
    class: 'Swing and Sweat',
    timeline: 'Feb 1, 2025 - Feb 28, 2025',
    timing: '10:00 - 13:00',
    days: 'sat',
    coaches: 'Rafael Carbungco',
    location: 'College Park High School',
    updatedOn: 'Dec 14, 2024, 9:32 PM',
  },
  {
    sessionNo: 1,
    class: 'Game Mastery',
    timeline: 'Feb 1, 2025 - Feb 28, 2025',
    timing: '07:00 - 12:00',
    days: 'wed, fri, sat, tue',
    coaches: 'Rafael Carbungco',
    location: 'College Park High School',
    updatedOn: 'Jan 13, 2025, 6:15 PM',
  },
];

const SessionManagePage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleEdit = (sessionNo: number) => {
    alert(`Edit session: ${sessionNo}`);
  };

  const handleDelete = (sessionNo: number) => {
    if (window.confirm(`Are you sure you want to delete session ${sessionNo}?`)) {
      setSessions(sessions.filter(session => session.sessionNo !== sessionNo));
    }
  };

  const handleManageParticipants = (sessionNo: number) => {
    alert(`Manage participants for session: ${sessionNo}`);
  };

  const filteredSessions = sessions.filter(session =>
    session.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded shadow min-h-screen mt-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h1 className="text-lg sm:text-2xl font-semibold">Sessions</h1>
        <input
          type="text"
          placeholder="Search by class"
          className="border rounded-md px-3 py-2 text-sm sm:text-base w-full sm:w-auto"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="mb-5 flex flex-col sm:flex-row gap-2">
        <button onClick={() => navigate('/manage')} className="bg-gray-300 px-4 py-2 rounded-md text-sm sm:text-base">Manage</button>
        <button onClick={() => navigate('/create')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base">Create</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2">Session no.</th>
              <th className="border border-gray-400 p-2">Class</th>
              <th className="border border-gray-400 p-2">Timeline</th>
              <th className="border border-gray-400 p-2">Timing</th>
              <th className="border border-gray-400 p-2">Days</th>
              <th className="border border-gray-400 p-2">Coaches</th>
              <th className="border border-gray-400 p-2">Location</th>
              <th className="border border-gray-400 p-2">Updated on</th>
              <th className="border border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-400 p-2">{session.sessionNo}</td>
                <td className="border border-gray-400 p-2">{session.class}</td>
                <td className="border border-gray-400 p-2">{session.timeline}</td>
                <td className="border border-gray-400 p-2">{session.timing}</td>
                <td className="border border-gray-400 p-2">{session.days}</td>
                <td className="border border-gray-400 p-2">{session.coaches}</td>
                <td className="border border-gray-400 p-2">{session.location}</td>
                <td className="border border-gray-400 p-2">{session.updatedOn}</td>
                <td className="border border-gray-400 p-2">
                  <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleEdit(session.sessionNo)}
                      className="bg-yellow-400 px-3 py-1 rounded-md text-sm"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(session.sessionNo)}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      🗑️ Delete
                    </button>
                    <button
                      onClick={() => handleManageParticipants(session.sessionNo)}
                      className="bg-gray-300 px-3 py-1 rounded-md text-sm"
                    >
                      👥 Manage
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SessionManagePage;