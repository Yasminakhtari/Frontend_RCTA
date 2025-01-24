import React, { useEffect, useState } from 'react';
import LocationCard from './LocationCard';
import { getAllLocation } from '../../Services/LocationService';

// const locations = [
//   { name: 'Pleasent Hills', address: 'california', city: 'Los Angel', state: 'USA', zipcode: '15626' },
//   { name: 'test123', address: 'test1', city: 'test2', state: 'test3', zipcode: '212333' },
//   { name: 'Ekamra Kanan', address: 'Villa Square', city: 'Bhubaneswar', state: 'Odisha', zipcode: '751011' },
//   { name: 'Kalinga Stadium', address: 'Acharya Vihar1', city: 'BBSR', state: 'Odisha', zipcode: '755004' },
//   { name: 'USA', address: 'california', city: 'Los Angel', state: 'US', zipcode: '72345' },
// ];

// Define a TypeScript interface for the location object
interface Location {
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

//const initialLocations: locations[] = [];
const LocationCardPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

// Fetch all locations on component mount
const fetchLocations = async () => {
  try {
    setLoading(true);
    const data = await getAllLocation();
    console.log(data.data)
     // Filter the locations to include only those with status "active"
     const activeLocations = Array.isArray(data.data)
     ? data.data.filter((location: { status: string; }) => location.status === "active")
     : [];
    setLocations(activeLocations);
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

// const LocationCardPage = () => {
  return (
    <div className="p-10 mt-11 min-h-screen bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800">Location List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {locations.map((location, index) => (
          <div className="hover:scale-105 transform transition-transform duration-300" key={index}>
            <LocationCard

              locationName={location.locationName}
              address={location.address}
              city={location.city}
              state={location.state}
              zipCode={location.zipCode}

            />
          </div>
        ))}
      </div>
    </div>
  );
};


export default LocationCardPage;
