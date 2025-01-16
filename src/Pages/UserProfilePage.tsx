import { Divider } from '@mantine/core';
import React, { useState } from 'react';
import Profile from '../Components/Profile/Profile';
import ProfileRightSection from '../Components/Profile/ProfileRightSection';
import PlayersDetails from '../Components/Profile/PlayersDetails';

interface Child {
  id: string;
  name: string;
  age: string;
  username: string;
  batch: string;
  coach: string;
  status: "ongoing" | "incoming" | "completed";  
}

const UserProfilePage: React.FC = () => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  return (
    <div className="min-h-[90vh] bg-gradient-to-r bg-slate-200 font-['poppins'] text-white">
      <Divider size="xs" mx="md" className="mt-20" />
      <div className="flex flex-col md:flex-row gap-5 mt-12 px-5">
        <div className="w-full md:w-1/3 bg-blue-700 p-5 rounded-lg shadow-lg mt-12">
          <Profile onSelectChild={setSelectedChild} />
        </div>

        <div className="w-full md:w-1/3 bg-gray-100 p-5 rounded-lg shadow-lg">
          <PlayersDetails child={selectedChild} />
        </div>

        <div className="w-full md:w-2/5 bg-white bg-opacity-20 p-5 mb-16 rounded-lg shadow-lg">
          <ProfileRightSection />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
