// import React, { useState } from 'react';
// import {
//   AccountCircleOutlined,
//   Dashboard,
//   ExitToApp,
//   SportsTennis,
//   Group,
//   Event,
//   SettingsApplicationsOutlined,
//   InsertChart,
//   NotificationsNoneOutlined,
//   PsychologyOutlined,
//   TableBar,
//   AddLocation,
//   Payment,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { IconUser } from '@tabler/icons-react';

// interface AdminSidebarProps {
//   onClose: () => void; // Define onClose as a prop
// }

// // const AdminSidebar = () => {
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
  

//   // Array of menu sections and their links
//   const menuItems = [
//     {
//       section: 'Main',
//       links: [
//         { to: 'dashboard', icon: Dashboard, label: 'Dashboard' },
//         { to: 'servicetable', icon: TableBar, label: 'Service Table' },
//         { to: 'manage', icon: TableBar, label: 'Session Table' },
//         { to: 'alluser', icon: IconUser, label: 'Get All Users' },
//         { to: 'locationtable', icon: AddLocation, label: 'Locations' },
//         { to: 'paytable', icon: Payment, label: 'Pending Payment' },
//       ],
//     },
//     {
//       section: 'Management',
//       links: [
//         { to: 'members', icon: Group, label: 'Members' },
//         { to: 'players', icon: SportsTennis, label: 'Players' },
//         { to: 'tournaments', icon: Event, label: 'Tournaments' },
//       ],
//     },
//     {
//       section: 'Useful',
//       links: [
//         { to: '404', icon: InsertChart, label: 'Stats' },
//         { to: 'notifications', icon: NotificationsNoneOutlined, label: 'Notifications' },
//       ],
//     },
//     {
//       section: 'Service',
//       links: [
//         { to: 'logs', icon: PsychologyOutlined, label: 'Logs' },
//         { to: 'settings', icon: SettingsApplicationsOutlined, label: 'Settings' },
//       ],
//     },
//     {
//       section: 'User',
//       links: [
//         { to: 'profile', icon: AccountCircleOutlined, label: 'Profile' },
//         { to: 'logout', icon: ExitToApp, label: 'Logout' },
//       ],
//     },
//   ];

//   const handleContainerClick = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent clicks inside the sidebar from closing it
//   };


//   return (
//     <div className="flex h-screen "onClick={onClose}>
//       {/* Sidebar Container */}
//       <div
//         className={`bg-gray-900 text-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
//           sidebarOpen ? 'w-64' : 'w-16'
//         }`}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-4">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="text-red-700 text-3xl focus:outline-none md:hidden"
//             aria-label="Toggle Sidebar"
//           >
//             {sidebarOpen ? '×' : '☰'}
//           </button>
          
//           {/* Added close button for the parent component */}
//           <button
//             onClick={onClose} // Close sidebar when this button is clicked
//             className="text-white md:hidden"
//           >
//             ×
//           </button>
//         </div>

//         {/* Sidebar Items */}
//         <nav className="flex-1 px-2 space-y-4 overflow-y-auto">

//           {menuItems.map((section, index) => (
//             <div key={index}>
//               <p className="text-xs uppercase text-gray-400 mb-2">{section.section}</p>
//               {section.links.map((link, linkIndex) => (
//                 <Link
//                   key={linkIndex}
//                   to={link.to}
//                   className="block p-2 hover:bg-blue-500 rounded-md"
//                   onClick={onClose} // Close sidebar when a link is clicked
//                 >
//                   <div className="flex items-center">
//                     <link.icon className="mr-2 text-xl" />
//                     {sidebarOpen && <span>{link.label}</span>}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ))}

//         </nav>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   AccountCircleOutlined,
//   Dashboard,
//   ExitToApp,
//   SportsTennis,
//   Group,
//   Event,
//   SettingsApplicationsOutlined,
//   InsertChart,
//   NotificationsNoneOutlined,
//   PsychologyOutlined,
//   TableBar,
//   AddLocation,
//   Payment,
// } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { IconUser } from '@tabler/icons-react';

// interface AdminSidebarProps {
//   onClose: () => void; // Define onClose as a prop
// }

// const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(() => {
//     const savedState = localStorage.getItem('sidebarOpen');
//     return savedState ? JSON.parse(savedState) : true;
//   });

//   const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar

//   // Save the sidebar state to localStorage when toggled
//   const toggleSidebar = () => {
//     const newState = !sidebarOpen;
//     setSidebarOpen(newState);
//     localStorage.setItem('sidebarOpen', JSON.stringify(newState)); // Save state to localStorage
//   };

//   // Handle clicks outside the sidebar without stopping button actions
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
//         setSidebarOpen(false); // Close sidebar temporarily
//         onClose(); // Close action from props
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [onClose]);

