import { Badge, Tabs, Card, Text, Button, Group, Pagination } from '@mantine/core';
import { IconCalendar, IconUser, IconMapPin, IconClock,IconBallTennis } from '@tabler/icons-react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllSession } from '../../Services/SessionService';

const ProfileRightSection = ({ sessions }: any) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sessionData, setSessionData] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user);

  const checkIfMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const fetchAllSession = async () => {
      try {
        const userId = user?.data?.userDetails?.id;
        const response = await getAllSession(sessions?.id || userId);
        const sessionData = response?.data;
        if (Array.isArray(sessionData)) {
          setSessionData(sessionData);
        } else {
          setSessionData([]);
        }
      } catch (error) {
        console.error('Failed to fetch Session', error);
      }
    };
    fetchAllSession();
  }, [sessions?.id, user?.data?.userDetails?.id]);

  const filterSessionsByStatus = (status: string) => {
    if (status === 'all') return sessionData;
    return sessionData.filter((session) => session.status === status);
  };

  const getPaginatedSessions = (sessions: any[]) => {
    if (!isMobile) return sessions;
    const startIndex = (currentPage - 1) * 5;
    return sessions.slice(startIndex, startIndex + 5);
  };

  const SessionCard = ({ session }: { session: any }) => (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      className="relative h-full transition-all duration-300 hover:shadow-xl border border-blueRibbon-100 hover:border-blue-100"
    >
      <div className="absolute top-4 right-4">
        <Badge 
          variant="filled"
          color={
            session.status === 'completed' ? 'green' : 
            session.status === 'inprogress' ? 'yellow' : 'blue'
          }
          className="shadow-md"
        >
          {session.status.toUpperCase()}
        </Badge>
      </div>

      <Group justify="apart" align="start" className="mb-4">
        <IconBallTennis size={24} className="text-blue-900" />
        <Text className="text-xl font-bold text-blueRibbon-800">{session.category}</Text>
      </Group>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IconUser size={18} className="text-blueRibbon-500" />
          <Text size="sm" className="text-blueRibbon-900 font-medium">
            Coach: <span className="text-blue-900">{session.coachName}</span>
          </Text>
        </div>

        <div className="flex items-center gap-2">
          <IconMapPin size={18} className="text-blueRibbon-500" />
          <Text size="sm" className="text-blueRibbon-900">
            {session.locationName}
          </Text>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <IconCalendar size={18} className="text-blueRibbon-500" />
            <Text size="sm" className="text-blueRibbon-900">
              {session.fromDate} - {session.toDate}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <IconClock size={18} className="text-blueRibbon-500" />
            <Text size="sm" className="text-blueRibbon-900">
              {session.startTime} - {session.endTime}
            </Text>
          </div>
        </div>
      </div>

      <Group justify="right" className="mt-6 border-t pt-4">
        <Button 
          variant="outline" 
          color="blue" 
          radius="xl"
          className="hover:bg-blue-50 font-medium"
        >
          View Details
        </Button>
      </Group>
    </Card>
  );

  const renderSessions = (sessions: any[]) => (
    <div className={`grid ${isMobile ? 'grid-cols-1' : 'md:grid-cols-2 xl:grid-cols-3'} gap-6`}>
      {getPaginatedSessions(sessions).map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </div>
  );

  return (

    <div className="w-full p-4 md:p-6 lg:p-8 bg-blueRibbon-50 rounded-2xl">
      
        <div className="flex items-center gap-4">
        <div className="text-blueRibbon-500 font-extrabold text-2xl mt-2 mb-3">RC TENNIS ACADEMY</div>
          <Badge 
            size="xl" 
            variant="gradient" 
            gradient={{ from: 'blue', to: 'cyan' }}
            className="shadow-md"
          >
            <IconBallTennis size={20} />
          </Badge>
        </div>
       

      <Tabs 
        variant="outline" 
        radius="lg" 
        defaultValue="all"
        classNames={{
          tab: 'font-semibold text-blueRibbon-900 hover:bg-blue-50 [&[data-active]]:border-blue-500 [&[data-active]]:text-blue-900',
        }}
      >
        <Tabs.List className="md:text-lg text-sm text-blueRibbon-700 font-semibold mb-5 [&_button[data-active='true']]:text-blueRibbon-950">
          <Tabs.Tab value="all" className="px-6  py-3">All Sessions</Tabs.Tab>
          <Tabs.Tab value="completed" className="px-6 py-3">Completed</Tabs.Tab>
          <Tabs.Tab value="inprogress" className="px-6 py-3">In Progress</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="all">
          {renderSessions(filterSessionsByStatus('all'))}
          {isMobile && (
            <div className="mt-6 flex justify-center">
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={Math.ceil(filterSessionsByStatus('all').length / 5)}
                radius="xl"
                size="sm"
                className="shadow-md"
              />
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="completed">
          {renderSessions(filterSessionsByStatus('completed'))}
          {isMobile && (
            <div className="mt-6 flex justify-center">
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={Math.ceil(filterSessionsByStatus('completed').length / 5)}
                radius="xl"
                size="sm"
                className="shadow-md"
              />
            </div>
          )}
        </Tabs.Panel>

        <Tabs.Panel value="inprogress">
          {renderSessions(filterSessionsByStatus('inprogress'))}
          {isMobile && (
            <div className="mt-6 flex justify-center">
              <Pagination
                value={currentPage}
                onChange={setCurrentPage}
                total={Math.ceil(filterSessionsByStatus('inprogress').length / 5)}
                radius="xl"
                size="sm"
                className="shadow-md"
              />
            </div>
          )}
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default ProfileRightSection;