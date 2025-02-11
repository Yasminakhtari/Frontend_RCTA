// import { useEffect, useState } from "react";
// import { getAllOrder, saveOrder } from "../../Services/OrderService";
// import { errorNotification, successNotification } from "../../Services/NotificationService";

// interface Order {
//   userId: any;
//   paymentMethod: any;
//   id: number;
//   userName: string;
//   mobileNo: string;
//   items: any;
//   total: string;
//   paymentStatus: string;
// }
// const PayTable = () => {

//   const [search, setSearch] = useState("");
//   const [data, setData] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // Fetch and filter orders
//   // Fetch all locations on component mount
//   const fetchOrder = async () => {
//     try {
//       setLoading(true);
//       const data = await getAllOrder();
//       // console.log(data.data)
//       // Ensure response data is an array and filter only 'contact' paymentMethod
//       const filteredOrders = Array.isArray(data?.data)
//         ? data.data.filter((item: { paymentMethod: string; }) => item.paymentMethod === "contact")
//         : [];

//       setData(filteredOrders);
//     } catch (error) {
//       console.error('Failed to fetch locations:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   // Call the function on component mount
//   useEffect(() => {
//     fetchOrder();
//   }, []);

//   // Toggle payment status between "Pay" and "Paid"
//   const handleTogglePay = async (id: number) => {
//     const updatedItem = data.find((item) => item.id === id);

//     if (updatedItem) {
//       // Log the item ID
//       console.log("Updating item with ID:", updatedItem);

//       try {
//         // Ensure items are properly formatted as an array
//         let formattedItems = updatedItem.items;

//         if (typeof formattedItems === "string") {
//           // Convert items string to valid JSON format
//           formattedItems = formattedItems
//             .replace(/(\w+)=/g, '"$1":') // Wrap keys with quotes
//             .replace(/:\s*([\w\s&()-]+)/g, ': "$1"') // Wrap string values in quotes
//             .replace(/"\s*([\d.]+)"/g, "$1"); // Remove quotes around numbers

//           // Parse the formatted string into an actual array
//           formattedItems = JSON.parse(formattedItems);
//           // });
//         }
//         // Prepare JSON payload
//         console.log((updatedItem?.items))
//         const payload = {
//           orderId:updatedItem.id, // Include orderId when present
//           userId: updatedItem.userId,
//           total: updatedItem.total,
//           paymentMethod: updatedItem.paymentMethod,
//           items: formattedItems, // Ensure it's sent as JSON
//         };

//         console.log("Sending Payload:", JSON.stringify(payload));

//         // Call the saveOrder function with JSON payload
//         const savedOrder = await saveOrder(JSON.stringify(payload));
//         console.log("Saved Order Response:", savedOrder);

//         successNotification("Success", "Payment Successfull");
//         fetchOrder();
//       } catch (error) {
//         console.error("Error saving order:", error);
//         errorNotification("Error", "Failed to save the order");
//       }
//     }

//   };

//   // Filter table data based on search input
//   const filteredData = data.filter(
//     (item) =>
//       (item.userName && item.userName.toLowerCase().includes(search.toLowerCase())) ||
//       (item.mobileNo && item.mobileNo.includes(search))
//   );


//   // function setCurrentPage(arg0: (prev: number) => number): void {
//   //   throw new Error("Function not implemented.");
//   // }

//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);
//   const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   return (
//     <div className="p-4 min-h-screen mt-5">
//       {/* Search Input */}
//       <input
//         type="text"
//         placeholder="Search by name or phone..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
//       />

//       <div className="overflow-x-auto">
//         {loading ? (
//           <p className="text-center text-gray-600">Loading orders...</p>
//         ) : (
//           <>
//           <table className="min-w-full bg-white">
//             <thead className="bg-blue-500 text-white">
//               <tr>
//                 <th className="border border-gray-500 p-2">Name</th>
//                 <th className="border border-gray-500 p-2">Phone No.</th>
//                 <th className="border border-gray-500 p-2">Details</th>
//                 <th className="border border-gray-500 p-2">Total Amount</th>
//                 <th className="border border-gray-500 p-2">Payment Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredData.length > 0 ? (
//                 filteredData.map((item, index) => (
//                   <tr key={index} className="text-center">
//                     <td className="border border-gray-500 p-2">{item?.userName || "N/A"}</td>
//                     <td className="border border-gray-500 p-2">{item?.mobileNo || "N/A"}</td>
//                     <td className="border border-gray-500 p-2 text-left">
//                       <ul className="list-disc pl-4 text-gray-700">
//                         {(() => {
//                           try {
//                             if (!item?.items) return [];

