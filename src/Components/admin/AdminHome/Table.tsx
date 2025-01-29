import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getAllRoles, getAllUsers, updateUser } from "../../../Services/UserService";

interface Row {
  username: any;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  mobileNo: string;
  role: { id: number; name: string };
  enrolledSession: string;
  sessionStartDate: string;
  sessionExpirationDate: string;
}

interface Role {
  id: number;
  name: string;
}

interface SelectedRole {
  id: number | null;
}
const ITEMS_PER_PAGE = 10;
const List: React.FC = () => {
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [selectedRole, setSelectedRole] = useState<SelectedRole>({ id: null });
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRole, setSelectedRole] = useState<SelectedRole>({ id: null });
  const [roles, setRoles] = useState<Role[]>([]); // State for roles
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const filteredRows = rows.filter((row) =>
    (row.email?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (row.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (row.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (row.role?.name.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
    (row.mobileNo?.includes(searchQuery) ?? false)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTableData = filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch users
        const usersPromise = getAllUsers();

        // Fetch roles
        const rolesPromise = getAllRoles();

        const [usersResponse, rolesResponse] = await Promise.all([usersPromise, rolesPromise]);

        setRows(usersResponse.data); // Set users data
        setRoles(rolesResponse.data); // Set roles data
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search text or any filter changes
  }, [filteredRows]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    // setSelectedRole({ id });
    setSelectedUserId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  // if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  ;
  const handleRoleChange = async (roleId: number) => {
    if (selectedUserId === null) return;
    setIsUpdatingRole(true);
    try {
      const selectedUser = rows.find((row) => row.id === selectedUserId);
      if (!selectedUser) throw new Error("User not found");
  
      const updatedUser = {
        roleId,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        username: selectedUser.username,
        email: selectedUser.email,
      };
  
      await updateUser(selectedUserId, updatedUser);
  
      const usersResponse = await getAllUsers();
      setRows(usersResponse.data);
    } catch (error) {
      console.error("Error updating user role:", error);
      setError("Failed to update role. Please try again.");
    } finally {
      setIsUpdatingRole(false);
      handleClose();
    }
  };
  // const handleRoleChange = async (roleId: number) => {
  //   if (selectedUserId === null) return;

  //   try {
  //     // Find the selected user
  //     const selectedUser = rows.find((row) => row.id === selectedUserId);
  //     console.log(selectedUser)
  //     if (!selectedUser) throw new Error("User not found");

  //     // Map required fields for the API payload
  //     const updatedUser = {
  //       roleId,
  //       firstName: selectedUser.firstName,
  //       lastName: selectedUser.lastName,
  //       username: selectedUser.username, // Assuming `username` is same as `email`
  //       email: selectedUser.email,
  //     };

  //     // Call the API to update the user's role
  //     await updateUser(selectedUserId, updatedUser);
  //     // Fetch users again to update the state
  //     const usersResponse = await getAllUsers();
  //     setRows(usersResponse.data);

  //     console.log("User role updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating user role:", error);
  //     setError("Failed to update role. Please try again.");
  //   } finally {
  //     handleClose();
  //   }
  // };


  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
      </div>
    );
  }
  return (

    <div className=" p-4 mt-16 lg:mt-10">
      <style>
        {`
          /* Custom scrollbar styles */
          ::-webkit-scrollbar {
            width: 12px;
          }

          ::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #4CAF50; 
            border-radius: 10px;
            border: 3px solid #fff;
          }

          ::-webkit-scrollbar-thumb:hover {
            background-color: #45a049; 
          }

          ::-webkit-scrollbar-corner {
            background-color: #f0f0f0;
          }
        `}
      </style>
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border rounded p-2 w-full sm:w-1/4 mt-10 border-blue-950"
      />

      <TableContainer
        component={Paper}
        className="p-6 shadow-md rounded-lg bg-white border border-blueRibbon-950 overflow-y-auto  mt-8 md:mt-16" // Added overflow-y-auto to make sure scrollbar is enabled
      >
        <Table>
          <TableHead>
            <TableRow className="bg-blueRibbon-900">
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Email</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">First Name</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Last Name</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Mobile</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Role</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Enrolled Session</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Session Start Date</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Session Expiration Date</TableCell>
              <TableCell className="!text-lg sm:!text-xl !font-semibold !text-blueRibbon-100">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTableData.length > 0 ? (
              paginatedTableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.mobileNo}</TableCell>
                  <TableCell
                    className={`text-sm font-bold px-2 py-1 rounded ${row.role.name === "Admin"
                        ? "bg-red-100 text-red-700"
                        : row.role.name === "Coach"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                  >
                    {row.role.name}
                  </TableCell>
                  <TableCell
                  // className={`text-sm font-bold px-2 py-1 rounded ${
                  //   row.enrolledSession === "Completed"
                  //     ? "bg-green-100 text-green-700"
                  //     : row.enrolledSession === "Ongoing"
                  //     ? "bg-blue-100 text-blue-700"
                  //     : "bg-purple-100 text-purple-700"
                  // }`}
                  >
                    {row.enrolledSession}
                  </TableCell>
                  <TableCell>{row.sessionStartDate}</TableCell>
                  <TableCell>{row.sessionExpirationDate}</TableCell>
                  <TableCell>
                    {/* <button
            onClick={(e) => handleClick(e, row.id)}
            className={`px-4 py-2 text-white rounded text-sm sm:text-base ${
              row.role.name === "Admin"
                ? "bg-red-500 hover:bg-red-600"
                : row.role.name === "Coach"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Change Role
          </button> */}
                    <button
                      onClick={(e) => handleClick(e, row.id)}
                      className="px-4 py-1 text-white rounded text-sm sm:text-base bg-green-500 hover:bg-green-600"
                    >
                      Change Role
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} className="text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {roles.map((role) => (
            <MenuItem key={role.id} onClick={() => handleRoleChange(role.id)}>
              {role.name}
            </MenuItem>
          ))}
        </Menu>
      </TableContainer>
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"}`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default List;


