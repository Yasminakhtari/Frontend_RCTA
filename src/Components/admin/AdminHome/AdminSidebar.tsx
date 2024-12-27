import React, { useState } from 'react';
import {
  AccountCircleOutlined,
  Dashboard,
  ExitToApp,
  SportsTennis,
  Group,
  Event,
  SettingsApplicationsOutlined,
  InsertChart,
  NotificationsNoneOutlined,
  PsychologyOutlined,
  TableBar,
  Link,
} from "@mui/icons-material";

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);  // State for toggling sidebar

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar Container */}
      <div className={`flex flex-col p-4 bg-gray-900 text-gray-200 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-16'} md:w-64`}>
        {/* Sidebar Logo */}
        <div className="text-center mb-8">
          <div className={`flex justify-center items-center mb-4 ${sidebarOpen ? 'w-12 h-12' : 'w-10 h-10'}`}>
            <img
              src="https://your-logo-url.com/logo.png" // Your logo URL here
              alt="Tennis Club"
              className={`transition-all duration-300 ${sidebarOpen ? 'w-16 h-16' : 'w-12 h-12'}`}
            />
          </div>
          {sidebarOpen && <div className="text-2xl font-bold text-blue-400">Tennis Club</div>}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden flex justify-between mb-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-3xl">
            {sidebarOpen ? '×' : '☰'}
          </button>
        </div>

        {/* Sidebar Items */}
        <ul className="space-y-6">
          {/* Main Section */}
          <li>
            <p className="text-xs uppercase text-gray-400 mb-2">Main</p>
            <div className="space-y-2">
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <Dashboard className="mr-2 text-xl" />
                {sidebarOpen && <span>Dashboard</span>}
              </div>
              <Link to="/servicetable">
                <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                  <TableBar className="mr-2 text-xl" />
                  {sidebarOpen && <span>Service Table</span>}
                </div>
              </Link>
            </div>
          </li>

          {/* Management Section */}
          <li>
            <p className="text-xs uppercase text-gray-400 mb-2">Management</p>
            <div className="space-y-2">
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <Group className="mr-2 text-xl" />
                {sidebarOpen && <span>Members</span>}
              </div>
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <SportsTennis className="mr-2 text-xl" />
                {sidebarOpen && <span>Players</span>}
              </div>
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <Event className="mr-2 text-xl" />
                {sidebarOpen && <span>Tournaments</span>}
              </div>
            </div>
          </li>

          {/* Useful Section */}
          <li>
            <p className="text-xs uppercase text-gray-400 mb-2">Useful</p>
            <div className="space-y-2">
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <InsertChart className="mr-2 text-xl" />
                {sidebarOpen && <span>Stats</span>}
              </div>
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <NotificationsNoneOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Notifications</span>}
              </div>
            </div>
          </li>

          {/* Service Section */}
          <li>
            <p className="text-xs uppercase text-gray-400 mb-2">Service</p>
            <div className="space-y-2">
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <PsychologyOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Logs</span>}
              </div>
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <SettingsApplicationsOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Settings</span>}
              </div>
            </div>
          </li>

          {/* User Section */}
          <li>
            <p className="text-xs uppercase text-gray-400 mb-2">User</p>
            <div className="space-y-2">
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <AccountCircleOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Profile</span>}
              </div>
              <div className="flex items-center p-2 hover:bg-blue-500 hover:text-white rounded-md cursor-pointer">
                <ExitToApp className="mr-2 text-xl" />
                {sidebarOpen && <span>Logout</span>}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
