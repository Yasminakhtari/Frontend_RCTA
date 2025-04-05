import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, TextInput } from "@mantine/core";
import { IconArrowUp, IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { base_url } from "../../apiConfig";
import { getAllLocation } from '../../Services/LocationService';

interface Location {
  id: number;
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  status: string;
}

interface ImageData {
  id: number;
  imgUrl: string;
  category: string;
  subcategory: string;
}

const Home1 = () => {
  const navigate = useNavigate();
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mainImage, setMainImage] = useState<ImageData | null>(null);
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getAllLocation();
        setLocations(response.data.filter((loc: Location) => loc.status === 'active'));
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await axios.get(`${base_url}/v1/getFilteredTennis`, {
          params: { groups: "Home" }
        });
        const mainImage = response.data.find((item: any) =>
          item.category === "Gallery" && item.subcategory === "Main Image"
        );
        setMainImage(mainImage || null);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImageData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center min-h-[90vh] gap-10 lg:gap-5 pt-4 px-5 mt-14 md:mt-9">
      {/* Left Section */}
      <div className="flex flex-col lg:w-[45%]">
        <div className="text-5xl mt-8 lg:text-6xl font-bold text-mine-shaft-100 leading-tight [&>span]:text-blueRibbon-900">
          Join the <span>Ultimate Tennis</span> Experience
        </div>

        {/* Location Search Section */}
        <div className="flex flex-col lg:flex-row gap-3 mt-5">
          <select
            value={selectedLocation || ''}
            onChange={(e) => setSelectedLocation(Number(e.target.value))}
            className="bg-blueRibbon-900 rounded-lg p-2 text-mine-shaft-100"
          >
            <option value="">Select Location</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.locationName}, {location.city}
              </option>
            ))}
          </select>
          <button
            onClick={() => selectedLocation && setShowLocationModal(true)}
            className="flex items-center justify-center h-12 w-32 bg-blueRibbon-600 text-mine-shaft-100 rounded-lg p-2 hover:bg-blueRibbon-500"
          >
            Search
          </button>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-[55%] flex flex-col items-center">
        <div className="w-full lg:w-[30rem] relative">
          <img
            className="rounded-lg object-cover w-full"
            src={mainImage?.imgUrl || "/tennis.png"}
            alt="Tennis club"
          />
        </div>
      </div>

      {/* Location Results Modal */}
      {showLocationModal && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-bold mb-4">
              {locations.find(l => l.id === selectedLocation)?.locationName}
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Sessions</h3>
                <button 
                  onClick={() => {
                    navigate(`/manage?location=${selectedLocation}`);
                    setShowLocationModal(false);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  View All Sessions →
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Classes</h3>
                <button
                  onClick={() => {
                    navigate(`/classes?location=${selectedLocation}`);
                    setShowLocationModal(false);
                  }}
                  className="text-blue-600 hover:underline"
                >
                  View All Classes →
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Tournaments</h3>
                <p className="text-gray-600">No tournaments available</p>
              </div>
            </div>

            <button
              onClick={() => setShowLocationModal(false)}
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 bg-blueRibbon-600 text-mine-shaft-100 p-3 rounded-full shadow-lg hover:bg-blueRibbon-500"
        >
          <IconArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default Home1;