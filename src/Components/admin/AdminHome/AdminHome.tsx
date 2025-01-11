import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Ensure this component works
import AdminHomeContainer from './AdminHomeContainer'; // Ensure this component works
import { ActionIcon } from '@mantine/core';
import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarRightExpand } from '@tabler/icons-react';

const AdminHome = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="mt-20 flex">
      {/* Sidebar */}
      {isSidebarVisible && (
        <div className="sticky top-0 bg-gray-800 p-5 w-64 transition-all duration-300 ease-in-out">
          <AdminSidebar />
        </div>
      )}

      {/* Toggle Button */}
      <div
        className={`absolute top-24 left-${isSidebarVisible ? '64' : '0'} z-10 ml-10 transition-all duration-300 ease-in-out`}
        style={{ transform: 'translateX(-50%)' }}
      >
        <ActionIcon
          variant="filled"
          size="lg"
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          style={{ backgroundColor: isSidebarVisible ? '#2d3748' : '#2d3748', color: 'white' }}
        >
          {isSidebarVisible ? (
            <IconLayoutSidebarLeftCollapseFilled style={{ width: '24px', height: '24px' }} stroke={1.5} />
          ) : (
            <IconLayoutSidebarRightExpand style={{ width: '24px', height: '24px' }} stroke={1.5} />
          )}
        </ActionIcon>
      </div>

      {/* Main Content */}
      <div
        className={`flex-grow p-5 transition-all duration-300 ease-in-out ${
          isSidebarVisible ? 'ml-0' : 'ml-0'
        }`}
      >
        <div className="bg-white shadow-md rounded-lg p-5">
          <AdminHomeContainer />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
