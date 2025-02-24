// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { deleteSession, getAllSession } from '../../Services/SessionService';
// import { saveNotification } from '../../Services/NotificationService1';

// interface Session {
//   sessionNo: number;
//   class: string;
//   timeline: string;
//   timing: string;
//   days: string;
//   coaches: string;
//   location: string;
//   updatedOn: string;
//   fromDate:string;
//   toDate:string;
// }
// const userId: number = 0;
// const itemsPerPage = 5; // Number of sessions per page
// const initialSessions: Session[] = [];

// const SessionManagePage: React.FC = () => {
//   const [sessions, setSessions] = useState<Session[]>(initialSessions);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterOption, setFilterOption] = useState<'all' | 'past' | 'current'>('all');
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [notifyLoading, setNotifyLoading] = useState<boolean>(false);
//   const navigate = useNavigate();

//   const handleEdit = (sessionNo: number) => {
//     alert(`Edit session: ${sessionNo}`);
//     navigate(`/create/${sessionNo}`);
//   };

//   const handleDelete = async (sessionNo: number) => {
//     if (window.confirm(`Are you sure you want to delete session ${sessionNo}?`)) {
//       try {
//         const response = await deleteSession(sessionNo);
//         console.log(response);
//         setSessions(sessions.filter(session => session.sessionNo !== sessionNo));
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
//     navigate(`/studentdetails/${sessionNo}`);
//   };

//   const formatDateRange = (fromDate: string, toDate: string): string => {
//     const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
//     const from = new Date(fromDate.split('-').reverse().join('-'));
//     const to = new Date(toDate.split('-').reverse().join('-'));
//     const formattedFrom = new Intl.DateTimeFormat('en-US', options).format(from);
//     const formattedTo = new Intl.DateTimeFormat('en-US', options).format(to);
//     return `${formattedFrom} - ${formattedTo}`;
//   };

//   const isPastSession = (timeline: string): boolean => {
//     const today = new Date();
//     const sessionEndDate = new Date(timeline.split(' - ')[1].split('-').reverse().join('-'));
//     return sessionEndDate < today;
//   };

//   const filteredSessions = sessions.filter(session => {
//     const matchesSearchTerm = session.class.toLowerCase().includes(searchTerm.toLowerCase());
    
//     if (filterOption === 'all') {
//       return matchesSearchTerm;
//     }

//     if (filterOption === 'past') {
//       return matchesSearchTerm && isPastSession(session.timeline);
//     }

//     if (filterOption === 'current') {
//       return matchesSearchTerm && !isPastSession(session.timeline);
//     }

//     return matchesSearchTerm;
//   });

//   console.log("Filtered Sessions:", filteredSessions); // Debugging: Log filtered sessions

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSessions = filteredSessions.slice(indexOfFirstItem, indexOfLastItem);
//   console.log("Current Sessions:", currentSessions); // Debugging: Log current sessions

//   const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

//   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const fetchSession = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllSession(userId);
//       console.log("API Response:", response); // Debugging: Log the API response
//       if (response.data) {
//         const transformedSessions = response.data.map((item: any) => ({
//           sessionNo: item.id,
//           class: ` ${item.subCategory} (${item.category})`,
//           timeline: formatDateRange(item.fromDate, item.toDate),
//           timing: `${item.startTime} - ${item.endTime}`,
//           days: item.days.join(', '),
//           coaches: ` ${item.coachName}`,
//           location: ` ${item.locationName}`,
//           fromDate:`${item.fromDate}`,
//           toDate:`${item.toDate}`

//         }));
//         setSessions(transformedSessions);
//       }
//     } catch (error) {
//       console.error('Failed to fetch sessions:', error);
//       alert('Failed to fetch session data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSession();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
//         <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
//       </div>
//     );
//   }

//   ////////////////////////
//   const handleNotify = async (sessionId: number, fromDate: string, toDate: string) => {
//     setNotifyLoading(true); // Start loading
//     try {
//       // if(fromDate){
//       //   alert(fromDate + " " + toDate);
//       //   return;
//       // }

//       const response = await saveNotification(sessionId, fromDate, toDate);
//       console.log(response);
//       if (response.status === 'SUCCESS') {
//         alert('Notifications sent successfully!');
//       }
//     } catch (error) {
//       console.error('Notification error:', error);
//       alert('Failed to send notifications');
//     }finally {
//       setNotifyLoading(false); // Stop loading
//     }
    
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
//         <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
//       </div>
//     );
//   }