//                             let itemsString = item.items
//                               .replace(/=/g, ":")
//                               .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
//                               .replace(/:\s*([^",\[{][^,}]*)/g, ': "$1"')
//                               .replace(/"\s*,\s*"/g, '", "')
//                               .replace(/"name":\s*([^",\[{][^}]*)/g, (match: any, p1: string) => {
//                                 return `"name": "${p1.trim().replace(/"/g, '')}"`;
//                               })
//                               .replace(/,\s*([\]}])/g, '$1')
//                               .replace(/([{,]\s*)(".*?")\s*:\s*([\d.]+)/g, '$1$2: $3');
//                             const parsedItems = JSON.parse(itemsString);

//                             if (!Array.isArray(parsedItems)) {
//                               console.error("Parsed items is not an array:", parsedItems);
//                               return [];
//                             }

//                             return parsedItems.map((product, idx) => (
//                               <li key={idx}>
//                                 {product?.name || "Unknown Item"},
//                               </li>
//                             ));
//                           } catch (error) {
//                             console.error("Error parsing items:", item?.items, error);
//                             return [];
//                           }
//                         })()}
//                       </ul>
//                       <p className="text-sm text-gray-500">
//                         Total Items: {(() => {
//                           try {
//                             if (!item?.items) return 0;

//                             let itemsString = item.items
//                               .replace(/=/g, ":")
//                               .replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":')
//                               .replace(/:\s*([^",\[{][^,}]*)/g, ': "$1"')
//                               .replace(/"\s*,\s*"/g, '", "')
//                               .replace(/"name":\s*([^",\[{][^}]*)/g, (match: any, p1: string) => {
//                                 return `"name": "${p1.trim().replace(/"/g, '')}"`;
//                               })
//                               .replace(/,\s*([\]}])/g, '$1')
//                               .replace(/([{,]\s*)(".*?")\s*:\s*([\d.]+)/g, '$1$2: $3');
//                             const parsedItems = JSON.parse(itemsString);
//                             return Array.isArray(parsedItems) ? parsedItems.length : 0;
//                           } catch (error) {
//                             console.error("Error parsing total items:", error);
//                             return 0;
//                           }
//                         })()}
//                       </p>
//                     </td>
//                     <td className="border border-gray-500 p-2">${item?.total || "0"}</td>
//                     <td className="border border-gray-500 p-2">
//                   {item.paymentStatus === "Pending" ? (
//                     <button
//                       onClick={() => handleTogglePay(item.id)}
//                       className={`px-4 py-1 rounded ${item.paymentStatus === "Pending" ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}
//                     >
//                       Pay
//                     </button>
//                   ) : (
//                     <span className="text-green-500">Paid</span> // Show "Paid" when paymentStatus is not "Pending"
//                   )}
//                 </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="text-center p-4 text-gray-500">
//                     No orders found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//          {/* Pagination Controls */}
//          <div className="flex justify-center mt-4">
//          <button
//                 onClick={() => setCurrentPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 mx-1 border rounded bg-gray-200"
//               >
//                 Previous
//               </button>
//               <span className="px-3 py-1 mx-1">Page {currentPage} of {totalPages}</span>
//               <button
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 mx-1 border rounded bg-gray-200"
//               >
//                 Next
//               </button>
//        </div>
//        </> 
//         )}
//       </div>
//     </div>
//   );
// };


// export default PayTable;
import { useEffect, useState } from "react";
import { getAllOrder, saveOrder } from "../../Services/OrderService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

interface Order {
  userId: any;
  paymentMethod: any;
  id: number;
  userName: string;
  mobileNo: string;
  items: any;
  total: string;
  paymentStatus: string;
}

