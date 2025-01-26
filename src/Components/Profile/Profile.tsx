import React, { useState, useEffect } from 'react';
import { Avatar, Badge, Button, Modal, TextInput, Divider, Textarea, ActionIcon } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconCheck, IconEdit, IconMail, IconMapPin, IconPencil, IconTrash, IconUser, IconX } from '@tabler/icons-react';
import { Radio } from '@mantine/core';
import PlayersDetails from './PlayersDetails'; 
import { useDispatch, useSelector } from 'react-redux';
import { successNotification } from '../../Services/NotificationService';
import { changeProfile } from '../../Slices/ProfileSlice';
import { savePlayer } from '../../Services/PlayerService';

interface Player {
    id: string; 
    name: string;
    age: string ;
    username: string ;
    batch: string ;
    coach: string ;
    status: "ongoing" | "incoming" | "completed" ;
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
    const [isMobile, setIsMobile] = useState(false); // State for checking mobile screen size

    // const staticPlayersData: Player[] = [
    //     { id: '1', name: 'John Doe', age: '10', username: 'johnny10', batch: 'Morning', coach: 'Alex', status: 'ongoing' },
    //     { id: '2', name: 'Emily Clark', age: '12', username: 'emily12', batch: 'Evening', coach: 'Sarah', status: 'incoming' },
    //     { id: '3', name: 'Michael Brown', age: '8', username: 'mike8', batch: 'Forenoon', coach: 'David', status: 'completed' },
    // ];

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

    // Fetch all locations on component mount
    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const userDetails = localStorage.getItem('loginData');
            console.log(userDetails)
            setUsers(userDetails ? JSON.parse(userDetails) : null); // Parse JSON if necessary
        } catch (error) {
            console.error('Failed to fetch locations:', error);
        } finally {
            setLoading(false);
        }
    };

    //   useEffect(() => {
    //     fetchUserDetails();
    //   }, []); // Dependency array ensures this runs only once

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
                const savedPlayer = await savePlayer({
                    ...newPlayer,
                    id: (players.length + 1).toString(), // Optional: ID generation could also happen in the backend
                });
    
                // If successful, update the local players state with the response
                setPlayers((prevPlayers) => [...prevPlayers, savedPlayer]);
    
                // Reset the newPlayer object
                setNewPlayer({ id: '', name: '', age: '', username: '', batch: '', coach: '', status: 'ongoing' });
    
                // Close the modal
                setModalOpen(false);
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

    const confirmRemovePlayer = () => {
        if (selectedPlayer) {
            setPlayers(players.filter((player) => player.id !== selectedPlayer.id));
            setRemoveModalOpen(false);
            setSelectedPlayer(null);
        }
    };

    const handleNameClick = (player: Player) => {
        setSelectedPlayer(player);
        setProfileDetailsModalOpen(true); // Open ProfileDetails modal on name click
    };

    //////////
    // const handleEdit = () => {
    //     if (!edit) {//jadi edit sethi nahi then setEdit true karidia
    //         setEdit(true);
    //         // setPhone(profile.phone);
    //     } else {
    //         setEdit(false);
    //     }
    // }


    const handleEditPhone = () => {
        setIsEditingPhone(!isEditingPhone);
        if (isEditingPhone) {
            successNotification("Success", "Phone number updated successfully");
        }
    };

    const handleEditLocation = () => {
        setIsEditingLocation(!isEditingLocation);
        if (isEditingLocation) {
            successNotification("Success", "Location updated successfully");
        }
    };


    const handleSave = () => {
        setEdit(false);
        // let updatedProfile = { ...profile, phone: phone,location:location}
        //now i have use dispatch to ...........
        // dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Updated Sucessfully");
    }



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
                    <div className="text-lg ml-4 text-white font-bold  text-justify">{location || 'N/A'}</div>
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
                    <div className="text-xl font-bold  text-white text-justify">{phone || 'N/A'}</div>
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
                        label="Username"
                        placeholder="Enter player's username"
                        value={newPlayer.username}
                        onChange={(e) => setNewPlayer({ ...newPlayer, username: e.target.value })}
                    /> */}
                    {/* <TextInput
                        label="Batch"
                        placeholder="Enter batch (e.g., Morning, Evening)"
                        value={newPlayer.batch}
                        onChange={(e) => setNewPlayer({ ...newPlayer, batch: e.target.value })}
                    /> */}
                    {/* <TextInput
                        label="Coach"
                        placeholder="Enter coach name"
                        value={newPlayer.coach}
                        onChange={(e) => setNewPlayer({ ...newPlayer, coach: e.target.value })}
                    /> */}
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
                <h2 className="text-lg font-bold mb-4">Player List</h2>
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
