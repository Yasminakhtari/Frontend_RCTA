import { Button, Card, Textarea } from "@mantine/core";
import { SetStateAction, useState } from "react";

const NotificationsPage = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleSendClick = () => {
    console.log("Selected Option:", selectedOption);
    console.log("Description:", description);
    alert(`Notification sent to ${selectedOption}:\n${description}`); // Optional: Show an alert
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen mt-16">
      <Card
        shadow="lg"
        padding="xl"
        radius="md"
        className="w-full max-w-md"
        style={{ backgroundColor: '#1e3a8a' }} // Deep blue background
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Send Notification</h2>
        <div className="flex flex-col gap-3">
          <Button
            variant={selectedOption === "all" ? "filled" : "outline"}
            color="blue"
            className="transition-transform transform hover:scale-105"
            onClick={() => setSelectedOption("all")}
          >
            To All
          </Button>
          <Button
            variant={selectedOption === "session" ? "filled" : "outline"}
            color="green"
            className="transition-transform transform hover:scale-105"
            onClick={() => setSelectedOption("session")}
          >
            Session Specific
          </Button>
          <Button
            variant={selectedOption === "user" ? "filled" : "outline"}
            color="red"
            className="transition-transform transform hover:scale-105"
            onClick={() => setSelectedOption("user")}
          >
            User Specific
          </Button>
        </div>
        {selectedOption && (
          <div className="mt-6 flex flex-col items-center"> {/* Centering the content */}
            <label className="block text-sm font-medium mb-2 text-white">Description</label>
            <Textarea
              placeholder="Enter notification message..."
              value={description}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setDescription(e.target.value)
              }
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            />
            <Button
              className="mt-4 w-1/2 bg-green-700 text-white py-2 rounded-md shadow-md hover:bg-green-600 transition" // Green button
              style={{ alignSelf: 'center' }} // Center the button
              onClick={handleSendClick} // Make the button clickable
            >
              Send
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationsPage;