
// import { Button, Card, Modal, Table, Checkbox } from "@mantine/core";
// import { useState } from "react";

// const NotificationsPage = () => {
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
//   const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
//   const [selectedSession, setSelectedSession] = useState<string>("");
//   const [players, setPlayers] = useState<string[]>([]);
//   const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
//   const [sessionDetails, setSessionDetails] = useState<{
//     coach: string;
//     location: string;
//     startDate: string;
//     endDate: string;
//     days: string;
//   } | null>(null);
//   const [isSessionSelected, setIsSessionSelected] = useState<boolean>(false);

//   // Session options
//   const sessions = ["All", "Current Session", "Future Session"];

//   // Open session selection modal
//   const handleSessionClick = () => {
//     setIsSessionModalOpen(true);
//   };

//   // Handle session selection
//   const handleSessionSelect = (sessionType: string) => {
//     setSelectedSession(sessionType);
//     setIsSessionModalOpen(false); // Close session selection modal

//     if (sessionType === "All") {
//       return; // No need to show table for "All"
//     }

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
//     setIsTableModalOpen(true); // Open session details modal
//   };

//   // Fetch players dynamically
//   const fetchPlayersForSession = (sessionType: string) => {
//     const mockPlayers =
//       sessionType === "Future Session"
//         ? ["Future Player 1", "Future Player 2"]
//         : ["Current Player 1", "Current Player 2"];

//     setPlayers(mockPlayers);
//     setSelectedPlayers([]); // Reset selections
//   };

//   // Handle player selection
//   const handlePlayerSelection = (player: string) => {
//     setSelectedPlayers((prev) =>
//       prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
//     );
//   };

//   // Handle session row selection
//   const handleSessionSelection = () => {
//     setIsSessionSelected(!isSessionSelected);
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
//       <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: "#1e3a8a" }}>
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

//         <div className="flex flex-col gap-3">
//           <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue" onClick={() => setSelectedOption("all")}>
//             To All
//           </Button>

//           {/* Clicking opens session selection modal */}
//           <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green" onClick={handleSessionClick}>
//             Session Specific
//           </Button>

//           <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red">
//             User Specific
//           </Button>
//         </div>
//       </Card>

//       {/* Session Selection Modal */}
//       <Modal opened={isSessionModalOpen} onClose={() => setIsSessionModalOpen(false)} title="Select Session">
//         <div className="flex flex-col gap-3">
//           {sessions.map((session) => (
//             <Button key={session} variant="outline" onClick={() => handleSessionSelect(session)}>
//               {session}
//             </Button>
//           ))}
//         </div>
//       </Modal>

//       {/* Session Details Modal */}
//       <Modal opened={isTableModalOpen} onClose={() => setIsTableModalOpen(false)} title={`Session Details (${selectedSession})`}>
//         {sessionDetails && (
//           <>
//             <h3 className="text-lg font-semibold mb-2">Session Information</h3>
//             <Table striped highlightOnHover>
//               <thead>
//                 <tr>
//                   <th>Select</th>
//                   <th>Coach</th>
//                   <th>Location</th>
//                   <th>Start Date</th>
//                   <th>End Date</th>
//                   <th>Days</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <Checkbox checked={isSessionSelected} onChange={handleSessionSelection} />
//                   </td>
//                   <td>{sessionDetails.coach}</td>
//                   <td>{sessionDetails.location}</td>
//                   <td>{sessionDetails.startDate}</td>
//                   <td>{sessionDetails.endDate}</td>
//                   <td>{sessionDetails.days}</td>
//                 </tr>
//               </tbody>
//             </Table>

//             {/* Players Table With Selectable Rows */}
//             {players.length > 0 && (
//               <>
//                 <h3 className="text-lg font-semibold mt-4 mb-2">Players in Session</h3>
//                 <Table striped highlightOnHover>
//                   <thead>
//                     <tr>
//                       <th>Select</th>
//                       <th>Player Name</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {players.map((player, index) => (
//                       <tr key={index}>
//                         <td>
//                           <Checkbox
//                             checked={selectedPlayers.includes(player)}
//                             onChange={() => handlePlayerSelection(player)}
//                           />
//                         </td>
//                         <td>{player}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </Table>
//               </>
//             )}

//             {/* OK Button */}
//             <div className="flex justify-end mt-4">
//               <Button color="blue" onClick={() => setIsTableModalOpen(false)}>
//                 OK
//               </Button>
//             </div>
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
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [sessionDetails, setSessionDetails] = useState<{
    coach: string;
    location: string;
    startDate: string;
    endDate: string;
    days: string;
  } | null>(null);
  const [isSessionSelected, setIsSessionSelected] = useState<boolean>(false);

  const users = ["User 1", "User 2", "User 3", "User 4"];
  const sessions = ["All", "Current Session", "Future Session"];

  const handleSessionClick = () => setIsSessionModalOpen(true);
  const handleUserClick = () => setIsUserModalOpen(true);

  const handleSessionSelect = (sessionType: string) => {
    setSelectedSession(sessionType);
    setIsSessionModalOpen(false);

    if (sessionType === "All") return;

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
    setIsTableModalOpen(true);
  };

  const fetchPlayersForSession = (sessionType: string) => {
    const mockPlayers =
      sessionType === "Future Session"
        ? ["Future Player 1", "Future Player 2"]
        : ["Current Player 1", "Current Player 2"];

    setPlayers(mockPlayers);
    setSelectedPlayers([]);
  };

  const handlePlayerSelection = (player: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
    );
  };

  const handleUserSelection = (user: string) => {
    setSelectedUsers((prev) =>
      prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
    );
  };

  const handleSessionSelection = () => {
    setIsSessionSelected(!isSessionSelected);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
      <style>
        {`
          .custom-table {
            width: 100%;
            border-collapse: collapse;
          }
          .custom-table th {
            background-color: #f0f0f0;
            font-weight: bold;
            padding: 12px;
            text-align: left;
          }
          .custom-table td {
            padding: 12px;
            border: 1px solid #ddd;
          }
        `}
      </style>

      <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: "#1e3a8a" }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

        <div className="flex flex-col gap-3">
          <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue" onClick={() => setSelectedOption("all")}>
            To All
          </Button>

          <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green" onClick={handleSessionClick}>
            Session Specific
          </Button>

          <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red" onClick={handleUserClick}>
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

      {/* User Selection Modal */}
      <Modal opened={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} title="Select Users">
        <Table className="custom-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>User Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  <Checkbox checked={selectedUsers.includes(user)} onChange={() => handleUserSelection(user)} />
                </td>
                <td>{user}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="flex justify-end mt-4">
          <Button color="blue" onClick={() => setIsUserModalOpen(false)}>
            OK
          </Button>
        </div>
      </Modal>

      {/* Session Details Modal */}
      <Modal opened={isTableModalOpen} onClose={() => setIsTableModalOpen(false)} title={`Session Details (${selectedSession})`}>
        {sessionDetails && (
          <>
            <h3 className="text-lg font-semibold mb-2">Session Information</h3>
            <Table className="custom-table">
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

            {players.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">Players in Session</h3>
                <Table className="custom-table">
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
                          <Checkbox checked={selectedPlayers.includes(player)} onChange={() => handlePlayerSelection(player)} />
                        </td>
                        <td>{player}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}

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