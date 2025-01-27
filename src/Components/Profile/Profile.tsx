import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Button, Modal, TextInput, Divider, Textarea, ActionIcon } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconCheck, IconEdit, IconMail, IconMapPin, IconPencil, IconTrash } from '@tabler/icons-react';
import { Radio } from '@mantine/core';
import PlayersDetails from './PlayersDetails';
import { useDispatch, useSelector } from 'react-redux';
// import { errorNotification, successNotification } from '../../Services/NotificationService';
// import { changeProfile } from '../../Slices/ProfileSlice';
import { getUserById, updateUser } from '../../Services/UserService';
import { deletePlayer, getAllPlayers, savePlayer } from '../../Services/PlayerService';
import { error } from 'console';
import { errorNotification, successNotification } from '../../Services/NotificationService';

interface Player {
    id: string;
    name: string;
    age: string;
    username: string;
    batch: string;
    coach: string;
    status: "ongoing" | "incoming" | "completed";
}

interface ProfileProps {
    onSelectPlayer: (player: Player | null) => void;
}

const Profile: React.FC<ProfileProps> = ({ onSelectPlayer }) => {
    const dispatch = useDispatch();
    const profile = useSelector((state: any) => state.profile || { picture: null });

    const { hovered, ref } = useHover();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isRemoveModalOpen, setRemoveModalOpen] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [isProfileDetailsModalOpen, setProfileDetailsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [userData, setUsers] = useState<any>();
    const [userUpdate, setUsersDetails] = useState<any>();
    const [isMobile, setIsMobile] = useState(false);

    const [edit, setEdit] = useState(false);
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [isEditingLocation, setIsEditingLocation] = useState(false);

    const [players, setPlayers] = useState<Player[]>([]);
    const [newPlayer, setNewPlayer] = useState<Player>({
        id: '',
        name: '',
        age: '',
        username: '',
        batch: '',
        coach: '',
        status: 'ongoing',
    });

    // Set isMobile based on window width
    const checkIfMobile = () => {
        setIsMobile(window.innerWidth <= 768);
    };



    // Use effect to check for screen size on window resize
    useEffect(() => {
        // fetchUserDataById();
        const userDetails = localStorage.getItem('loginData');
        console.log(userDetails)
        setUsers(userDetails ? JSON.parse(userDetails) : null); // Parse JSON if necessary
        console.log(userData)
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const fetchUserDataById = async () => {
        try {
            setLoading(true);
            //   const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
            const userDetails = JSON.parse(localStorage.getItem("loginData") || '{}');
            if (userDetails?.userDetails?.id) {
                const data = await getUserById(userDetails.userDetails.id);
                setUsersDetails(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDataById();
    }, []);

    // const handleAddPlayer = () => {
    //     if (newPlayer.name && newPlayer.age) {
    //         setPlayers((prevPlayers) => [
    //             ...prevPlayers,
    //             { ...newPlayer, id: (prevPlayers.length + 1).toString() },
    //         ]);
    //         setNewPlayer({ id: '', name: '', age: '', username: '', batch: '', coach: '', status: 'ongoing' });
    //         setModalOpen(false);
    //     }
    // };
    const handleAddPlayer = async () => {
        if (newPlayer.name && newPlayer.age) {
            try {
                // Call savePlayer to send the data to the backend
                // const savedPlayer = await savePlayer({
                //     ...newPlayer,
                //     id: (players.length + 1).toString(), // Optional: ID generation could also happen in the backend
                // });
                const playerData = {
                    ...newPlayer,
                    userId: userData?.userDetails?.id, // Assuming userId comes from the user data
                    batch: newPlayer.batch || 'defaultBatch', // Set a default value for batch if empty
                };

                // Call savePlayer API with updated player data
                const savedPlayer = await savePlayer(playerData);
                console.log(savedPlayer);
                successNotification("Success","Player Added Successfully");

                // setPlayers((prevPlayers) => [...prevPlayers, savedPlayer.data]);
                // Reset the newPlayer object
                // setNewPlayer({ id: '', name: '', age: '', username: '', batch: '', coach: '', status: 'ongoing' });
                // Check if the player data was returned correctly
                if (savedPlayer && savedPlayer?.data?.id) {
                    setPlayers((prevPlayers) => [...prevPlayers, savedPlayer.data]);

                    // Reset the form
                    setNewPlayer({
                        id: '',
                        name: '',
                        age: '',
                        username: '',
                        batch: '',
                        coach: '',
                        status: 'ongoing',
                    });

                    // Close the modal
                    setModalOpen(false);
                } else {
                    errorNotification("Error","Failed to add Player data 🥲 try again")
                }
            } catch (error) {
                console.error("Error saving player:", error);
                alert("Failed to save player. Please try again.");
            }
        }
    };

    const handleRemovePlayer = (player: Player) => {
        setSelectedPlayer(player);
        setRemoveModalOpen(true);
    };

    const confirmRemovePlayer = async () => {

        if (selectedPlayer && selectedReason) {
            try {
                await deletePlayer(Number(selectedPlayer.id), selectedReason);
                setPlayers(players.filter((player) => player.id !== selectedPlayer.id));//ya mane players r sabu ja data asuchi,so except deletes players modal chadiki au baki modal r data ku setplayers r rakhi dia 
                setRemoveModalOpen(false);
                setSelectedPlayer(null);
                successNotification("Success","Player Deleted Successfully");
            } catch (error) {
                console.log("Error removing players:", error)
            }
        } else {
            errorNotification("Error","Player or reason not selected");
        }
    };

    const handleNameClick = (player: Player) => {
        setSelectedPlayer(player);
        setProfileDetailsModalOpen(true); // Open ProfileDetails modal on name click
    };

    const handleEditPhone = async () => {
        setIsEditingPhone(!isEditingPhone);
        if (isEditingPhone) {
            try {
                const updatedUser = {
                    roleId: userData.userDetails?.role?.id, // Assuming roleId is nested inside `role`
                    firstName: userData.userDetails?.firstName,
                    lastName: userData.userDetails?.lastName,
                    username: userData.userDetails?.username,
                    email: userData.userDetails?.email,
                    password: userData.userDetails?.password, // Ensure this is hashed or handled securely
                    mobileNo: phone, // Updated mobile number
                    address: userUpdate?.address,
                };

                // Assuming you have the `id` and `location` data
                // const updatedUser = { payload, mobileNo: phone };
                const userId = userData.userDetails.id;
                const response = await updateUser(userId, updatedUser); // Call the updateUser service

                console.log("Contact updated successfully:", response);
                successNotification("Success", "Contact No. updated successfully");
                //fetchUserDataById();
            } catch (error) {
                console.error("Error updating contact:", error);
                // Optionally, you can display an error notification
                errorNotification("Error", "Failed to update contact no");
            }
        } else {
            setPhone(userUpdate?.mobileNo)
        }
    };

    const handleEditLocation = async () => {
        setIsEditingLocation(!isEditingLocation);
        if (isEditingLocation) {
            try {

                const updatedUser = {
                    roleId: userData.userDetails?.role?.id, // Assuming roleId is nested inside `role`
                    firstName: userData.userDetails?.firstName,
                    lastName: userData.userDetails?.lastName,
                    username: userData.userDetails?.username,
                    email: userData.userDetails?.email,
                    password: userData.userDetails?.password, // Ensure this is hashed or handled securely
                    mobileNo: userUpdate?.mobileNo, // Updated mobile number
                    address: location,
                };
                // Assuming you have the `id` and `location` data
                // const updatedUser = { ...userData.userDetails, address: location };
                const userId = userData.userDetails.id;
                const response = await updateUser(userId, updatedUser); // Call the updateUser service

                console.log("Location updated successfully:", response);
                successNotification("Success", "Location updated successfully");
                fetchUserDataById();

            } catch (error) {
                console.error("Error updating location:", error);
                // Optionally, you can display an error notification
                errorNotification("Error", "Failed to update location");
            }
        } else {
            setLocation(userUpdate?.address || "");
        }
    };
    ////////////////added 26-01-2025 /////////
    useEffect(() => {
        const fetchPlayers = async () => {
            try {

                const userId = userData?.userDetails?.id;
                const response = await getAllPlayers(userId);
                const playerData = response?.data;
                console.log(playerData)
                if (playerData) {
                    setPlayers(playerData);
                }
                else {
                    console.error("Expected an array, but received:", playerData);
                    setPlayers([]);
                }
            } catch (error) {
                console.log(error)
                console.error("Failed to fetch Players", error);
            }
        };

        fetchPlayers();
    }, [userData?.userDetails?.id]);


    // useEffect(() => {
    //     const fetchPlayers = async () => {
    //         try {
    //             const storedPlayers = localStorage.getItem('players');
    //             if (storedPlayers) {
    //                 // If players are in localStorage, use them
    //                 setPlayers(JSON.parse(storedPlayers));
    //             } else {
    //                 // Otherwise, fetch players from the API
    //                 const userId = userData.userDetails.id;
    //                 const response = await getAllPlayers(userId);
    //                 const playerData = response.data;
    //                 if (Array.isArray(playerData)) {
    //                     setPlayers(playerData);
    //                     // Save the fetched players to localStorage for persistence
    //                     localStorage.setItem('players', JSON.stringify(playerData));
    //                 } else {
    //                     console.error("Expected an array, but received:", playerData);
    //                     setPlayers([]);
    //                 }
    //             }
    //         } catch (error) {
    //             console.error("Failed to fetch Players", error);
    //         }
    //     };

    //     fetchPlayers();
    // }, [userData]);

    ////////////////added 26-01-2025 /////////



    return (
        <div className="mx-auto">
            <div className="relative">
                <img className="rounded-t-2xl" src="/banner.jpg" alt="Banner" />
                <div ref={ref} className="absolute flex items-center justify-center left-3 -bottom-1/3">
                    <Avatar className="rounded-full   !h-24 !w-24 md:!h-48 md:!w-48 mb-10 border-mine-shaft-950 border-8" src={profile.picture ? `data:image/jpeg;base64,${profile.picture}` : "iranian-8594205_1280.jpg"} alt="it's me" />

                    {hovered && <IconEdit className="absolute z-10 !w-16 !h-16" />}
                </div>
            </div>

            <div className=" flex  md:justify-between md:items-center mt-6 px-3">
                <h1 className=" text-xl md:text-3xl font-bold lg:font-semibold w-2/5 md:w-auto ">
                    {userData?.userDetails?.firstName} {userData?.userDetails?.lastName}
                </h1>
                <div className=" text-xs md:text-xl flex items-center gap-2">
                    <Badge color="blue" variant="filled">Player</Badge>
                </div>
            </div>



            <div className="flex gap-1 text-mine-shaft-300 text-lg items-center">
                <IconMail className="h-5 w-5" stroke={1.5} />
                {userData?.userDetails?.email}
            </div>
            {/* Location */}
            <div className="flex gap-1 text-mine-shaft-300 text-lg items-center">
                <IconMapPin className="h-5 w-5" stroke={1.5} />
                Location <span>
                    {isEditingLocation ? (
                        <Textarea
                            value={location}
                            autosize
                            minRows={3}
                            placeholder="Update Your Location."
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    ) : (
                        <div className="text-lg ml-4 text-white font-bold  text-justify">{userUpdate?.address || 'N/A'}</div>
                    )}
                </span>

                <div>
                    {isEditingLocation ? (
                        <ActionIcon onClick={handleEditLocation} size="lg" color="green.8" variant="subtle">
                            <IconCheck className="h-4/5 w-4/5" />
                        </ActionIcon>
                    ) : (
                        <ActionIcon onClick={handleEditLocation} size="lg" color="brightSun.4" variant="subtle">
                            <IconPencil className="h-4/5 w-4/5" />
                        </ActionIcon>
                    )}
                </div>


            </div>


            {/* Phone */}
            <div className="px-3">
                <div className="text-lg font-semibold mb-3 flex justify-between">
                    Contact no. <span className="!ml-0">
                        {isEditingPhone ? (
                            <Textarea

                                value={phone}
                                autosize
                                minRows={3}
                                placeholder="Enter Your Phone No."
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        ) : (
                            <div className="text-xl font-bold  text-white text-justify">{userUpdate?.mobileNo || 'N/A'}</div>
                        )}
                    </span>

                    <div>
                        {isEditingPhone ? (
                            <ActionIcon onClick={handleEditPhone} size="lg" color="green.8" variant="subtle">
                                <IconCheck className="h-4/5 w-4/5" />
                            </ActionIcon>
                        ) : (
                            <ActionIcon onClick={handleEditPhone} size="lg" color="brightSun.4" variant="subtle">
                                <IconPencil className="h-4/5 w-4/5" />
                            </ActionIcon>
                        )}
                    </div>
                </div>

            </div>



            <div className="mt-6">
                <Button onClick={() => setModalOpen(true)} fullWidth variant="filled" color="blue">
                    Add Players
                </Button>
            </div>

            <Modal
                opened={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Add a New Player"
                centered
            >
                <div className="space-y-4">
                    <TextInput
                        label="Name"
                        placeholder="Enter player's name"
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    />
                    <TextInput
                        label="Age"
                        placeholder="Enter player's age"
                        value={newPlayer.age}
                        onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                    />
                    {/* <TextInput
                        label="Status"
                        placeholder="Enter status (ongoing, incoming, completed)"
                        value={newPlayer.status}
                        onChange={(e) => setNewPlayer({ ...newPlayer, status: e.target.value as "ongoing" | "incoming" | "completed" })}
                    /> */}
                    <Button onClick={handleAddPlayer} fullWidth color="blue">
                        Add Player
                    </Button>
                </div>
            </Modal>

            {/* Mobile Modal for ProfileDetails */}
            {isProfileDetailsModalOpen && isMobile && (
                <Modal
                    opened={isProfileDetailsModalOpen}
                    onClose={() => setProfileDetailsModalOpen(false)}
                    title="Player Details"
                    centered
                >
                    <PlayersDetails player={selectedPlayer} />
                </Modal>
            )}

            {/* Render PlayersDetails below Profile only for desktop */}
            {!isMobile && selectedPlayer && <PlayersDetails player={selectedPlayer} />}

            <div className="mt-6">
                <h2 className="text-lg font-bold mb-4">Players</h2>
                <div className="grid grid-cols-1 gap-4">
                    {players.map((player) => (
                        <div
                            key={player.id}
                            className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-200"
                            onClick={() => onSelectPlayer(player)}
                        >
                            <div>
                                <h3
                                    className="text-xl font-bold cursor-pointer"
                                    onClick={() => handleNameClick(player)} // Open the ProfileDetails modal when clicking on the name
                                >
                                    {player.name}
                                </h3>
                            </div>
                            <Button
                                onClick={() => handleRemovePlayer(player)}
                                color="red"
                                variant="outline"
                                className="mt-2"
                            >
                                <span><IconTrash className="mr-4" /></span>
                                Remove
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                opened={isRemoveModalOpen}
                onClose={() => setRemoveModalOpen(false)}
                title="Are you sure?"
                centered
            >
                <div>
                    <p>Are you sure you want to remove this player from the list?</p>
                    <Divider my="sm" />
                    <h3>Reason for Removal:</h3>
                    <Radio.Group name="removal-reason" value={selectedReason} onChange={(value) => setSelectedReason(value)}>
                        <Radio value="Injury" label="Injury" />
                        <Radio value="Lack of progress" label="Lack of progress" />
                        <Radio value="Schedule conflict" label="Schedule conflict" />
                        <Radio value="Other" label="Other" />
                    </Radio.Group>
                    <div className="flex justify-end mt-4">
                        <Button onClick={confirmRemovePlayer} className='!text-white font-bold !bg-red-700'>
                            Confirm Remove
                        </Button>
                        <Button onClick={() => setRemoveModalOpen(false)} color="gray" className="ml-2">
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Profile;
