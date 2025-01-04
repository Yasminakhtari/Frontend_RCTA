import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../productpage/CartContext";

// Define a list of courses
const courses = [
  { id: "1", title: "Tennis Foundations (for beginners)", price: 20 },
  { id: "2", title: "Rally Ready (for intermediate)", price: 25 },
  { id: "3", title: "Game Mastery (for advanced)", price: 30 },
  { id: "4", title: "Swing and Sweat (cardio-Focused)", price: 15 },
  { id: "5", title: "Group Clinic (for adults)", price: 18 },
  { id: "6", title: "Junior Aces (for kids & teens)", price: 22 },
  { id: "7", title: "Private Lesson", price: 50 },
  { id: "8", title: "Semi-Private Lesson", price: 40 },
];

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve course ID from URL
  const navigate = useNavigate();
  const { addToCart, isBooked } = useCart();
  const sessionRef = useRef<HTMLDivElement | null>(null);

  // Find the course by ID
  const course = courses.find((course) => course.id === id);

  const scrollToSessions = () => {
    if (sessionRef.current) {
      sessionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If course is not found, display a fallback message
  if (!course) {
    return (
      <div className="bg-gray-50 min-h-screen p-8 text-center">
        <h1 className="text-4xl font-bold text-red-500">Course Not Found</h1>
        <p className="text-gray-700 mt-4">The course you're looking for does not exist.</p>
      </div>
    );
  }

  const handleRegister = () => {
    if (!isBooked(Number(course.id))) {
      addToCart({
        id: Number(course.id),
        name: course.title,
        price: course.price,
        description: "An amazing course to boost your skills!",
        category: "Sports",
        image: "/path/to/image", // Replace with actual image path
      });
      navigate("/cart");
    }
  };

  return (
    <div className="bg-white-500 min-h-screen p-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-gray-500 text-sm mb-4">
        <span>Classes</span> <span className="mx-2">&gt;</span> <span>{course.title}</span>
      </nav>

      {/* Course Title Section */}
      <header className="mb-8 mt-16">
        <h1 className="text-4xl font-extrabold text-gray-900">{course.title}</h1>
        <p className="text-gray-700 text-lg mt-2">
          Learn more about {course.title} and its sessions below.
        </p>
      </header>

      {/* Tabs for Navigation */}
      <div className="flex space-x-4 border-b border-gray-300 mb-6">
        <button className="px-4 py-2 text-gray-900 border-b-2 border-blue-500 font-medium focus:outline-none">
          Description
        </button>
        <button
          className="px-4 py-2 text-gray-500 hover:text-gray-900 focus:outline-none"
          onClick={scrollToSessions}
        >
          Sessions
        </button>
      </div>

      {/* Course Description */}
      <div className="mb-12">
        <p className="text-gray-700 text-lg leading-relaxed">
          {course.title} offers an immersive experience to help you grow your skills
          in a supportive and engaging environment. Whether you're a beginner
          or looking to refine your skills, this course has something for
          everyone.
        </p>
      </div>

      {/* Session Details */}
      <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Coach</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Days</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Register</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Rafael Carbungco</td>
                <td className="border border-gray-300 px-4 py-2">Jan 1st, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Apr 30th, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Mon, Wed, Fri</td>
                <td className="border border-gray-300 px-4 py-2">5pm – 7pm</td>
                <td className="border border-gray-300 px-4 py-2">${course.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {isBooked(Number(course.id)) ? (
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Booked
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Rafael Carbungco</td>
                <td className="border border-gray-300 px-4 py-2">Jan 1st, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Apr 30th, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Mon, Wed, Fri</td>
                <td className="border border-gray-300 px-4 py-2">5pm – 7pm</td>
                <td className="border border-gray-300 px-4 py-2">${course.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {isBooked(Number(course.id)) ? (
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Booked
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Rafael Carbungco</td>
                <td className="border border-gray-300 px-4 py-2">Jan 1st, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Apr 30th, 2025</td>
                <td className="border border-gray-300 px-4 py-2">Mon, Wed, Fri</td>
                <td className="border border-gray-300 px-4 py-2">5pm – 7pm</td>
                <td className="border border-gray-300 px-4 py-2">${course.price.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {isBooked(Number(course.id)) ? (
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
                      disabled
                    >
                      Booked
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleRegister}
                    >
                      Register
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
