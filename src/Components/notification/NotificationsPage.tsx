// import { Button, Card, Textarea } from "@mantine/core";
// import { SetStateAction, useState } from "react";

// const NotificationsPage = () => {
//   const [selectedOption, setSelectedOption] = useState<string>("");
//   const [description, setDescription] = useState<string>("");

//   const handleSendClick = () => {
//     console.log("Selected Option:", selectedOption);
//     console.log("Description:", description);
//     alert(`Notification sent to ${selectedOption}:\n${description}`); // Optional: Show an alert
//   };

//   return (
//     <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
//       <Card
//         shadow="lg"
//         padding="xl"
//         radius="md"
//         className="w-full max-w-md"
//         style={{ backgroundColor: '#1e3a8a' }} // Deep blue background
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>
//         <div className="flex flex-col gap-3">
//           <Button
//             variant={selectedOption === "all" ? "filled" : "outline"}
//             color="blue"
//             className="transition-transform transform hover:scale-105"
//             onClick={() => setSelectedOption("all")}
//           >
//             To All
//           </Button>
//           <Button
//             variant={selectedOption === "session" ? "filled" : "outline"}
//             color="green"
//             className="transition-transform transform hover:scale-105"
//             onClick={() => setSelectedOption("session")}
//           >
//             Session Specific
//           </Button>
//           <Button
//             variant={selectedOption === "user" ? "filled" : "outline"}
//             color="red"
//             className="transition-transform transform hover:scale-105"
//             onClick={() => setSelectedOption("user")}
//           >
//             User Specific
//           </Button>
//         </div>
//         {selectedOption && (
//           <div className="mt-6 flex flex-col items-center"> {/* Centering the content */}
//             <label className="block text-sm font-medium mb-2 text-white">Description</label>
//             <Textarea
//               placeholder="Enter notification message..."
//               value={description}
//               onChange={(e: { target: { value: SetStateAction<string> } }) =>
//                 setDescription(e.target.value)
//               }
//               className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
//             />
//             <Button
//               className="mt-4 w-1/2 bg-green-700 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition" // Green button
//               style={{ alignSelf: 'center' }} // Center the button
//               onClick={handleSendClick} // Make the button clickable
//             >
//               Send
//             </Button>
//           </div>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default NotificationsPage;


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

import { Button, Card, Modal, Textarea, Checkbox } from "@mantine/core";
import { useState } from "react";

const NotificationsPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [sessions] = useState<string[]>(["All", "Current Session", "Future Session"]);
  const [users] = useState<string[]>(["User A", "User B", "User C"]);
  const [selectedSession, setSelectedSession] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [players, setPlayers] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);

  const fetchPlayersForSession = async (sessionId: number) => {
    const mockPlayers = [`Player 1 (Session ${sessionId})`, `Player 2 (Session ${sessionId})`];
    setPlayers(mockPlayers);
  };

  const handlePlayerSelection = (player: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(player) ? prev.filter((p) => p !== player) : [...prev, player]
    );
  };

  const handleSendClick = () => {
    let target = selectedOption === "session" ? `Session: ${selectedSession}` 
                : selectedOption === "user" ? `User: ${selectedUser}` 
                : "All users";

    if (selectedOption === "session" && selectedPlayers.length > 0) {
      target += `\nPlayers: ${selectedPlayers.join(', ')}`;
    }

    console.log(`Notification sent to ${target}:\n${description}`);
    alert(`Notification sent to ${target}:\n${description}`);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
      <Card shadow="lg" padding="xl" radius="md" className="w-full max-w-md" style={{ backgroundColor: '#1e3a8a' }}>
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>

        <div className="flex flex-col gap-3">
          <Button variant={selectedOption === "all" ? "filled" : "outline"} color="blue"
            onClick={() => setSelectedOption("all")}>To All</Button>

          <Button variant={selectedOption === "session" ? "filled" : "outline"} color="green"
            onClick={() => { setSelectedOption("session"); setIsModalOpen(true); }}>
            Session Specific
          </Button>

          <Button variant={selectedOption === "user" ? "filled" : "outline"} color="red"
            onClick={() => { setSelectedOption("user"); setIsModalOpen(true); }}>
            User Specific
          </Button>
        </div>

        {selectedOption && (
          <div className="mt-6 flex flex-col items-center">
            <label className="block text-sm font-medium mb-2 text-white">Description</label>
            <Textarea placeholder="Enter notification message..."
              value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400" />

            <Button className="mt-4 w-1/2 bg-green-700 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition"
              onClick={handleSendClick}>
              Send
            </Button>
          </div>
        )}
      </Card>

      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedOption === "session" ? "Select Session" : "Select User"}>
        <div className="flex flex-col gap-3">
          {selectedOption === "session" ? (
            sessions.map((session) => (
              <Button key={session} variant="outline" onClick={() => {
                setSelectedSession(session);
                fetchPlayersForSession(1);
              }}>
                {session}
              </Button>
            ))
          ) : (
            users.map((user) => (
              <Button key={user} variant="outline" onClick={() => {
                setSelectedUser(user);
                setIsModalOpen(false);
              }}>
                {user}
              </Button>
            ))
          )}
        </div>

        {selectedOption === "session" && players.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Players in {selectedSession}</h3>
            <ul className="list-disc list-inside">
              {players.map((player, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedPlayers.includes(player)}
                    onChange={() => handlePlayerSelection(player)}
                  />
                  {player}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default NotificationsPage;
