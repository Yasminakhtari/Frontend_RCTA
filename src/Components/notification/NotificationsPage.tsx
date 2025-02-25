// import { Button, Card, Modal, Table, Checkbox, Textarea } from "@mantine/core";
// import { useState } from "react";

// const NotificationsPage = () => {
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
//   const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
//   const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
//   const [isAllModalOpen, setIsAllModalOpen] = useState<boolean>(false);
//   const [selectedSession, setSelectedSession] = useState<string>("");
//   const [players, setPlayers] = useState<string[]>([]);
//   const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
//   const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
//   const [message, setMessage] = useState<string>(""); // Message state for all
//   const [userMessage, setUserMessage] = useState<string>(""); // Message state for user-specific
//   const [sessionMessage, setSessionMessage] = useState<string>(""); // Message state for session-specific
//   const [sessionDetails, setSessionDetails] = useState<{
//     coach: string;
//     location: string;
//     startDate: string;
//     endDate: string;
//     days: string;
//   } | null>(null);
//   const [isSessionSelected, setIsSessionSelected] = useState<boolean>(false);

//   const users = ["User 1", "User 2", "User 3", "User 4"];
//   const sessions = ["All", "Current Session", "Future Session"];

//   const handleSessionClick = () => setIsSessionModalOpen(true);
//   const handleUserClick = () => setIsUserModalOpen(true);
//   const handleAllClick = () => setIsAllModalOpen(true);

//   const handleSessionSelect = (sessionType: string) => {
//     setSelectedSession(sessionType);
//     setIsSessionModalOpen(false);

//     if (sessionType === "All") return;

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
//     setIsTableModalOpen(true);
//   };

//   const fetchPlayersForSession = (sessionType: string) => {
//     const mockPlayers =
//       sessionType === "Future Session"
//         ? ["Future Player 1", "Future Player 2"]
//         : ["Current Player 1", "Current Player 2"];

//     setPlayers(mockPlayers);
//     setSelectedPlayers([]);
//   };

//   const handlePlayerSelection = (player: string) => {
//     setSelectedPlayers((prev) =>
//       prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
//     );
//   };

//   const handleUserSelection = (user: string) => {
//     setSelectedUsers((prev) =>
//       prev.includes(user) ? prev.filter((u) => u !== user) : [...prev, user]
//     );
//   };

//   const handleSessionSelection = () => {
//     setIsSessionSelected(!isSessionSelected);
//   };

//   const isAllMessageValid = message.trim() !== "";
//   const isUserMessageValid = userMessage.trim() !== "" && selectedUsers.length > 0;
//   const isSessionMessageValid = sessionMessage.trim() !== "" && (isSessionSelected || selectedPlayers.length > 0);

//   // Handle sending notifications
//   const handleSendNotificationToAll = () => {
//     console.log("Sending notification to all users:", message);
//     setIsAllModalOpen(false);
//     setMessage(""); // Clear the message field
//   };

//   const handleSendNotificationToUsers = () => {
//     console.log("Sending notification to selected users:", selectedUsers, userMessage);
//     setIsUserModalOpen(false);
//     setUserMessage(""); // Clear the message field
//     setSelectedUsers([]); // Clear selected users
//   };

//   const handleSendNotificationToSession = () => {
//     console.log("Sending notification to session:", selectedSession, sessionMessage);
//     console.log("Selected Players:", selectedPlayers);
//     console.log("Is Session Selected:", isSessionSelected);
//     setIsTableModalOpen(false);
//     setSessionMessage(""); // Clear the message field
//     setSelectedPlayers([]); // Clear selected players
//     setIsSessionSelected(false); // Reset session selection
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
//       <style>
//         {`
//           .custom-table {
//             width: 100%;
//             border-collapse: collapse;
//           }
//           .custom-table th {
//             background-color: #f0f0f0;
//             font-weight: bold;
//             padding: 12px;
//             text-align: left;
//           }
//           .custom-table td {
//             padding: 12px;
//             border: 1px solid #ddd;
//           }
//         `}
//       </style>

//       <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: "#1e3a8a" }}>
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

