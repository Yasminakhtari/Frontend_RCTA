import React, { useEffect, useState } from 'react';
import { getAllLocation, getLocationById, saveLocation, updateLocation, updateLocationStatus } from '../../Services/LocationService';

interface LocationData {
  id?: any; // Optional to handle cases where ID might not exist initially
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: string;
}

const initialLocations: LocationData[] = [];



const LocationTable: React.FC = () => {
  const [locations, setLocations] = useState<LocationData[]>(initialLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<LocationData | null>(null);
  const [isNewLocation, setIsNewLocation] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);


  // Fetch all locations on component mount
  const fetchLocations = async () => {
    try {
      setLoading(true);
      const data = await getAllLocation();
      console.log(data.data)
      setLocations(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error('Failed to fetch locations:', error);
    } finally {
      setLoading(false);
    }
  };


  // Call fetchLocations in useEffect
  useEffect(() => {
    fetchLocations();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term === "") {
      // Fetch all data if the search box is cleared
      fetchLocations();
    } else {
      // Filter locations based on the search term
      const filteredLocations = locations.filter(location =>
        location.locationName.toLowerCase().includes(term) ||
        location.address.toLowerCase().includes(term) ||
        location.city.toLowerCase().includes(term) ||
        location.state.toLowerCase().includes(term) ||
        location.zipCode.includes(term)
      );
      setLocations(filteredLocations);
    }

  };

  const handleAddLocation = () => {
    const newLocation: LocationData = {
      locationName: '', address: '', city: '', state: '', zipCode: '', status: 'active',

    };
    setLocations([...locations, newLocation]);
    setEditFormData(newLocation);
    setEditingIndex(locations.length);
    setEditFormData(newLocation);
    setIsNewLocation(true);
  };

  const handleRemoveNewLocation = () => {
    if (editingIndex !== null) {
      const updatedLocations = locations.slice(0, editingIndex).concat(locations.slice(editingIndex + 1));
      setLocations(updatedLocations);
      setEditingIndex(null);
      setEditFormData(null);
    }
  };

  const handleEditClick = async (index: number) => {
    setEditingIndex(index);
    setIsNewLocation(false); // Mark as editing an existing location
    try {
      // Get the ID of the selected location
      const selectedLocation = locations[index];
      const id = selectedLocation?.id; // Assuming 'id' exists on the location object

      if (!id) {
        console.error('Location ID is not available');
        return;
      }

      // Fetch data from the server using getLocationById
      const fetchedData = await getLocationById(id);
      console.log('Fetched location data:', fetchedData);

      // Update the editFormData state with the fetched data
      setEditFormData({ ...fetchedData.data });
    } catch (error) {
      console.error('Failed to fetch location by ID:', error);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'zipCode' && (!/^\d*$/.test(value) || value.length > 6)) return;
    if (editFormData) {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleEditSubmit = async () => {
    if (editFormData) {
      try {
        if (isNewLocation) {
          // Save a new location
          const savedLocation = await saveLocation(editFormData);
          console.log('Location saved successfully:', savedLocation);

          alert('The location has been saved successfully!');
        } else {
          // Update an existing location
          const id = editFormData.id;
          if (!id) {
            console.error('Location ID is required for updating.');
            return;
          }

          const updatedLocation = await updateLocation(id, editFormData);
          console.log('Location updated successfully:', updatedLocation);

          alert('The location has been updated successfully!');
        }

        // Refresh locations and reset form state
        await fetchLocations();
        setEditingIndex(null);
        setEditFormData(null);
        setIsNewLocation(false);
      } catch (error) {
        console.error('Error saving/updating location:', error);
        alert('There was an issue saving or updating the location. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
      </div>
    );
  }


  // const toggleStatus = (index: number) => {
  //   const updatedLocations = [...locations];
  //   updatedLocations[index].isActive = !updatedLocations[index].isActive;
  //   setLocations(updatedLocations);
  // };
  const toggleStatus = async (index: number) => {
    const location = locations[index];
    if (!location.id) {
      alert('Invalid location ID.');
      return;
    }
  
    try {
      // Determine the new status
      const newStatus = location.status === 'active' ? 'inactive' : 'active';
  
      // Pass the id and new status as a payload
      await updateLocationStatus(location.id, newStatus);
  
      // Refresh the locations to reflect changes
      await fetchLocations();
      alert('Location status updated successfully!');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Error updating location status. Please try again.');
    }
  };
  


  return (
    <div className="max-w-6xl min-h-screen mx-auto p-6 mt-16">
      <h2 className="text-2xl font-bold mb-4">Locations</h2>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-1/3 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddLocation}
          className="px-3 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Add Location
        </button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Location Name</th>
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
                        name="locationName"
                        value={editFormData?.locationName || ''}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
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
                        name="zipCode"
                        maxLength={6}
                        value={editFormData?.zipCode || ''}
                        onChange={handleEditChange}
                        className="w-full px-2 py-1 border rounded"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex space-x-2 justify-center">
                        <button
                          onClick={handleEditSubmit}
                          className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          {isNewLocation ? 'Save' : 'Update'}
                        </button>
                        {isNewLocation && (
                        <button
                          onClick={handleRemoveNewLocation}
                          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                        )}
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.locationName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{location.zipCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center flex space-x-2">
                      <button
                        onClick={() => handleEditClick(index)}
                        className="px-3 py-1 text-white bg-yellow-500 rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      {/* <button
                        onClick={() => toggleStatus(index)}
                        className={`px-3 py-1 text-white rounded w-20 ${
                          location.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        {location.isActive ? 'Inactive' : 'Active'}
                      </button> */}
                      <button
                        onClick={() => toggleStatus(index)}
                        className={`px-2 py-1 rounded ${location.status === 'active' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                          }`}
                      >
                        {location.status === 'active' ? 'Active' : 'Inactive'}
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