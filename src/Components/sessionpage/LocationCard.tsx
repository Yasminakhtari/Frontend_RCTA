import React from 'react';

interface LocationCardProps {
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const LocationCard: React.FC<LocationCardProps> = ({ locationName, address, city, state, zipCode }) => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2">{locationName}</h3>
      <p className="text-sm">{address}</p>
      <p className="text-sm">
        {city}, {state}
      </p>
      <p className="text-sm">ZIP: {zipCode}</p>
    </div>
  );
};

export default LocationCard;


