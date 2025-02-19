// import { Button, Card, Modal, Textarea } from "@mantine/core";
// import { useState } from "react";

// const NotificationsPage = () => {
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [sessions] = useState<string[]>(["All", "current Session", "Future Session"]);
//   const [users] = useState<string[]>(["User A", "User B", "User C"]);
//   const [selectedSession, setSelectedSession] = useState<string>("");
//   const [selectedUser, setSelectedUser] = useState<string>("");

//   const handleSendClick = () => {
//     let target = selectedOption === "session" ? `Session: ${selectedSession}` 
//                 : selectedOption === "user" ? `User: ${selectedUser}` 
//                 : "All users";

//     console.log(`Notification sent to ${target}:\n${description}`);
//     alert(`Notification sent to ${target}:\n${description}`);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
//       <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: '#1e3a8a' }}>
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

//         <div className="flex flex-col gap-3">
//           <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue"
//             onClick={() => setSelectedOption("all")}>To All</Button>

//           <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green"
//             onClick={() => { setSelectedOption("session"); setIsModalOpen(true); }}>
//             Session Specific
//           </Button>

//           <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red"
//             onClick={() => { setSelectedOption("user"); setIsModalOpen(true); }}>
//             User Specific
//           </Button>
//         </div>

//         {selectedOption && (
//           <div className="mt-6 flex flex-col items-center">
//             <label className="block text-sm font-medium mb-2 text-white">Description</label>
//             <Textarea placeholder="Enter notification message..."
//               value={description} onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />

//             <Button className="mt-4 w-1/2 bg-green-700 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition"
//               onClick={handleSendClick}>
//               Send
//             </Button>
//           </div>
//         )}
//       </Card>

//       {/* Modal for selecting session or user */}
//       <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedOption === "session" ? "Select Session" : "Select User"}>
//         <div className="flex flex-col gap-3">
//           {(selectedOption === "session" ? sessions : users).map((item) => (
//             <Button key={item} variant="outline" onClick={() => {
//               selectedOption === "session" ? setSelectedSession(item) : setSelectedUser(item);
//               setIsModalOpen(false);
//             }}>
//               {item}
//             </Button>
//           ))}
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default NotificationsPage;


// import { Button, Card, Modal, Textarea, Checkbox, Table } from "@mantine/core";
// import { useState } from "react";

// const NotificationsPage = () => {
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [description, setDescription] = useState<string>("");
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
//   const [sessions] = useState<string[]>(["All", "Current Session", "Future Session"]);
//   const [users] = useState<string[]>(["User A", "User B", "User C"]);
//   const [selectedSession, setSelectedSession] = useState<string>("");
//   const [selectedUser, setSelectedUser] = useState<string>("");
//   const [players, setPlayers] = useState<string[]>([]);
//   const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
//   const [sessionDetails, setSessionDetails] = useState<{
//     coach: string;
//     location: string;
//     startDate: string;
//     endDate: string;
//     days: string;
//   } | null>(null);

//   // Fetch session details and open new table modal
//   const fetchSessionDetails = (sessionType: string) => {
//     const details =
//       sessionType === "Future Session"
//         ? {
//             coach: "Jane Doe",
//             location: "Stadium B",
//             startDate: "2025-07-01",
//             endDate: "2025-09-30",
//             days: "Tuesday, Thursday, Saturday",
//           }
//         : {
//             coach: "John Doe",
//             location: "Stadium A",
//             startDate: "2025-03-01",
//             endDate: "2025-06-30",
//             days: "Monday, Wednesday, Friday",
//           };

//     setSessionDetails(details);
//     fetchPlayersForSession(sessionType);
//     setIsTableModalOpen(true); // Open new modal for session details
//   };

//   // Fetch players dynamically for selected session
//   const fetchPlayersForSession = (sessionType: string) => {
//     const mockPlayers =
//       sessionType === "Future Session"
//         ? ["Future Player 1", "Future Player 2"]
//         : ["Current Player 1", "Current Player 2"];

//     setPlayers(mockPlayers);
//   };

//   // Handle player selection
//   const handlePlayerSelection = (player: string) => {
//     setSelectedPlayers((prev) =>
//       prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
//     );
//   };

//   // Handle sending notification
//   const handleSendClick = () => {
//     let target = selectedOption === "session" ? `Session: ${selectedSession}` 
//                 : selectedOption === "user" ? `User: ${selectedUser}` 
//                 : "All users";

//     if (selectedOption === "session" && selectedPlayers.length > 0) {
//       target += `\nPlayers: ${selectedPlayers.join(', ')}`;
//     }

//     console.log(`Notification sent to ${target}:\n${description}`);
//     alert(`Notification sent to ${target}:\n${description}`);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
//       <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: '#1e3a8a' }}>
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

//         <div className="flex flex-col gap-3">
//           <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue"
//             onClick={() => setSelectedOption("all")}>To All</Button>

//           <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green"
//             onClick={() => { setSelectedOption("session"); setIsModalOpen(true); }}>
//             Session Specific
//           </Button>

//           <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red"
//             onClick={() => { setSelectedOption("user"); setIsModalOpen(true); }}>
//             User Specific
//           </Button>
//         </div>

//         {selectedOption && (
//           <div className="mt-6 flex flex-col items-center">
//             <label className="block text-sm font-medium mb-2 text-white">Description</label>
//             <Textarea placeholder="Enter notification message..."
//               value={description} onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />

//             <Button className="mt-4 w-1/2 bg-green-700 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition"
//               onClick={handleSendClick}>
//               Send
//             </Button>
//           </div>
//         )}
//       </Card>

