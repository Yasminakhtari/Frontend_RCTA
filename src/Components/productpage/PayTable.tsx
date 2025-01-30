import { useState } from "react";

const PayTable = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "John Doe", phone: "123-456-7890", totalItems: 5, totalAmount: "$50" },
    { id: 2, name: "Jane Smith", phone: "987-654-3210", totalItems: 3, totalAmount: "$30" },
    { id: 3, name: "Alice Johnson", phone: "555-666-7777", totalItems: 8, totalAmount: "$80" },
    { id: 4, name: "Bob Brown", phone: "111-222-3333", totalItems: 2, totalAmount: "$20" },
    { id: 5, name: "Charlie Green", phone: "444-555-6666", totalItems: 6, totalAmount: "$60" },
  ]);

  const handlePay = (name: string) => {
    alert(`Payment processing for ${name}`);
  };

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.phone.includes(search)
  );

  return (
    <div className="p-4 min-h-screen mt-20">
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
              <th className="border border-blue-500 p-2">Total Items</th>
              <th className="border border-blue-500 p-2">Total Amount</th>
              <th className="border border-blue-500 p-2">Pay</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center">
                <td className="border border-blue-500 p-2">{item.name}</td>
                <td className="border border-blue-500 p-2">{item.phone}</td>
                <td className="border border-blue-500 p-2">{item.totalItems}</td>
                <td className="border border-blue-500 p-2">{item.totalAmount}</td>
                <td className="border border-blue-500 p-2">
                  <button
                    onClick={() => handlePay(item.name)}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                  >
                    Pay
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
