import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar'; // Ensure this component works
import AdminHomeContainer from './AdminHomeContainer'; // Ensure this component works
import { ActionIcon } from '@mantine/core';
import { IconLayoutSidebarLeftCollapseFilled, IconLayoutSidebarRightExpand, IconMenu4, IconSquareLetterXFilled } from '@tabler/icons-react';
import { Outlet } from 'react-router-dom';

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
        className={`absolute ml-16 top-24 left-${isSidebarVisible ? '64' : '0'} z-10 ml-10 transition-all duration-300 ease-in-out`}
        style={{ transform: 'translateX(-50%)' }}
      >
        <ActionIcon
          variant="filled"
          size="lg"
          aria-label="Toggle Sidebar"
          onClick={toggleSidebar}
          style={{
            width: '100px', 
            backgroundColor: isSidebarVisible ? '#168AF5' : '#030F1A',
            color: 'white',
          }}
          className={`flex items-center justify-center space-x-2 rounded-md px-4 py-2 transition-all duration-200 ${isSidebarVisible ? 'bg-gray-800 text-white' : 'bg-gray-600 text-white'
            } hover:bg-gray-700 focus:ring `}
        >
          {isSidebarVisible ? (
            <div className="flex items-center space-x-2">
              <IconSquareLetterXFilled
                style={{ width: '24px', height: '24px' }}
                stroke={1.5}
                className="text-slate-200"
              />
              <span className="text-sm font-medium text-zinc-50 font-semibold">Close</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <IconMenu4
                style={{ width: '24px', height: '24px' }}
                stroke={1.5}
                className="text-white"
              />
              <span className="text-sm font-medium font-semibold">Menu</span>
            </div>
          )}
        </ActionIcon>

      </div>

      {/* Main Content */}
      <div
        className={`flex-grow p-5 transition-all duration-300 ease-in-out ${isSidebarVisible ? 'ml-0' : 'ml-0'
          }`}
      >
        <div className="bg-white shadow-md rounded-lg p-5">
          {/* <AdminHomeContainer /> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
