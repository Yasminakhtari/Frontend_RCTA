// import React from 'react';
// import {  Link, useNavigate } from 'react-router-dom';
// //import Table, { SelectColumnFilter } from '@/components/Tables/Table';
// //import { useUserData } from '@/queries/userData';
// import { FaPlus, FaEdit, FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
// import baseUrl from '../../../Data/baseUrl.json';
// // C:\Users\sourabha\OneDrive\Desktop\Company Project\tenis-frontend\src\Data\baseUrl.json
// //import Table, { SelectColumnFilter } from '../../Tables/Table';
// import { useUserData } from '../../../queries/userData';

// const ListServices = () => {

//     const { data,refetch, isLoading, error } = useUserData();
//     const navigate = useNavigate();

//     const handleEdit = (id:any) => {
//         navigate(`editservice/${id}`);
//     };

//     const handleToggleStatus = (id:any, status:any) => {
//         const newStatus = status === 'Active' ? 'Inactive' : 'Active';
//         fetch(baseUrl.baseUrl + `/toggleStatus/${id}`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: newStatus,
//         })
//             .then((response) => response.json())
//             .then(() => alert(`Service status updated to ${newStatus}`))
//             .catch((error) => alert('Failed to update status'));
//         refetch();
//     };

//     const handleDelete = (id:any) => {
//         const confirmDelete = window.confirm('Are you sure you want to delete this service?');
//         if (confirmDelete) {
//             fetch(baseUrl.baseUrl + `/deleteIvblu/${id}`, {
//                 method: 'DELETE',
//             })
//                 .then(() => alert('Service deleted'))
//                 .catch(() => alert('Failed to delete service'));
//         }
//         refetch();
//     };
    

//     const columns = React.useMemo(
//         () => [
//             {
//                 Header: "Action",
//                 id: "action",
//                 accessor: "id",
//                 Cell: (row:any) => {
//                     const { id, status } = row.original;
//                     return (
//                         <div className="flex space-x-2">
//                             <button onClick={() => handleEdit(id)} className="text-blue-500"><FaEdit /></button>
//                             <button onClick={() => handleToggleStatus(id, status)} className="text-green-500">
//                                 {status === 'Active' ? <FaEye /> : <FaEyeSlash />}
//                             </button>
//                             {/* <button onClick={() => handleDelete(id)} className="text-red-500"><FaTrash /></button> */}
//                         </div>
//                     );
//                 },
//             },
//             { Header: 'Service ID', accessor: 'id' },
//             { Header: 'Group', accessor: 'groups', Filter: SelectColumnFilter, filter: 'includes' },
//             { Header: 'Category', accessor: 'category', Filter: SelectColumnFilter, filter: 'includes' },
//             { Header: 'Sub-Category', accessor: 'subcategory', Filter: SelectColumnFilter, filter: 'includes' },
//             { Header: 'Name', accessor: 'name' },
//             // { Header: 'Description', accessor: 'description' },
//             { Header: 'Duration', accessor: 'duration' },
//             { Header: 'Price', accessor: 'price' },
//             { Header: 'Discount (%)', accessor: 'discount' },
//             { Header: 'Discount Begin', accessor: 'disbegindate' },
//             { Header: 'Discount End', accessor: 'disenddate' },
//             { Header: 'Discount Quantity', accessor: 'disquantity' },
//             { Header: 'Status', accessor: 'status', Filter: SelectColumnFilter, filter: 'includes' },
//         ],
//         []
//     );

//     const tableData = React.useMemo(() => data?.allServices || [], [data]);

//     if (isLoading) return <div>Loading...</div>;
//     // if (error) return <div>Error: {error?.message}</div>;

//     return (
//         <div className="container mx-auto p-0">
//             <div className="flex justify-between items-center mb-4">
//                 <h1 className="text-2xl font-bold">All Services</h1>
//                 <div className='flex space-x-2'>
//                 <Link to="addservice">
//                     <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
//                         <FaPlus className="mr-2" /> Add Service
//                     </button>
//                 </Link>

                
//                 {/* <Link  onClick={refetch()}>
//                     <button className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
//                         Refresh
//                     </button>
//                 </Link> */}
//                 <Link to={''}>
//                     <button
//                         onClick={() => refetch()} // Wrap `refetch` in a function
//                         className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
//                     >
//                         Refresh
//                     </button>
//                 </Link>

//                 </div>
//             </div>
//             <Table columns={columns} data={tableData} />
//         </div>
//     );
// };

// export default ListServices;
import React from 'react'

const ListServices = () => {
  return (
    <div>ListServices</div>
  )
}

export default ListServices
