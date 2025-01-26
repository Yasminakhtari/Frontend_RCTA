import React from 'react';

interface Player {
  id: string;
  name: string;
  age: string;
  username: string;
  batch: string;
  coach: string;
  status: "ongoing" | "incoming" | "completed";  
}

interface PlayersDetailsProps {
  player: Player | null;
}

const PlayersDetails: React.FC<PlayersDetailsProps> = ({ player }) => {
  if (!player) {
    return (
      <p className="text-gray-500 text-center p-4 rounded-md bg-gray-100 shadow">
        No player selected
      </p>
    );
  }

  return (
    <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg relative border-l-4 border-b-4 border-blue-500">
      <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">
        Player Details
      </h2>
      <div className="space-y-3">
        <p>
          <span className="font-semibold text-gray-700">Name:</span> {player.name}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Age:</span> {player.age}
        </p>
        {/* <p>
          <span className="font-semibold text-gray-700">Username:</span> {player.username}
        </p> */}
        <p>
          <span className="font-semibold text-gray-700">Batch:</span> {player.batch}
        </p>
        <p>
          <span className="font-semibold text-gray-700">Coach:</span> {player.coach}
        </p>

        {/* Conditional Badge for Player Status */}
        <p>
          <span className="font-semibold text-gray-700">Status:</span>
          <span
            className={`ml-2 px-3 py-1 rounded-full text-white ${
              player.status === "ongoing"
                ? "bg-yellow-500"
                : player.status === "completed"
                ? "bg-green-500"
                : "bg-blue-500"
            }`}
          >
            {player.status.charAt(0).toUpperCase() + player.status.slice(1)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PlayersDetails;
