import { Button, 
  Card, 
  Modal, 
  Table, 
  Checkbox, 
  Textarea, 
  Loader, 
  Avatar, 
  Group, 
  Badge, 
  Grid, 
  Text, 
  Divider, 
  ScrollArea  } from "@mantine/core";
  import { useMediaQuery } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { getAllSession } from "../../Services/SessionService";
import { saveNotification } from "../../Services/NotificationService1";
import { getAllUsers } from "../../Services/UserService"; // Add this service for user-specific notifications
import { IconCalendarEvent, IconMessage, IconUsers } from "@tabler/icons-react";
import tennisImg from "../../assets/images/tennisnoti4.png";
import mobilenoti from "../../assets/images/tennismobi1.png";
import { errorNotification, successNotification } from "../../Services/NotificationService";
interface Session {
  id: number;
  category: string;
  subCategory: string;
  frospanate: string;
  toDate: string;
  coachName: string;
  locationName: string;
  days: string[];
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profile?: string;
  role: {
    name: string;
  };
  mobileNo?: string;
}


const NotificationsPage = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  // State for sessions and users
  const [sessions, setSessions] = useState<Session[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // State for selected options
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Store user IDs

  // State for messages
  const [message, setMessage] = useState("");
  const [sessionMessage, setSessionMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");

  // State for modals
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  // Loading states
  const [loading, setLoading] = useState(false);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  // Fetch sessions and users on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const sessionResponse = await getAllSession(0);
        console.log( "okkkkkkkkkkkkkkk " , sessionResponse);
        const userResponse = await getAllUsers(); // Fetch all users
        if (sessionResponse.data) setSessions(sessionResponse.data);
        if (userResponse.data) setUsers(userResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle sending notifications to all users
  const handleSendNotificationToAll = async () => {
    if (!message.trim()) {
      alert("Please enter a message");
      return;
    };

    try {
      setLoading(true);
      console.log("Sending notification to all users:", message);

      const response = await saveNotification(
        null, // No Session Id for "To All User"
        null,
        message,
        new Date().toISOString(), 
        new Date().toISOString() 
      );

      console.log("Notification response:", response);
      successNotification("Success","Notifications sent successfully!");
      setIsAllModalOpen(false);
      setMessage("");
    } catch (error) {
      console.error("Notification error:", error);
      errorNotification("error","Failed to send notifications");
    } finally {
      setLoading(false);
    }
  };

  // Handle sending notifications to session-specific users
  const handleSendNotificationToSession = async () => {
    if (!selectedSession || !sessionMessage.trim()) {
      alert("please select a session and enter a message.");
      return;
    }
    try {
      setSessionLoading(true);
      console.log("Sending notification to session:", selectedSession.id, sessionMessage);

      const response = await saveNotification(
        selectedSession.id,
        null,
        sessionMessage,
        selectedSession.frospanate,
        selectedSession.toDate
      );

      console.log("Notification response:", response);
      successNotification("Success","Notifications sent successfully!");
      setIsSessionModalOpen(false);
      setSessionMessage("");
      setSelectedSession(null);
    } catch (error) {
      console.error("Notification error:", error);
      errorNotification("error","Failed to send notifications");
    } finally {
      setSessionLoading(false);
    }
  };

  // Handle sending notifications to specific users
  const handleSendNotificationToUsers = async () => {
    if (selectedUsers.length === 0 || !userMessage.trim()) return;

    try {
      setUserLoading(true);
      console.log("Sending notification to users:", selectedUsers, userMessage);

      // Send notifications to each selected user
      for (const userId of selectedUsers) {
        const response = await saveNotification(
          null,//NO Session ID
          userId,//Send notifications to specific user
          userMessage,
          new Date().toISOString(), // Current date as frospanate
          new Date().toISOString() // Current date as toDate
        );
        console.log("Notification response for user", userId, ":", response);
      }

      successNotification("Success","Notifications sent successfully!");
      setIsUserModalOpen(false);
      setUserMessage("");
      setSelectedUsers([]);
    } catch (error) {
      console.error("Notification error:", error);
      errorNotification("Error","Failed to send notifications");
    } finally {
      setUserLoading(false);
    }
  };

  // Handle user selection for user-specific notifications
  const handleUserSelection = (userId: number) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="p-6  min-h-screen mt-16"
       style={{
        backgroundImage: `url(${isMobile ? mobilenoti : tennisImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    
    
    >
      <div className="max-w-6xl mx-auto">
      <Group mb="xl" className="mb-8">
          <IconMessage size={32} className="text-white" />
          <Text size="xl" fw={700} className="text-2xl text-white">
            Notification Management
          </Text>
        </Group>

        <Grid gutter="lg">
          <Grid.Col span={{ xs: 12, md: 4 }}>
            <Card 
              shadow="lg" 
              padding="lg" 
              className="hover:transform hover:scale-105 transition-transform cursor-pointer bg-gradient-to-r from-blue-800 to-indigo-900"
              onClick={() => setIsAllModalOpen(true)}
            >
              <Group>
                <Avatar color="blue" radius="xl" className="border-2 border-white">
                  <IconUsers size={24} className="text-white" />
                </Avatar>
                <div>
                  <Text fw={600} className="text-white">Broadcast to All</Text>
                  <Text size="sm" c="dimmed" className="text-blue-100">
                    Send notification to all registered users
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ xs: 12, md: 4 }}>
            <Card
              shadow="lg"
              padding="lg"
              className="hover:transform hover:scale-105 transition-transform cursor-pointer bg-gradient-to-r from-green-800 to-emerald-900"
              onClick={() => setIsSessionModalOpen(true)}
            >
              <Group>
                <Avatar color="green" radius="xl" className="border-2 border-white">
                  <IconCalendarEvent size={24} className="text-white" />
                </Avatar>
                <div>
                  <Text fw={600} className="text-white">Session Specific</Text>
                  <Text size="sm" c="dimmed" className="text-green-100">
                    Target users in specific sessions
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ xs: 12, md: 4 }}>
            <Card
              shadow="lg"
              padding="lg"
              className="hover:transform hover:scale-105 transition-transform cursor-pointer bg-gradient-to-r from-purple-800 to-fuchsia-900"
              onClick={() => setIsUserModalOpen(true)}
            >
              <Group>
                <Avatar color="grape" radius="xl" className="border-2 border-white">
                  <IconUsers size={24} className="text-white" />
                </Avatar>
                <div>
                  <Text fw={600} className="text-white">User Specific</Text>
                  <Text size="sm" c="dimmed" className="text-purple-100">
                    Select individual users to notify
                  </Text>
                </div>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Modals - Updated Designs */}
        {/* All Users Modal */}
        <Modal 
          opened={isAllModalOpen} 
          onClose={() => setIsAllModalOpen(false)}
          title={<Text maw={600}>Broadcast to All Users</Text>}
          size="lg"
        >
          <div className="space-y-4">
            <Textarea
              placeholder="Write your notification message here..."
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              autosize
              minRows={4}
              className="border rounded-lg p-3"
            />
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAllModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                color="blue" 
                onClick={handleSendNotificationToAll} 
                disabled={!message.trim() || loading}
                leftSection={loading ? <Loader size="sm" /> : null}
                size="span" 
              >
                Send to All
              </Button>
            </div>
          </div>
        </Modal>

        {/* Session Modal */}
        <Modal 
          opened={isSessionModalOpen} 
          onClose={() => setIsSessionModalOpen(false)}
          title={<Text maw={600}>Select Session</Text>}
          size="xl"
        >
          <ScrollArea style={{ height: 400 }}>
            <div className="space-y-3">
              {sessions.map((session) => (
                <Card
                  key={session.id}
                  withBorder
                  className={`cursor-pointer ${selectedSession?.id === session.id ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => setSelectedSession(session)}
                >
                  <Group justify="apart">
                    <div>
                      <Text maw={600}>{session.category} - {session.subCategory}</Text>
                      <Text size="sm" color="dimmed">
                        {new Date(session.frospanate).toLocaleDateString()} - {new Date(session.toDate).toLocaleDateString()}
                      </Text>
                    </div>
                    <Badge color="teal">{session.locationName}</Badge>
                  </Group>
                  <Text size="sm" className="mt-2">
                    Coach: {session.coachName}
                  </Text>
                </Card>
              ))}
            </div>
          </ScrollArea>

          {selectedSession && (
            <div className="mt-6">
              <Divider mb="span" />
              <Textarea
                placeholder={`Write message for ${selectedSession.category} participants...`}
                value={sessionMessage}
                onChange={(e) => setSessionMessage(e.currentTarget.value)}
                autosize
                minRows={3}
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setSelectedSession(null)}>
                  Clear Selection
                </Button>
                <Button
                  color="green"
                  onClick={handleSendNotificationToSession}
                  disabled={!sessionMessage.trim() || sessionLoading}
                  leftSection={sessionLoading ? <Loader size="sm" /> : null}
                >
                  Send to Session
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* User Modal */}
        <Modal 
          opened={isUserModalOpen} 
          onClose={() => setIsUserModalOpen(false)}
          title={<Text maw={600}>Select Users</Text>}
          size="xl"
        >
          <ScrollArea style={{ height: 500 }}>
            <Grid gutter="span">
              {users.map((user) => (
                <Grid.Col span={6} key={user.id}>
                  <Card
                    withBorder
                    className={`cursor-pointer ${selectedUsers.includes(user.id) ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleUserSelection(user.id)}
                  >
                    <Group>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => handleUserSelection(user.id)}
                      />
                      <Avatar 
                        src={user.profile} 
                        radius="xl"
                        color="blue"
                        className="border-2"
                      >
                        {!user.profile && user.firstName[0] + user.lastName[0]}
                      </Avatar>
                      <div>
                        <Text maw={600}>{user.firstName} {user.lastName}</Text>
                        <Text size="sm" color="dimmed">{user.email}</Text>
                        <Badge color="gray" size="sm">{user.role.name}</Badge>
                      </div>
                    </Group>
                  </Card>
                </Grid.Col>
              ))}
            </Grid>
          </ScrollArea>

          {selectedUsers.length > 0 && (
            <div className="mt-6">
              <Divider mb="span" />
              <Textarea
                placeholder="Write your personalized message..."
                value={userMessage}
                onChange={(e) => setUserMessage(e.currentTarget.value)}
                autosize
                minRows={3}
              />
              <div className="flex justify-between items-center mt-4">
                <Text size="sm" color="dimmed">
                  Selected: {selectedUsers.length} users
                </Text>
                <Button
                  color="red"
                  onClick={handleSendNotificationToUsers}
                  disabled={!userMessage.trim() || userLoading}
                  leftSection={userLoading ? <Loader size="sm" /> : null}
                >
                  Send to Selected
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default NotificationsPage;