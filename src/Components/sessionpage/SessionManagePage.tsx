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

const initialSessions: Session[] = [
  
];

const SessionManagePage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>(initialSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleEdit = (sessionNo: number) => {
    alert(`Edit session: ${sessionNo}`);
    navigate(`/create/${sessionNo}`);
  };

  const handleDelete = async (sessionNo: number) => {
    if (window.confirm(`Are you sure you want to delete session ${sessionNo}?`)) {
      try {
        // Call the delete service
        const response = await deleteSession(sessionNo);
        console.log(response); // Optional: Log the response for debugging
  
        // Update the state to reflect the deletion
        setSessions(sessions.filter(session => session.sessionNo !== sessionNo));
  
        // Notify the user of success
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
  
    navigate(`/studentdetails/${sessionNo}`); // Navigate to StudentDetails with sessionNo
  };

  const filteredSessions = sessions.filter(session =>
    session.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDateRange = (fromDate: string, toDate: string): string => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  
    const from = new Date(fromDate.split('-').reverse().join('-'));
    const to = new Date(toDate.split('-').reverse().join('-'));
  
    const formattedFrom = new Intl.DateTimeFormat('en-US', options).format(from);
    const formattedTo = new Intl.DateTimeFormat('en-US', options).format(to);
  
    return `${formattedFrom} - ${formattedTo}`;
  };
  

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await getAllSession();
      if (response.data) {
        const transformedSessions = response.data.map((item: any) => ({
          sessionNo: item.id,
          class: ` ${item.subCategory} (${item.category})`, // Adjust as per your course naming
          timeline: formatDateRange(item.fromDate, item.toDate),
          timing: `${item.startTime} - ${item.endTime}`,
          days: item.days.join(', '),
          coaches: ` ${item.coachName}`, // Replace with coach name if available
          location: ` ${item.locationName}`, // Replace with location name if available
          // updatedOn: new Date().toLocaleString(), // Use updated date if available
        }));
        setSessions(transformedSessions);
      }
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      alert('Failed to fetch session data. Please try again.');
    }
    finally {
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
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 bg-white rounded shadow min-h-screen mt-16">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-3">
        <h1 className="text-lg sm:text-2xl font-semibold">Sessions</h1>
        <input
          type="text"
          placeholder="Search by class"
          className="w-1/3 px-1 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
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
              {/* <th className="border border-gray-400 p-2">Updated on</th> */}
              <th className="border border-gray-400 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session, index) => (
              <tr key={index} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-400 p-2">{index+1}</td>
                <td className="border border-gray-400 p-2">{session.class}</td>
                <td className="border border-gray-400 p-2">{session.timeline}</td>
                <td className="border border-gray-400 p-2">{session.timing}</td>
                <td className="border border-gray-400 p-2">{session.days}</td>
                <td className="border border-gray-400 p-2">{session.coaches}</td>
                <td className="border border-gray-400 p-2">{session.location}</td>
                {/* <td className="border border-gray-400 p-2">{session.updatedOn}</td> */}
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