//       {/* Modal for selecting session or user */}
//       <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedOption === "session" ? "Select Session" : "Select User"}>
//         <div className="flex flex-col gap-3">
//           {selectedOption === "session" ? (
//             sessions.map((session) => (
//               <Button key={session} variant="outline" onClick={() => {
//                 setSelectedSession(session);
//                 fetchSessionDetails(session);
//               }}>
//                 {session}
//               </Button>
//             ))
//           ) : (
//             users.map((user) => (
//               <Button key={user} variant="outline" onClick={() => {
//                 setSelectedUser(user);
//                 setIsModalOpen(false);
//               }}>
//                 {user}
//               </Button>
//             ))
//           )}
//         </div>
//       </Modal>

//       {/* Second modal to display session details in a table */}
//       <Modal opened={isTableModalOpen} onClose={() => setIsTableModalOpen(false)} title="Session Details">
//         {sessionDetails && (
//           <>
//             <Table striped highlightOnHover className="mt-4">
//               <thead>
//                 <tr>
//                   <th>Coach</th>
//                   <th>Location</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Days</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>{sessionDetails.coach}</td>
//                   <td>{sessionDetails.location}</td>
//                   <td>{sessionDetails.startDate}</td>
//                   <td>{sessionDetails.endDate}</td>
//                   <td>{sessionDetails.days}</td>
//                 </tr>
//               </tbody>
//             </Table>

//             {/* Display players selection */}
//             {players.length > 0 && (
//               <div className="mt-4">
//                 <h3 className="text-lg font-semibold">Players in {selectedSession}</h3>
//                 <ul className="list-disc list-inside">
//                   {players.map((player, index) => (
//                     <li key={index} className="flex items-center gap-2">
//                       <Checkbox
//                         checked={selectedPlayers.includes(player)}
//                         onChange={() => handlePlayerSelection(player)}
//                       />
//                       {player}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default NotificationsPage;

import { Button, Card, Modal, Table, Checkbox } from "@mantine/core";
import { useState } from "react";

const NotificationsPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [sessionDetails, setSessionDetails] = useState<{
    coach: string;
    location: string;
    startDate: string;
    endDate: string;
    days: string;
  } | null>(null);
  const [isSessionSelected, setIsSessionSelected] = useState<boolean>(false);

  // Session options
  const sessions = ["All", "Current Session", "Future Session"];

  // Open session selection modal
  const handleSessionClick = () => {
    setIsSessionModalOpen(true);
  };

  // Handle session selection
  const handleSessionSelect = (sessionType: string) => {
    setSelectedSession(sessionType);
    setIsSessionModalOpen(false); // Close session selection modal

    if (sessionType === "All") {
      return; // No need to show table for "All"
    }

    const details =
      sessionType === "Future Session"
        ? {
            coach: "Jane Doe",
            location: "Stadium B",
            startDate: "2025-07-01",
            endDate: "2025-09-30",
            days: "Tuesday, Thursday, Saturday",
          }
        : {
            coach: "John Doe",
            location: "Stadium A",
            startDate: "2025-03-01",
            endDate: "2025-06-30",
            days: "Monday, Wednesday, Friday",
          };

    setSessionDetails(details);
    fetchPlayersForSession(sessionType);
    setIsTableModalOpen(true); // Open session details modal
  };

  // Fetch players dynamically
  const fetchPlayersForSession = (sessionType: string) => {
    const mockPlayers =
      sessionType === "Future Session"
        ? ["Future Player 1", "Future Player 2"]
        : ["Current Player 1", "Current Player 2"];

    setPlayers(mockPlayers);
    setSelectedPlayers([]); // Reset selections
  };

  // Handle player selection
  const handlePlayerSelection = (player: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
    );
  };

  // Handle session row selection
  const handleSessionSelection = () => {
    setIsSessionSelected(!isSessionSelected);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
      <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: "#1e3a8a" }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

        <div className="flex flex-col gap-3">
          <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue" onClick={() => setSelectedOption("all")}>
            To All
          </Button>

          {/* Clicking opens session selection modal */}
          <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green" onClick={handleSessionClick}>
            Session Specific
          </Button>

          <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red">
            User Specific
          </Button>
        </div>
      </Card>

      {/* Session Selection Modal */}
      <Modal opened={isSessionModalOpen} onClose={() => setIsSessionModalOpen(false)} title="Select Session">
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <Button key={session} variant="outline" onClick={() => handleSessionSelect(session)}>
              {session}
            </Button>
          ))}
        </div>
      </Modal>

      {/* Session Details Modal */}
      <Modal opened={isTableModalOpen} onClose={() => setIsTableModalOpen(false)} title={`Session Details (${selectedSession})`}>
        {sessionDetails && (
          <>
            <h3 className="text-lg font-semibold mb-2">Session Information</h3>
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Coach</th>
                  <th>Location</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Checkbox checked={isSessionSelected} onChange={handleSessionSelection} />
                  </td>
                  <td>{sessionDetails.coach}</td>
                  <td>{sessionDetails.location}</td>
                  <td>{sessionDetails.startDate}</td>
                  <td>{sessionDetails.endDate}</td>
                  <td>{sessionDetails.days}</td>
                </tr>
              </tbody>
            </Table>

            {/* Players Table With Selectable Rows */}
            {players.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">Players in Session</h3>
                <Table striped highlightOnHover>
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Player Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {players.map((player, index) => (
                      <tr key={index}>
                        <td>
                          <Checkbox
                            checked={selectedPlayers.includes(player)}
                            onChange={() => handlePlayerSelection(player)}
                          />
                        </td>
                        <td>{player}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}

            {/* OK Button */}
            <div className="flex justify-end mt-4">
              <Button color="blue" onClick={() => setIsTableModalOpen(false)}>
                OK
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NotificationsPage;