//         <div className="flex flex-col gap-3">
//           <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue" onClick={handleAllClick}>
//             To All
//           </Button>

//           <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green" onClick={handleSessionClick}>
//             Session Specific
//           </Button>

//           <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red" onClick={handleUserClick}>
//             User Specific
//           </Button>
//         </div>
//       </Card>

//       {/* Modal for "To All" Option */}
//       <Modal opened={isAllModalOpen} onClose={() => setIsAllModalOpen(false)} title="Send Notification to All Users">
//         <Textarea
//           placeholder="Enter message for all users"
//           value={message}
//           onChange={(e) => setMessage(e.currentTarget.value)}
//           required
//           autosize
//           minRows={3}
//         />

//         <div className="flex justify-end mt-4">
//           <Button color="blue" disabled={!isAllMessageValid} onClick={handleSendNotificationToAll}>
//             Send Notification
//           </Button>
//         </div>
//       </Modal>

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

//       {/* User Selection Modal */}
//       <Modal opened={isUserModalOpen} onClose={() => setIsUserModalOpen(false)} title="Select Users">
//         <Table className="custom-table">
//           <thead>
//             <tr>
//               <th>Select</th>
//               <th>User Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <tr key={index}>
//                 <td>
//                   <Checkbox checked={selectedUsers.includes(user)} onChange={() => handleUserSelection(user)} />
//                 </td>
//                 <td>{user}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         {/* Message Field for User Specific */}
//         <h3 className="text-lg font-semibold mt-4 mb-2">Enter Message</h3>
//         <Textarea
//           placeholder="Type your message here..."
//           value={userMessage}
//           onChange={(e) => setUserMessage(e.currentTarget.value)}
//           required
//           autosize
//           minRows={3}
//         />

//         <div className="flex justify-end mt-4">
//           <Button color="blue" disabled={!isUserMessageValid} onClick={handleSendNotificationToUsers}>
//             Send Notification
//           </Button>
//         </div>
//       </Modal>

//       {/* Session Details Modal */}
//       <Modal opened={isTableModalOpen} onClose={() => setIsTableModalOpen(false)} title={`Session Details (${selectedSession})`}>
//         {sessionDetails && (
//           <>
//             <h3 className="text-lg font-semibold mb-2">Session Information</h3>
//             <Table className="custom-table">
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

//             {/* Message Field for Session Specific */}
//             <h3 className="text-lg font-semibold mt-4 mb-2">Enter Message</h3>
//             <Textarea
//               placeholder="Type your message here..."
//               value={sessionMessage}
//               onChange={(e) => setSessionMessage(e.currentTarget.value)}
//               required
//               autosize
//               minRows={3}
//             />

//             {/* OK Button */}
//             <div className="flex justify-end mt-4">
//               <Button color="blue" disabled={!isSessionMessageValid} onClick={handleSendNotificationToSession}>
//                 Send Notification
//               </Button>
//             </div>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default NotificationsPage;

import { Button, Card, Modal, Table, Checkbox, Textarea, FileInput } from "@mantine/core";
import { useState } from "react";

const NotificationsPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isSessionModalOpen, setIsSessionModalOpen] = useState<boolean>(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState<boolean>(false);
  const [isAllModalOpen, setIsAllModalOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [message, setMessage] = useState<string>(""); // Message state for all
  const [userMessage, setUserMessage] = useState<string>(""); // Message state for user-specific
  const [sessionMessage, setSessionMessage] = useState<string>(""); // Message state for session-specific
  const [sessionDetails, setSessionDetails] = useState<{
    coach: string;
    location: string;
    startDate: string;
    endDate: string;
    days: string;
  } | null>(null);
  const [isSessionSelected, setIsSessionSelected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null); // File state for all
  const [userFile, setUserFile] = useState<File | null>(null); // File state for user-specific
  const [sessionFile, setSessionFile] = useState<File | null>(null); // File state for session-specific

  const users = ["User 1", "User 2", "User 3", "User 4"];
  const sessions = ["All", "Current Session", "Future Session"];

  const handleSessionClick = () => setIsSessionModalOpen(true);
  const handleUserClick = () => setIsUserModalOpen(true);
  const handleAllClick = () => setIsAllModalOpen(true);

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

  const isAllMessageValid = message.trim() !== "";
  const isUserMessageValid = userMessage.trim() !== "" && selectedUsers.length > 0;
  const isSessionMessageValid = sessionMessage.trim() !== "" && (isSessionSelected || selectedPlayers.length > 0);

  // Handle sending notifications
  const handleSendNotificationToAll = () => {
    console.log("Sending notification to all users:", message);
    console.log("Attached file:", file);
    setIsAllModalOpen(false);
    setMessage(""); // Clear the message field
    setFile(null); // Clear the file
  };

  const handleSendNotificationToUsers = () => {
    console.log("Sending notification to selected users:", selectedUsers, userMessage);
    console.log("Attached file:", userFile);
    setIsUserModalOpen(false);
    setUserMessage(""); // Clear the message field
    setSelectedUsers([]); // Clear selected users
    setUserFile(null); // Clear the file
  };

  const handleSendNotificationToSession = () => {
    console.log("Sending notification to session:", selectedSession, sessionMessage);
    console.log("Selected Players:", selectedPlayers);
    console.log("Is Session Selected:", isSessionSelected);
    console.log("Attached file:", sessionFile);
    setIsTableModalOpen(false);
    setSessionMessage(""); // Clear the message field
    setSelectedPlayers([]); // Clear selected players
    setIsSessionSelected(false); // Reset session selection
    setSessionFile(null); // Clear the file
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

          /* Custom styling for FileInput */
          .custom-file-input {
            background-color: #f8f9fa;
            border: 1px solid #ced4da;
            border-radius: 4px;
            padding: 6px 12px;
            font-size: 14px;
            color: #495057;
          }

          .custom-file-input:hover {
            background-color: #e9ecef;
            border-color: #adb5bd;
          }

          .custom-file-input:focus {
            border-color: #80bdff;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          }
        `}
      </style>

      <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: "#1e3a8a" }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

        <div className="flex flex-col gap-3">
          <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue" onClick={handleAllClick}>
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

      {/* Modal for "To All" Option */}
      <Modal opened={isAllModalOpen} onClose={() => setIsAllModalOpen(false)} title="Send Notification to All Users">
        <Textarea
          placeholder="Enter message for all users"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          required
          autosize
          minRows={3}
        />

        <FileInput
          placeholder="Attach a file"
          value={file}
          onChange={setFile}
          accept="image/*, .pdf"
          size="sm" // Smaller size
          className="custom-file-input mt-4" // Custom styling
        />

        <div className="flex justify-end mt-4">
          <Button color="blue" disabled={!isAllMessageValid} onClick={handleSendNotificationToAll}>
            Send Notification
          </Button>
        </div>
      </Modal>

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

        {/* Message Field for User Specific */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Enter Message</h3>
        <Textarea
          placeholder="Type your message here..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.currentTarget.value)}
          required
          autosize
          minRows={3}
        />

        <FileInput
          placeholder="Attach a file"
          value={userFile}
          onChange={setUserFile}
          accept="image/*, .pdf"
          size="sm" // Smaller size
          className="custom-file-input mt-4" // Custom styling
        />

        <div className="flex justify-end mt-4">
          <Button color="blue" disabled={!isUserMessageValid} onClick={handleSendNotificationToUsers}>
            Send Notification
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

            {/* Message Field for Session Specific */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Enter Message</h3>
            <Textarea
              placeholder="Type your message here..."
              value={sessionMessage}
              onChange={(e) => setSessionMessage(e.currentTarget.value)}
              required
              autosize
              minRows={3}
            />

            <FileInput
              placeholder="Attach a file"
              value={sessionFile}
              onChange={setSessionFile}
              accept="image/*, .pdf"
              size="sm" // Smaller size
              className="custom-file-input mt-4" // Custom styling
            />

            {/* OK Button */}
            <div className="flex justify-end mt-4">
              <Button color="blue" disabled={!isSessionMessageValid} onClick={handleSendNotificationToSession}>
                Send Notification
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default NotificationsPage;