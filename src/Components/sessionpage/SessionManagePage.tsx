// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { deleteSession, getAllSession } from '../../Services/SessionService';

// interface Session {
//   sessionNo: number;
//   class: string;
//   timeline: string;
//   timing: string;
//   days: string;
//   coaches: string;
//   location: string;
//   updatedOn: string;
// }
// const userId:number=0;
// const itemsPerPage = 5; // Number of sessions per page
// const initialSessions: Session[] = [
  
// ];

// const SessionManagePage: React.FC = () => {
//   const [sessions, setSessions] = useState<Session[]>(initialSessions);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const navigate = useNavigate();

//   const handleEdit = (sessionNo: number) => {
//     alert(`Edit session: ${sessionNo}`);
//     navigate(`/create/${sessionNo}`);
//   };

//   const handleDelete = async (sessionNo: number) => {
//     if (window.confirm(`Are you sure you want to delete session ${sessionNo}?`)) {
//       try {
//         // Call the delete service
//         const response = await deleteSession(sessionNo);
//         console.log(response); // Optional: Log the response for debugging
  
//         // Update the state to reflect the deletion
//         setSessions(sessions.filter(session => session.sessionNo !== sessionNo));
  
//         // Notify the user of success
//         alert(`Session ${sessionNo} deleted successfully.`);
//         fetchSession();
//       } catch (error) {
//         console.error("Error deleting session:", error);
//         alert(`Failed to delete session ${sessionNo}. Please try again later.`);
//       }
//     }
//   };
  

//   const handleManageParticipants = (sessionNo: number) => {
//     alert(`Manage participants for session: ${sessionNo}`);
  
//     navigate(`/studentdetails/${sessionNo}`); // Navigate to StudentDetails with sessionNo
//   };

//   const filteredSessions = sessions.filter(session =>
//     session.class.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const formatDateRange = (fromDate: string, toDate: string): string => {
//     const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  
//     const from = new Date(fromDate.split('-').reverse().join('-'));
//     const to = new Date(toDate.split('-').reverse().join('-'));
  
//     const formattedFrom = new Intl.DateTimeFormat('en-US', options).format(from);
//     const formattedTo = new Intl.DateTimeFormat('en-US', options).format(to);
  
//     return `${formattedFrom} - ${formattedTo}`;
//   };
  
//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSessions = filteredSessions.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const fetchSession = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllSession(userId);
//       if (response.data) {
//         const transformedSessions = response.data.map((item: any) => ({
//           sessionNo: item.id,
//           class: ` ${item.subCategory} (${item.category})`, // Adjust as per your course naming
//           timeline: formatDateRange(item.fromDate, item.toDate),
//           timing: `${item.startTime} - ${item.endTime}`,
//           days: item.days.join(', '),
//           coaches: ` ${item.coachName}`, // Replace with coach name if available
//           location: ` ${item.locationName}`, // Replace with location name if available
//           // updatedOn: new Date().toLocaleString(), // Use updated date if available
//         }));
//         setSessions(transformedSessions);
//       }
//     } catch (error) {
//       console.error('Failed to fetch sessions:', error);
//       alert('Failed to fetch session data. Please try again.');
//     }
//     finally {
//       setLoading(false);
//     }
//   };


//    useEffect(() => {
//       fetchSession();
//     }, []);
    
//     if (loading) {
//       return (
//         <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
//           <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
//         </div>
//       );
//     }
//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded shadow min-h-screen mt-6">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
//         <h1 className="text-lg sm:text-2xl font-semibold">Sessions</h1>
//         <input
//           type="text"
//           placeholder="Search by class"
//           className="w-1/3 px-1 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
//           value={searchTerm}
//           //onChange={e => setSearchTerm(e.target.value)}
//           onChange={e => {
//             setSearchTerm(e.target.value);
//             setCurrentPage(1); // Reset to first page when searching
//           }}
//         />
//       </div>
//       <div className="mb-5 flex flex-col sm:flex-row gap-2">
//         <button onClick={() => navigate('/manage')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base">Manage</button>
//         <button onClick={() => navigate('/create')} className="bg-gray-300 px-4 py-2 rounded-md text-sm sm:text-base">Create</button>
//       </div>
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead className="bg-blue-600 text-white"> 
//             <tr>
//               <th className="border border-gray-400 p-2">Session#</th>
//               <th className="border border-gray-400 p-2">Class</th>
//               <th className="border border-gray-400 p-2">Timeline</th>
//               <th className="border border-gray-400 p-2">Timing</th>
//               <th className="border border-gray-400 p-2">Days</th>
//               <th className="border border-gray-400 p-2">Coach</th>
//               <th className="border border-gray-400 p-2">Location</th>
//               {/* <th className="border border-gray-400 p-2">Updated on</th> */}
//               <th className="border border-gray-400 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredSessions.map((session, index) => (
//               <tr key={index} className="odd:bg-white even:bg-gray-100">
//                 <td className="border border-gray-400 p-2">{index+1}</td>
//                 <td className="border border-gray-400 p-2">{session.class}</td>
//                 <td className="border border-gray-400 p-2">{session.timeline}</td>
//                 <td className="border border-gray-400 p-2">{session.timing}</td>
//                 <td className="border border-gray-400 p-2">{session.days}</td>
//                 <td className="border border-gray-400 p-2">{session.coaches}</td>
//                 <td className="border border-gray-400 p-2">{session.location}</td>
//                 {/* <td className="border border-gray-400 p-2">{session.updatedOn}</td> */}
//                 <td className="border border-gray-400 p-2">
//                   <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
//                     <button
//                       onClick={() => handleEdit(session.sessionNo)}
//                       className="bg-yellow-400 px-3 py-1 rounded-md text-sm"
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(session.sessionNo)}
//                       className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       🗑️ Delete
//                     </button>
//                     <button
//                       onClick={() => handleManageParticipants(session.sessionNo)}
//                       className="bg-gray-300 px-3 py-1 rounded-md text-sm"
//                     >
//                       👥 Manage
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <button 
//           onClick={() => paginate(currentPage - 1)} 
//           disabled={currentPage === 1} 
//           className="px-3 py-1 mx-1 bg-gray-300 rounded-md disabled:opacity-50"
//         >
//           ◀ Previous
//         </button>
//         <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
//         <button 
//           onClick={() => paginate(currentPage + 1)} 
//           disabled={currentPage === totalPages} 
//           className="px-3 py-1 mx-1 bg-gray-300 rounded-md disabled:opacity-50"
//         >
//           Next ▶
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SessionManagePage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteSession, getAllSession } from '../../Services/SessionService';

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
const userId: number = 1;
const itemsPerPage = 5; // Number of sessions per page
const initialSessions: Session[] = [];

