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
  AddLocation,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconUser } from '@tabler/icons-react';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Array of menu sections and their links
  const menuItems = [
    {
      section: 'Main',
      links: [
        { to: '/', icon: Dashboard, label: 'Dashboard' },
        { to: '/servicetable', icon: TableBar, label: 'Service Table' },
        { to: '/manage', icon: TableBar, label: 'Session Table' },
        { to: '/alluser', icon: IconUser, label: 'Get All Users' },
        { to: '/locationtable', icon: AddLocation, label: 'Locations' },
      ],
    },
    {
      section: 'Management',
      links: [
        { to: '/members', icon: Group, label: 'Members' },
        { to: '/players', icon: SportsTennis, label: 'Players' },
        { to: '/tournaments', icon: Event, label: 'Tournaments' },
      ],
    },
    {
      section: 'Useful',
      links: [
        { to: '/404', icon: InsertChart, label: 'Stats' },
        { to: '/notifications', icon: NotificationsNoneOutlined, label: 'Notifications' },
      ],
    },
    {
      section: 'Service',
      links: [
        { to: '/logs', icon: PsychologyOutlined, label: 'Logs' },
        { to: '/settings', icon: SettingsApplicationsOutlined, label: 'Settings' },
      ],
    },
    {
      section: 'User',
      links: [
        { to: '/profile', icon: AccountCircleOutlined, label: 'Profile' },
        { to: '/logout', icon: ExitToApp, label: 'Logout' },
      ],
    },
  ];

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

          {menuItems.map((section, index) => (
            <div key={index}>
              <p className="text-xs uppercase text-gray-400 mb-2">{section.section}</p>
              {section.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  to={link.to}
                  className="block p-2 hover:bg-blue-500 rounded-md"
                >
                  <div className="flex items-center">
                    <link.icon className="mr-2 text-xl" />
                    {sidebarOpen && <span>{link.label}</span>}
                  </div>
                </Link>
              ))}
            </div>
          ))}

        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