//   function openPopup(sessionNo: number): void {
//     throw new Error('Function not implemented.');
//   }

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded shadow min-h-screen mt-6">
//       <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
//         <h1 className="text-lg sm:text-2xl font-semibold">Sessions</h1>
//         <div className="flex gap-3">
//           <select
//             value={filterOption}
//             onChange={(e) => setFilterOption(e.target.value as 'all' | 'past' | 'current')}
//             className="px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
//           >
//             <option value="all">All</option>
//             <option value="past">Past</option>
//             <option value="current">Current</option>
//           </select>
//           <input
//             type="text"
//             placeholder="Search by class"
//             className="w-1/3 px-1 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
//             value={searchTerm}
//             onChange={e => {
//               setSearchTerm(e.target.value);
//               setCurrentPage(1);
//             }}
//           />
//         </div>
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
//               <th className="border border-gray-400 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentSessions.length > 0 ? (
//               currentSessions.map((session, index) => (
//                 <tr key={index} className="odd:bg-white even:bg-gray-100">
//                   <td className="border border-gray-400 p-2">{index + 1}</td>
//                   <td className="border border-gray-400 p-2">{session.class}</td>
//                   <td className="border border-gray-400 p-2">{session.timeline}</td>
//                   <td className="border border-gray-400 p-2">{session.timing}</td>
//                   <td className="border border-gray-400 p-2">{session.days}</td>
//                   <td className="border border-gray-400 p-2">{session.coaches}</td>
//                   <td className="border border-gray-400 p-2">{session.location}</td>
//                   <td className="border border-gray-400 p-2">
//                     <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
//                       {isPastSession(session.timeline) ? (
//                         // <button
//                         //   onClick={() => alert(`Notification for session: ${session.sessionNo}`)}
//                         //   className="bg-gray-300 px-3 py-1 rounded-md text-sm"
//                         // >
//                         // <button
//                         //   onClick={() => handleNotify(session.sessionNo, session.fromDate, session.toDate)}
//                         //   className={`bg-gray-300 px-3 py-1 rounded-md text-sm ${notifyLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         //   disabled={notifyLoading} // Disable button while loading
//                         // >
//                         //   {notifyLoading ? 'Sending...' : '🔔 Send for review'}
//                         // </button>

//                         <button
//                         onClick={() => openPopup(session.sessionNo)}
//                         className="bg-gray-300 px-3 py-1 rounded-md text-sm"
//                       >
//                         <span className="text-green-500">🔔</span> Send for review
//                       </button>

//                       ) : (
//                         <>
//                           <button
//                             onClick={() => handleEdit(session.sessionNo)}
//                             className="bg-yellow-400 px-3 py-1 rounded-md text-sm"
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(session.sessionNo)}
//                             className="bg-red-600 text-white px-3 py-1 rounded-md text-sm"
//                           >
//                             🗑️ Delete
//                           </button>
//                           <button
//                             onClick={() => handleManageParticipants(session.sessionNo)}
//                             className="bg-gray-300 px-3 py-1 rounded-md text-sm"
//                           >
//                             👥 Manage
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={8} className="text-center py-4">
//                   No sessions found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center mt-4">
//         <button 
//           onClick={() => paginate(currentPage - 1)} 
//           disabled={currentPage === 1} 
//           className="px-3 py-1 mx-1 bg-gray-300 rounded-md disabled:opacity-50"
//         >
//           ◀ Prev
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
import { saveNotification } from '../../Services/NotificationService1';

interface Session {
  sessionNo: number;
  class: string;
  timeline: string;
  timing: string;
  days: string;
  coaches: string;
  location: string;
  updatedOn: string;
  fromDate: string;
  toDate: string;
}

const userId: number = 0;
const itemsPerPage = 5; // Number of sessions per page
const initialSessions: Session[] = [];

const SessionManagePage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState<'all' | 'past' | 'current'>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [notifyLoading, setNotifyLoading] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
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

  const isPastSession = (timeline: string): boolean => {
    const today = new Date();
    const sessionEndDate = new Date(timeline.split(' - ')[1].split('-').reverse().join('-'));
    return sessionEndDate < today;
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearchTerm = session.class.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterOption === 'all') {
      return matchesSearchTerm;
    }

    if (filterOption === 'past') {
      return matchesSearchTerm && isPastSession(session.timeline);
    }

    if (filterOption === 'current') {
      return matchesSearchTerm && !isPastSession(session.timeline);
    }

    return matchesSearchTerm;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSessions = filteredSessions.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredSessions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await getAllSession(userId);
      console.log("API Response:", response);
      if (response.data) {
        const transformedSessions = response.data.map((item: any) => ({
          sessionNo: item.id,
          class: ` ${item.subCategory} (${item.category})`,
          timeline: formatDateRange(item.fromDate, item.toDate),
          timing: `${item.startTime} - ${item.endTime}`,
          days: item.days.join(', '),
          coaches: ` ${item.coachName}`,
          location: ` ${item.locationName}`,
          fromDate: `${item.fromDate}`,
          toDate: `${item.toDate}`,
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

  const handleNotify = async (sessionId: number, fromDate: string, toDate: string) => {
    setNotifyLoading(true); // Start loading
    try {
      const response = await saveNotification(sessionId, fromDate, toDate);
      console.log(response);
      if (response.status === 'SUCCESS') {
        alert('Notifications sent successfully!');
      }
    } catch (error) {
      console.error('Notification error:', error);
      alert('Failed to send notifications');
    } finally {
      setNotifyLoading(false); // Stop loading
    }
  };

  const openPopup = (sessionNo: number) => {
    setSelectedSession(sessionNo);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSession(null);
    setMessage('');
  };

  const handleSend = async () => {
    if (selectedSession !== null && message.trim()) {
      try {
        // Perform the notification sending logic here
        await handleNotify(selectedSession, sessions.find(s => s.sessionNo === selectedSession)?.fromDate || '', sessions.find(s => s.sessionNo === selectedSession)?.toDate || '');
        alert(`Message sent for session ${selectedSession}: ${message}`);
        closePopup();
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    } else {
      alert('Please enter a message.');
    }
  };

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
                      {isPastSession(session.timeline) ? (
                        <button
                          onClick={() => openPopup(session.sessionNo)}
                          className="bg-gray-300 px-3 py-1 rounded-md text-sm"
                        >
                          <span className="text-green-500">🔔</span> Send for review
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

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <h2 className="text-lg font-semibold mb-4">Send for Review</h2>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closePopup}
                className="bg-gray-300 px-4 py-2 rounded-md text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagePage;