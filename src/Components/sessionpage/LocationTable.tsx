// import React, { useState } from 'react';

// interface LocationData {
//   address: string;
//   city: string;
//   state: string;
//   zipcode: string;
// }

// const initialLocations: LocationData[] = [
//   { address: '123 Main St', city: 'Springfield', state: 'IL', zipcode: '62704' },
//   { address: '456 Oak Ave', city: 'Lincoln', state: 'NE', zipcode: '68508' },
//   { address: '789 Maple Dr', city: 'Madison', state: 'WI', zipcode: '53703' },
// ];

// const LocationTable: React.FC = () => {
//   const [locations, setLocations] = useState<LocationData[]>(initialLocations);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);
//     const filteredLocations = initialLocations.filter(
//       location =>
//         location.address.toLowerCase().includes(term) ||
//         location.city.toLowerCase().includes(term) ||
//         location.state.toLowerCase().includes(term) ||
//         location.zipcode.includes(term)
//     );
//     setLocations(filteredLocations);
//   };

//   return (
//     <div className="max-w-6xl min-h-screen mx-auto p-6 mt-16">
//       <h2 className="text-2xl font-bold mb-4">Location Table</h2>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={handleSearch}
//           className="w-1/2 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="min-w-full bg-white">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Address</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">City</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">State</th>
//               <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Zipcode</th>
//               <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {locations.map((location, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.address}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.city}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.state}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.zipcode}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-center">
//                   <button className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600">Edit</button>
//                   <button className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">Remove</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default LocationTable;


import React, { useState } from 'react';

interface LocationData {
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

const initialLocations: LocationData[] = [
  { address: '123 Main St', city: 'Springfield', state: 'IL', zipcode: '62704' },
  { address: '456 Oak Ave', city: 'Lincoln', state: 'NE', zipcode: '68508' },
  { address: '789 Maple Dr', city: 'Madison', state: 'WI', zipcode: '53703' },
];

const LocationTable: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>(initialLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<LocationData | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredLocations = initialLocations.filter(
      location =>
        location.address.toLowerCase().includes(term) ||
        location.city.toLowerCase().includes(term) ||
        location.state.toLowerCase().includes(term) ||
        location.zipcode.includes(term)
    );
    setLocations(filteredLocations);
  };

  const handleEditClick = (index: number) => {
    setEditingIndex(index);
    setEditFormData({ ...locations[index] });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    }
  };

  const handleEditSubmit = () => {
    if (editingIndex !== null && editFormData) {
      const updatedLocations = [...locations];
      updatedLocations[editingIndex] = editFormData;
      setLocations(updatedLocations);
      setEditingIndex(null);
      setEditFormData(null);
    }
  };

  const handleRemove = (index: number) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6 mt-16">
      <h2 className="text-2xl font-bold mb-4">Location List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/2 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">City</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Zipcode</th>
              <th className="px-6 py-3 text-center text-sm font-semibold uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {locations.map((location, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {editingIndex === index ? (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        name="address"
                        value={editFormData?.address || ''}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        name="city"
                        value={editFormData?.city || ''}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        name="state"
                        value={editFormData?.state || ''}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <input
                        type="text"
                        name="zipcode"
                        value={editFormData?.zipcode || ''}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={handleEditSubmit}
                        className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.zipcode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleRemove(index)}
                        className="ml-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationTable;

