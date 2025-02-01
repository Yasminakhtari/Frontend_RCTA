// import { useState } from "react";

// const PayTable = () => {
//   const [search, setSearch] = useState("");
//   const [data, setData] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       phone: "123-456-7890",
//       details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
//       totalAmount: "$50",
//       paymentStatus: "Pending",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       phone: "987-654-3210",
//       details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
//       totalAmount: "$30",
//       paymentStatus: "Pending",
//     },
//     {
//       id: 3,
//       name: "Alice Johnson",
//       phone: "555-666-7777",
//       details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
//       totalAmount: "$80",
//       paymentStatus: "Pending",
//     },
//     {
//       id: 4,
//       name: "Bob Brown",
//       phone: "111-222-3333",
//       details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
//       totalAmount: "$20",
//       paymentStatus: "Pending",
//     },
//     {
//       id: 5,
//       name: "Charlie Green",
//       phone: "444-555-6666",
//       details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
//       totalAmount: "$60",
//       paymentStatus: "Pending",
//     },
//   ]);

//   const handlePay = (id: number) => {
//     setData((prevData) =>
//       prevData.map((item) =>
//         item.id === id ? { ...item, paymentStatus: "Paid" } : item
//       )
//     );
//   };

//   const filteredData = data.filter(
//     (item) =>
//       item.name.toLowerCase().includes(search.toLowerCase()) ||
//       item.phone.includes(search)
//   );

//   return (
//     <div className="p-4 min-h-screen mt-20">
//       <input
//         type="text"
//         placeholder="Search by name or phone..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
//       />
//       <div className="overflow-x-auto">
//         <table className="min-w-full border-collapse border border-blue-500">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="border border-blue-500 p-2">Name</th>
//               <th className="border border-blue-500 p-2">Phone No.</th>
//               <th className="border border-blue-500 p-2">Details</th>
//               <th className="border border-blue-500 p-2">Total Amount</th>
//               <th className="border border-blue-500 p-2">Payment Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={index} className="text-center">
//                 <td className="border border-blue-500 p-2">{item.name}</td>
//                 <td className="border border-blue-500 p-2">{item.phone}</td>
//                 <td className="border border-blue-500 p-2 text-left">
//                   <ul className="list-disc pl-4 text-blue-700">
//                     {item.details.map((product, idx) => (
//                       <li key={idx}>{product}</li>
//                     ))}
//                   </ul>
//                   <p className="text-sm text-gray-500">Total Items: {item.details.length}</p>
//                 </td>
//                 <td className="border border-blue-500 p-2">{item.totalAmount}</td>
//                 <td className="border border-blue-500 p-2">
//                   {item.paymentStatus === "Pending" ? (
//                     <button
//                       onClick={() => handlePay(item.id)}
//                       className="bg-blue-600 text-white px-4 py-1 rounded"
//                     >
//                       Pay
//                     </button>
//                   ) : (
//                     <span className="text-green-600 font-semibold">Paid</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PayTable;

import { useState } from "react";

const PayTable = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "123-456-7890",
      details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
      totalAmount: "$50",
      paymentStatus: "Pay", // Initially "Pay"
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "987-654-3210",
      details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
      totalAmount: "$30",
      paymentStatus: "Pay",
    },
    {
      id: 3,
      name: "Alice Johnson",
      phone: "555-666-7777",
      details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
      totalAmount: "$80",
      paymentStatus: "Pay",
    },
    {
      id: 4,
      name: "Bob Brown",
      phone: "111-222-3333",
      details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
      totalAmount: "$20",
      paymentStatus: "Pay",
    },
    {
      id: 5,
      name: "Charlie Green",
      phone: "444-555-6666",
      details: ["pure Aerro", "ball", "Tennis Foundations (for beginners)"],
      totalAmount: "$60",
      paymentStatus: "Pay",
    },
  ]);

  // Toggle payment status between "Pay" and "Paid"
  const handleTogglePay = (id: number) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, paymentStatus: item.paymentStatus === "Pay" ? "Paid" : "Pay" }
          : item
      )
    );
  };

  // Filter table data based on search input
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  return (
    <div className="p-4 min-h-screen mt-20">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-blue-500">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="border border-blue-500 p-2">Name</th>
              <th className="border border-blue-500 p-2">Phone No.</th>
              <th className="border border-blue-500 p-2">Details</th>
              <th className="border border-blue-500 p-2">Total Amount</th>
              <th className="border border-blue-500 p-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-blue-500 p-2">{item.name}</td>
                <td className="border border-blue-500 p-2">{item.phone}</td>
                <td className="border border-blue-500 p-2 text-left">
                  <ul className="list-disc pl-4 text-blue-700">
                    {item.details.map((product, idx) => (
                      <li key={idx}>{product}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-500">Total Items: {item.details.length}</p>
                </td>
                <td className="border border-blue-500 p-2">{item.totalAmount}</td>
                <td className="border border-blue-500 p-2">
                  <button
                    onClick={() => handleTogglePay(item.id)}
                    className={`px-4 py-1 rounded ${
                      item.paymentStatus === "Pay"
                        ? "bg-blue-600 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {item.paymentStatus}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayTable;


