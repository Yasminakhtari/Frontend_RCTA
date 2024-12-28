import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface Row {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
  role: string;
  enrolledSession: string;
  sessionStartDate: string;
  sessionExpirationDate: string;
}

interface SelectedRole {
  id: number | null;
}

const List: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRole, setSelectedRole] = useState<SelectedRole>({ id: null });

  const rows: Row[] = [
    {
      id: 1,
      email: "sonu@example.com",
      firstName: "Sonu",
      lastName: "Sharma",
      mobile: "1234567890",
      role: "User",
      enrolledSession: "Completed",
      sessionStartDate: "2023-08-01",
      sessionExpirationDate: "2023-11-01",
    },
    {
      id: 2,
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      mobile: "9876543210",
      role: "Coach",
      enrolledSession: "Ongoing",
      sessionStartDate: "2023-09-01",
      sessionExpirationDate: "2023-12-01",
    },
    {
      id: 3,
      email: "subham@example.com",
      firstName: "Subham",
      lastName: "Kumar",
      mobile: "5555555555",
      role: "Coach",
      enrolledSession: "Upcoming",
      sessionStartDate: "2024-01-01",
      sessionExpirationDate: "2024-04-01",
    },
    {
      id: 4,
      email: "sonu@example.com",
      firstName: "Sonu",
      lastName: "Sharma",
      mobile: "1234567890",
      role: "User",
      enrolledSession: "Completed",
      sessionStartDate: "2023-08-01",
      sessionExpirationDate: "2023-11-01",
    },
    {
      id: 5,
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      mobile: "9876543210",
      role: "Coach",
      enrolledSession: "Ongoing",
      sessionStartDate: "2023-09-01",
      sessionExpirationDate: "2023-12-01",
    },
    {
      id: 6,
      email: "subham@example.com",
      firstName: "Subham",
      lastName: "Kumar",
      mobile: "5555555555",
      role: "Coach",
      enrolledSession: "Upcoming",
      sessionStartDate: "2024-01-01",
      sessionExpirationDate: "2024-04-01",
    },
    {
      id: 7,
      email: "sonu@example.com",
      firstName: "Sonu",
      lastName: "Sharma",
      mobile: "1234567890",
      role: "User",
      enrolledSession: "Completed",
      sessionStartDate: "2023-08-01",
      sessionExpirationDate: "2023-11-01",
    },
    {
      id: 8,
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      mobile: "9876543210",
      role: "Coach",
      enrolledSession: "Ongoing",
      sessionStartDate: "2023-09-01",
      sessionExpirationDate: "2023-12-01",
    },
    {
      id: 9,
      email: "subham@example.com",
      firstName: "Subham",
      lastName: "Kumar",
      mobile: "5555555555",
      role: "Coach",
      enrolledSession: "Upcoming",
      sessionStartDate: "2024-01-01",
      sessionExpirationDate: "2024-04-01",
    },
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedRole({ id });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRoleChange = (role: string) => {
    const updatedRows = rows.map((row) =>
      row.id === selectedRole.id ? { ...row, role } : row
    );
    console.log("Updated Roles:", updatedRows);
    setAnchorEl(null);
  };

  return (
    <TableContainer
      component={Paper}
      className="p-6 shadow-md rounded-lg bg-white border border-blueRibbon-950"
    >
      <Table>
        <TableHead>
          <TableRow className="bg-blueRibbon-900 ">

            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">Email</TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">First Name</TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">Last Name</TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">Mobile</TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">Role</TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">
              Enrolled Session
            </TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">
              Session Start Date
            </TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">
              Session Expiration Date
            </TableCell>
            <TableCell className="!text-xl !font-bold !text-blueRibbon-100">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              className="hover:bg-gray-50 transition duration-150"
            >
              <TableCell className="text-gray-800">{row.email}</TableCell>
              <TableCell className="text-gray-800">{row.firstName}</TableCell>
              <TableCell className="text-gray-800">{row.lastName}</TableCell>
              <TableCell className="text-gray-800">{row.mobile}</TableCell>
              <TableCell
                className={`text-sm font-bold px-2 py-1 rounded ${
                  row.role === "User"
                    ? "bg-pink-100 !text-pink-700"
                    : "bg-yellow-100 !text-yellow-700"
                }`}
              >
                {row.role}
              </TableCell>
              <TableCell
                className={`text-sm font-bold px-2 py-1 rounded ${
                  row.enrolledSession === "Completed"
                    ? "bg-green-100 !text-green-700"
                    : row.enrolledSession === "Ongoing"
                    ? "bg-blue-100 !text-blue-700"
                    : "bg-purple-100 !text-purple-700"
                }`}
              >
                {row.enrolledSession}
              </TableCell>
              <TableCell className="text-gray-800">
                {row.sessionStartDate}
              </TableCell>
              <TableCell className="text-gray-800">
                {row.sessionExpirationDate}
              </TableCell>
              <TableCell>
                <button
                  onClick={(e) => handleClick(e, row.id)}
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Change Role
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleRoleChange("User")}>User</MenuItem>
        <MenuItem onClick={() => handleRoleChange("Admin")}>Admin</MenuItem>
      </Menu>
    </TableContainer>
  );
};

export default List;