//   // Menu items
//   const menuItems = [
//     {
//       section: 'Main',
//       links: [
//         { to: 'dashboard', icon: Dashboard, label: 'Dashboard' },
//         { to: 'servicetable', icon: TableBar, label: 'Service Table' },
//         { to: 'manage', icon: TableBar, label: 'Session Table' },
//         { to: 'alluser', icon: IconUser, label: 'Get All Users' },
//         { to: 'locationtable', icon: AddLocation, label: 'Locations' },
//         { to: 'paytable', icon: Payment, label: 'Pending Payment' },
//       ],
//     },
//     {
//       section: 'Management',
//       links: [
//         { to: 'members', icon: Group, label: 'Members' },
//         { to: 'players', icon: SportsTennis, label: 'Players' },
//         { to: 'tournaments', icon: Event, label: 'Tournaments' },
//       ],
//     },
//     {
//       section: 'Useful',
//       links: [
//         { to: '404', icon: InsertChart, label: 'Stats' },
//         { to: 'notifications', icon: NotificationsNoneOutlined, label: 'Notifications' },
//       ],
//     },
//     {
//       section: 'Service',
//       links: [
//         { to: 'logs', icon: PsychologyOutlined, label: 'Logs' },
//         { to: 'settings', icon: SettingsApplicationsOutlined, label: 'Settings' },
//       ],
//     },
//     {
//       section: 'User',
//       links: [
//         { to: 'profile', icon: AccountCircleOutlined, label: 'Profile' },
//         { to: 'logout', icon: ExitToApp, label: 'Logout' },
//       ],
//     },
//   ];

//   // Prevent sidebar from closing when clicking inside
//   const handleContainerClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar Container */}
//       <div
//         ref={sidebarRef}
//         className={`bg-gray-900 text-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
//           sidebarOpen ? 'w-64' : 'w-16'
//         }`}
//         onClick={handleContainerClick}
//       >
//         {/* Sidebar Header */}
//         <div className="flex items-center justify-between p-4">
//           <button
//             onClick={toggleSidebar}
//             className="text-red-700 text-3xl focus:outline-none md:hidden"
//             aria-label="Toggle Sidebar"
//           >
//             {sidebarOpen ? '×' : '☰'}
//           </button>

//           {/* Close Button for Mobile View */}
//           <button
//             onClick={onClose}
//             className="text-white md:hidden"
//           >
//             ×
//           </button>
//         </div>

//         {/* Sidebar Items */}
//         <nav className="flex-1 px-2 space-y-4 overflow-y-auto">
//           {menuItems.map((section, index) => (
//             <div key={index}>
//               <p className="text-xs uppercase text-gray-400 mb-2">{section.section}</p>
//               {section.links.map((link, linkIndex) => (
//                 <Link
//                   key={linkIndex}
//                   to={link.to}
//                   className="block p-2 hover:bg-blue-500 rounded-md"
//                   onClick={onClose} // Close sidebar on link click
//                 >
//                   <div className="flex items-center">
//                     <link.icon className="mr-2 text-xl" />
//                     {sidebarOpen && <span>{link.label}</span>}
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ))}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

import React, { useState, useEffect, useRef } from 'react';
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
  Payment,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconUser } from '@tabler/icons-react';

interface AdminSidebarProps {
  onClose: () => void; // Define onClose as a prop
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Default to closed on refresh

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar

  // Save the sidebar state to localStorage when toggled
  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
  };

  // Handle clicks outside the sidebar without stopping button actions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setSidebarOpen(false); // Close sidebar temporarily
        onClose(); // Close action from props
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Menu items
  const menuItems = [
    {
      section: 'Main',
      links: [
        { to: 'dashboard', icon: Dashboard, label: 'Dashboard' },
        { to: 'servicetable', icon: TableBar, label: 'Service Table' },
        { to: 'manage', icon: TableBar, label: 'Session Table' },
        { to: 'alluser', icon: IconUser, label: 'Get All Users' },
        { to: 'locationtable', icon: AddLocation, label: 'Locations' },
        { to: 'paytable', icon: Payment, label: 'Pending Payment' },
      ],
    },
    {
      section: 'Management',
      links: [
        { to: 'members', icon: Group, label: 'Members' },
        { to: 'players', icon: SportsTennis, label: 'Players' },
        { to: 'tournaments', icon: Event, label: 'Tournaments' },
      ],
    },
    {
      section: 'Useful',
      links: [
        { to: '404', icon: InsertChart, label: 'Stats' },
        { to: 'notifications', icon: NotificationsNoneOutlined, label: 'Notifications' },
      ],
    },
    {
      section: 'Service',
      links: [
        { to: 'logs', icon: PsychologyOutlined, label: 'Logs' },
        { to: 'settings', icon: SettingsApplicationsOutlined, label: 'Settings' },
      ],
    },
    {
      section: 'User',
      links: [
        { to: 'profile', icon: AccountCircleOutlined, label: 'Profile' },
        { to: 'logout', icon: ExitToApp, label: 'Logout' },
      ],
    },
  ];

  // Prevent sidebar from closing when clicking inside
  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar Container */}
      <div
        ref={sidebarRef}
        className={`bg-gray-900 text-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-16'
        }`}
        onClick={handleContainerClick}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4">
          <button
            onClick={toggleSidebar}
            className="text-red-700 text-3xl focus:outline-none md:hidden"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? '×' : '☰'}
          </button>

          {/* Close Button for Mobile View */}
          <button
            onClick={onClose}
            className="text-white md:hidden"
          >
            ×
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
                  onClick={onClose} // Close sidebar on link click
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
