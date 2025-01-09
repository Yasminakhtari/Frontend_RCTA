import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../apiConfig";
import axios from "axios";

interface ClassSession {
  id: number;
  groups: string;
  category: string;
  subcategory: string;
  imgUrl: string;
  name: string | null;
  description: string | null;
  duration: number | null;
  price: number | null;
  status: string | null;
  discount: number;
  disbegindate: string | null;
  disenddate: string | null;
  disquantity: number | null;
  phoneNumber: string | null;
}

const Classes: React.FC = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState<ClassSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${base_url}/v1/getFilteredTennis`, {
          params: {
            group: "Classes",
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        setCourses(response.data);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to load classes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-gray-700 text-lg font-semibold">Loading classes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-red-100 to-red-200">
        <p className="text-red-600 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-50 min-h-screen p-8">
      {/* Header Section */}
      <header className="text-center mb-12 mt-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Explore Our Classes
        </h1>
        <p className="text-gray-700 text-lg mt-2 max-w-xl mx-auto">
          Discover a variety of classes to enhance your skills and achieve your goals.
        </p>
      </header>

      {/* Courses Grid Section */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col md:flex-row items-stretch"
          >
            {/* Image Section */}
            <div className="relative md:w-1/3 h-48 md:h-auto">
              <img
                src={course.imgUrl || "/tennisclass.jpg"}
                alt={course.name || "Course Illustration"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"></div>
            </div>

            {/* Details Section */}
            <div className="p-6 flex-grow flex flex-col justify-between md:w-2/3">
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                {course.subcategory || "Untitled Course"}
                <span className="text-gray-500 text-sm ml-2">({course.category})</span>
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                Duration: {course.duration ? `${course.duration} minutes` : "N/A"}
              </p>
              <button
                className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-2 rounded-md shadow-md hover:from-blue-600 hover:to-teal-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 flex justify-center items-center w-full"
                onClick={() => navigate(`/coursepage/${course.id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
