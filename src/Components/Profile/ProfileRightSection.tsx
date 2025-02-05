import { Badge, Tabs, Card, Text, Button, Group } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllSession } from '../../Services/SessionService';

const staticSessionsData = [
  { id: 1, title: 'Tennis Training 101', coach: ' Alex', status: 'completed' },
  { id: 2, title: 'Advanced Serve Practice', coach: 'Sarah', status: 'ongoing' },
  { id: 3, title: 'Doubles Strategy', coach: 'John', status: 'upcoming' },
  { id: 4, title: 'Speed & Agility Drills', coach: 'Emily', status: 'completed' },
  { id: 5, title: 'Footwork Fundamentals', coach: 'Alex', status: 'ongoing' },
  { id: 6, title: 'Match Play', coach: 'David', status: 'upcoming' },
];

interface Session {
  id: number; // Assuming the ID is a number based on backend 'Long'
  courseId: number; // Changed to 'number' to match backend
  coachId: number; // Changed to 'number' to match backend
  locationId: number; // Changed to 'number' to match backend
  fromDate: string; // String formatted date ("YYYY-MM-DD")
  toDate: string; // String formatted date ("YYYY-MM-DD")
  days: string[]; // Array of days (e.g., ["Monday", "Wednesday", "Friday"])
  startTime: string; // Time string (e.g., "10:00 AM")
  endTime: string; // Time string (e.g., "12:00 PM")
  maxCapacity: number; // Maximum capacity of the session
  maxWaitingCapacity: number; // Waiting capacity
  price: number; // Price of the session
  userId: number; // User ID as a number
  playersId: number[]; // Array of player IDs (numbers)
  status: "Active" | "Inactive"; // Status of the session
  coachName?: string | null; // Coach name, optional and can be null
  category?: string | null; // Category name, optional and can be null
  subCategory?: string | null; // Subcategory name, optional and can be null
  locationName?: string | null; // Location name, optional and can be null
}


const ProfileRightSection = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false); // State for mobile screen detection
  const [currentPage, setCurrentPage] = useState(1); // Track the current page of cards

  const user = useSelector((state: any) => state.user);


  // Detect if the screen is mobile
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  // Update mobile screen detection on resize
  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const filterSessionsByStatus = (status: string) => {
    if (status === 'all') return staticSessionsData;

    return staticSessionsData.filter((session) => session.status === status);
  };

  // Limit sessions to show on mobile (5 cards max)
  const getPaginatedSessions = (sessions: typeof staticSessionsData) => {
    if (!isMobile) return sessions; // No pagination on desktop
    const startIndex = (currentPage - 1) * 5;
    return sessions.slice(startIndex, startIndex + 5);
  };
  /////////////////////////
  /////////////////////////
  useEffect(()=>{
    const fetchAllSession = async() => {
      try{
        const userId = user?.data?.userDetails?.id;
        const response = await getAllSession(userId);
        const sessionData = response?.data;
        console.log(sessionData);
        // if(sessionData){
        //   setSessions(sessionData);
        // }else{
        //   console.error("Expected an array, but received:", sessionData);
        //   setSessions([]);
        // }
      }catch(error){
        console.log(error);
        console.error("Failed to fetch Session", error);
      }
    }
    fetchAllSession();
  },[user?.data?.userDetails?.id])



  const renderSessions = (sessions: typeof staticSessionsData) => (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
      {getPaginatedSessions(sessions).map((session) => (
        <Card key={session.id} shadow="sm" padding="lg" radius="md" className="w-full">
          <Text style={{ fontWeight: 500 }} className="text-lg">{session.title}</Text>
          <Text size="sm" color="dimmed" className="mb-2">Coach: {session.coach}</Text>
          <Badge color={session.status === 'completed' ? 'green' : session.status === 'ongoing' ? 'yellow' : 'blue'}>
            {session.status.toUpperCase()}
          </Badge>
          <Group className="mt-4">
            <Button size="xs" color="blue">View Details</Button>
          </Group>
        </Card>
      ))}
    </div>
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(staticSessionsData.length / 5)));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="mt-5 w-full p-0 px-5 mt-24 lg:mt-5">
      <div className="md:text-2xl font-semibold text-sky-950 flex items-center">
        All Sessions
        <Badge ml="lg" variant="filled" size="xxl" color="blueRibbon.6">
          🎾
        </Badge>
      </div>
      <div className="font-medium text-mine-shaft-800 mb-5">RC TENNIS ACADEMY</div>

      <Tabs variant="outline" radius="lg" defaultValue="all">
        <Tabs.List className="md:text-lg text-sm text-blueRibbon-700 font-semibold mb-5 [&_button[data-active='true']]:text-blueRibbon-950">
          <Tabs.Tab value="all">All</Tabs.Tab>
          <Tabs.Tab value="completed">Completed</Tabs.Tab>
          <Tabs.Tab value="ongoing">Ongoing</Tabs.Tab>
          <Tabs.Tab value="upcoming">Upcoming</Tabs.Tab>
        </Tabs.List>

        {/* Tab Content */}
        <Tabs.Panel value="all">
          {renderSessions(filterSessionsByStatus('all'))}
        </Tabs.Panel>

        <Tabs.Panel value="completed">
          {renderSessions(filterSessionsByStatus('completed'))}
        </Tabs.Panel>

        <Tabs.Panel value="ongoing">
          {renderSessions(filterSessionsByStatus('ongoing'))}
        </Tabs.Panel>

        <Tabs.Panel value="upcoming">
          {renderSessions(filterSessionsByStatus('upcoming'))}
        </Tabs.Panel>
      </Tabs>

      {/* Pagination controls for mobile */}
      {isMobile && (
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            className='text-cyan-300'
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            className='text-sky-700'
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(staticSessionsData.length / 5)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileRightSection;