const PayTable = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Function to safely parse `items`
  const parseItems = (items: any) => {
    if (typeof items === "string") {
      try {
        let formattedItems = items
          .replace(/(\w+)=/g, '"$1":') // Wrap keys with quotes
          .replace(/:\s*([\w\s&()-]+)/g, ': "$1"') // Wrap string values in quotes
          .replace(/"\s*([\d.]+)"/g, "$1"); // Remove quotes around numbers

        return JSON.parse(formattedItems); // Convert to JSON
      } catch (error) {
        console.error("Error parsing items:", items, error);
        return []; // Return an empty array if parsing fails
      }
    }
    return items; // If already an array, return as is
  };

  // Fetch orders from API
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await getAllOrder();

      const filteredOrders = Array.isArray(response?.data)
        ? response.data
          .map((order: { items: any; }) => ({
            ...order,
            items: parseItems(order.items) // Convert items to JSON
          }))
          .filter((item: { paymentMethod: string; }) => item.paymentMethod === "contact")
        : [];

      setData(filteredOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // Toggle payment status
  const handleTogglePay = async (id: number) => {
    const updatedItem = data.find((item) => item.id === id);

    if (updatedItem) {
      console.log("Updating item with ID:", updatedItem);

      try {
        let formattedItems = parseItems(updatedItem.items);

        const payload = {
          orderId: updatedItem.id,
          userId: updatedItem.userId,
          total: updatedItem.total,
          paymentMethod: updatedItem.paymentMethod,
          items: formattedItems
        };

        console.log("Sending Payload:", JSON.stringify(payload));

        await saveOrder(JSON.stringify(payload));
        successNotification("Success", "Payment Successful");
        fetchOrder();
      } catch (error) {
        console.error("Error saving order:", error);
        errorNotification("Error", "Failed to save the order");
      }
    }
  };

  // Filter data based on search input
  const filteredData = data.filter(
    (item) =>
      (item.userName && item.userName.toLowerCase().includes(search.toLowerCase())) ||
      (item.mobileNo && item.mobileNo.includes(search))
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4 min-h-screen mt-5">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
      />

      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center text-gray-600">Loading orders...</p>
        ) : (
          <>
            <table className="min-w-full bg-white">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="border border-gray-500 p-2">Name</th>
                  <th className="border border-gray-500 p-2">Phone No.</th>
                  <th className="border border-gray-500 p-2">Details</th>
                  <th className="border border-gray-500 p-2">Total Amount</th>
                  <th className="border border-gray-500 p-2">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-500 p-2">{item?.userName || "N/A"}</td>
                      <td className="border border-gray-500 p-2">{item?.mobileNo || "N/A"}</td>
                      <td className="border border-gray-500 p-2 text-left">
                      <ul className="list-disc pl-4 text-gray-700">
  {item.items?.map((product: any, idx: number) => (
    <li key={idx} className="mb-2">
      <strong>{product?.name || "Unknown Item"}</strong>

      {/* Show Quantity & Price for Products, Price Only for Classes */}
      {product.groups === "Products" ? (
        <span className="text-gray-500"> (Qty: {product?.quantity || 1}, Price: ${product?.price || 0})</span>
      ) : (
        <span className="text-gray-500"> (Price: ${product?.price || 0})</span>
      )}

      {/* Display players if they exist */}
      {product.players && product.players.length > 0 && (
        <ul className="ml-4 text-gray-500 text-sm">
          <strong>Players:</strong>
          {product.players.map((player: any, pIdx: number) => (
            <li key={pIdx}>- {player.name}</li>
          ))}
        </ul>
      )}
    </li>
  ))}
</ul>


                        <p className="text-sm text-gray-500">
                          Total Items: {item.items ? item.items.length : 0}
                        </p>
                      </td>
                      <td className="border border-gray-500 p-2">${item?.total || "0"}</td>
                      <td className="border border-gray-500 p-2">
                        {item.paymentStatus === "Pending" ? (
                          <button
                            onClick={() => handleTogglePay(item.id)}
                            className="px-4 py-1 rounded bg-blue-600 text-white"
                          >
                            Pay
                          </button>
                        ) : (
                          <span className="text-green-500">Paid</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center p-4 text-gray-500" colSpan={5}>
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 mx-1 border rounded bg-gray-200"
              >
                Previous
              </button>
              <span className="px-3 py-1 mx-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 mx-1 border rounded bg-gray-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PayTable;