const SessionManagePage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState<'all' | 'past' | 'current'>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleEdit = (sessionNo: number) => {
    alert(`Edit session: ${sessionNo}`);
    navigate(`/create/${sessionNo}`);
  };

  const handleDelete = async (sessionNo: number) => {
    if (window.confirm(`Are you sure you want to delete session ${sessionNo}?`)) {
      try {
        const response = await deleteSession(sessionNo);
        console.log(response);
        setSessions(sessions.filter(session => session.sessionNo !== sessionNo));
        alert(`Session ${sessionNo} deleted successfully.`);
        fetchSession();
      } catch (error) {
        console.error("Error deleting session:", error);
        alert(`Failed to delete session ${sessionNo}. Please try again later.`);
      }
    }
  };

  const handleManageParticipants = (sessionNo: number) => {
    alert(`Manage participants for session: ${sessionNo}`);
    navigate(`/studentdetails/${sessionNo}`);
  };

  const formatDateRange = (fromDate: string, toDate: string): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    const from = new Date(fromDate.split('-').reverse().join('-'));
    const to = new Date(toDate.split('-').reverse().join('-'));
    const formattedFrom = new Intl.DateTimeFormat('en-US', options).format(from);
    const formattedTo = new Intl.DateTimeFormat('en-US', options).format(to);
    return `${formattedFrom} - ${formattedTo}`;
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearchTerm = session.class.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOption === 'all') {
      return matchesSearchTerm;
    }

    const today = new Date();
    const sessionEndDate = new Date(session.timeline.split(' - ')[1].split('-').reverse().join('-'));

    if (filterOption === 'past') {
      return matchesSearchTerm && sessionEndDate < today;
    }

    if (filterOption === 'current') {
      return matchesSearchTerm && sessionEndDate >= today;
    }

    return matchesSearchTerm;
  });

  console.log("Filtered Sessions:", filteredSessions); // Debugging: Log filtered sessions

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSessions = filteredSessions.slice(indexOfFirstItem, indexOfLastItem);
  console.log("Current Sessions:", currentSessions); // Debugging: Log current sessions

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await getAllSession(userId);
      console.log("API Response:", response); // Debugging: Log the API response
      if (response.data) {
        const transformedSessions = response.data.map((item: any) => ({
          sessionNo: item.id,
          class: ` ${item.subCategory} (${item.category})`,
          timeline: formatDateRange(item.fromDate, item.toDate),
          timing: `${item.startTime} - ${item.endTime}`,
          days: item.days.join(', '),
          coaches: ` ${item.coachName}`,
          location: ` ${item.locationName}`,
        }));
        setSessions(transformedSessions);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      alert('Failed to fetch session data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded shadow min-h-screen mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h1 className="text-lg sm:text-2xl font-semibold">Sessions</h1>
        <div className="flex gap-3">
          <select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value as 'all' | 'past' | 'current')}
            className="px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="all">All</option>
            <option value="past">Past</option>
            <option value="current">Current</option>
          </select>
          <input
            type="text"
            placeholder="Search by class"
            className="w-1/3 px-1 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="mb-5 flex flex-col sm:flex-row gap-2">
        <button onClick={() => navigate('/manage')} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm sm:text-base">Manage</button>
        <button onClick={() => navigate('/create')} className="bg-gray-300 px-4 py-2 rounded-md text-sm sm:text-base">Create</button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white"> 
            <tr>
              <th className="border border-gray-400 p-2">Session#</th>
              <th className="border border-gray-400 p-2">Class</th>
              <th className="border border-gray-400 p-2">Timeline</th>
              <th className="border border-gray-400 p-2">Timing</th>
              <th className="border border-gray-400 p-2">Days</th>
              <th className="border border-gray-400 p-2">Coach</th>
              <th className="border border-gray-400 p-2">Location</th>
              <th className="border border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentSessions.length > 0 ? (
              currentSessions.map((session, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-400 p-2">{index + 1}</td>
                  <td className="border border-gray-400 p-2">{session.class}</td>
                  <td className="border border-gray-400 p-2">{session.timeline}</td>
                  <td className="border border-gray-400 p-2">{session.timing}</td>
                  <td className="border border-gray-400 p-2">{session.days}</td>
                  <td className="border border-gray-400 p-2">{session.coaches}</td>
                  <td className="border border-gray-400 p-2">{session.location}</td>
                  <td className="border border-gray-400 p-2">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      {filterOption === 'past' ? (
                        <button
                          onClick={() => alert(`Notification for session: ${session.sessionNo}`)}
                          className="bg-gray-300 px-3 py-1 rounded-md text-sm"
                        >
                          🔔 Notify
                        </button>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  No sessions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="px-3 py-1 mx-1 bg-gray-300 rounded-md disabled:opacity-50"
        >
          ◀ Prev
        </button>
        <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="px-3 py-1 mx-1 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default SessionManagePage;