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
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconUser } from '@tabler/icons-react';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  return (
    <div className="flex h-screen">
      {/* Sidebar Container */}
      <div
        className={`bg-gray-900 text-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-red-700 text-3xl focus:outline-none md:hidden"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? '×' : '☰'}
          </button>
        </div>

        {/* Sidebar Items */}
        <nav className="flex-1 px-2 space-y-4 overflow-y-auto">
          {/* Main Section */}
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2">Main</p>
            <Link to="/" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <Dashboard className="mr-2 text-xl" />
                {sidebarOpen && <span>Dashboard</span>}
              </div>
            </Link>
            <Link to="/servicetable" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <TableBar className="mr-2 text-xl" />
                {sidebarOpen && <span>Service Table</span>}
              </div>
            </Link>
            <Link to="/manage" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <TableBar className="mr-2 text-xl" />
                {sidebarOpen && <span>Session Table</span>}
              </div>
            </Link>

            <Link to="/alluser" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <IconUser className="mr-2 text-xl" />
                {sidebarOpen && <span>Get All User</span>}
              </div>
            </Link>
          </div>

          {/* Management Section */}
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2">Management</p>
            <Link to="/members" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <Group className="mr-2 text-xl" />
                {sidebarOpen && <span>Members</span>}
              </div>
            </Link>
            <Link to="/players" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <SportsTennis className="mr-2 text-xl" />
                {sidebarOpen && <span>Players</span>}
              </div>
            </Link>
            <Link to="/tournaments" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <Event className="mr-2 text-xl" />
                {sidebarOpen && <span>Tournaments</span>}
              </div>
            </Link>
          </div>

          {/* Useful Section */}
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2">Useful</p>
            <Link to="/404" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <InsertChart className="mr-2 text-xl" />
                {sidebarOpen && <span>Stats</span>}
              </div>
            </Link>
            <Link to="/notifications" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <NotificationsNoneOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Notifications</span>}
              </div>
            </Link>
          </div>

          {/* Service Section */}
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2">Service</p>
            <Link to="/logs" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <PsychologyOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Logs</span>}
              </div>
            </Link>
            <Link to="/settings" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <SettingsApplicationsOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Settings</span>}
              </div>
            </Link>
          </div>

          {/* User Section */}
          <div>
            <p className="text-xs uppercase text-gray-400 mb-2">User</p>
            <Link to="/profile" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <AccountCircleOutlined className="mr-2 text-xl" />
                {sidebarOpen && <span>Profile</span>}
              </div>
            </Link>
            <Link to="/logout" className="block p-2 hover:bg-blue-500 rounded-md">
              <div className="flex items-center">
                <ExitToApp className="mr-2 text-xl" />
                {sidebarOpen && <span>Logout</span>}
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
