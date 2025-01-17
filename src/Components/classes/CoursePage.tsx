import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../productpage/CartContext";
import { getTennisSessionDetails } from "../../Services/TennisService";
// Define a list of courses
// const courses = [];
interface Course {
  id?: number;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  // Add other properties of the course if needed
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Retrieve course ID from URL
  const navigate = useNavigate();
  const { addToCart, isBooked } = useCart();
  const sessionRef = useRef<HTMLDivElement | null>(null);
  const [courses, setCourse] = useState<Course>({} as Course); // Initialize as an empty array
  const [sessions, setSessions] = useState<any[]>([]); // State to store session details
  const [loading, setLoading] = useState(true); // Loading state to handle async data fetching

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await getTennisSessionDetails(id);
        console.log(data.tennisData.category)
        setCourse(data.tennisData || []); // Set course data as an array (in case of empty data)
        setSessions(data.sessions || []); // Set session data as an array
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourseDetails();
    }
  }, [id]);

  // Find the course by ID
  // const course = courses.find((course: { id: string | undefined }) => course.id === id);


  const scrollToSessions = () => {
    if (sessionRef.current) {
      sessionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // If course is not found, display a fallback message
  if (!courses) {
    return (
      <div className="bg-gray-50 min-h-screen p-8 text-center">
        <h1 className="text-4xl font-bold text-red-500">Course Not Found</h1>
        <p className="text-gray-700 mt-4">The course you're looking for does not exist.</p>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
        <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
      </div>
    );
  }

  // const handleRegister = () => {
  //   if (!isBooked(Number(courses.id))) {
  //     addToCart({
  //       id: Number(courses.id),
  //       name: courses.subcategory,
  //       price: courses.price,
  //       description: "An amazing course to boost your skills!",
  //       category: "Sports",
  //       image: "/path/to/image", // Replace with actual image path
  //     });
  //     navigate("/cart");
  //   }
  // };
  const handleRegister = (sessionId: number, courseId: number) => {
    alert(sessionId+" "+courseId)
    if (!isBooked(sessionId)) {
      const selectedSession = sessions.find((session) => session.id === sessionId);
  
      if (selectedSession) {
        addToCart({
          id: selectedSession.id,
          courseId: courseId, // Send course ID
          name: `${courses.subcategory} (${courses.category})` || "General", // Show course category as the name
          price: selectedSession.price,
          description: `Session with ${selectedSession.coachName || "TBD"}`,
          category: "Sports",
          image: "/path/to/image", // Replace with actual image path
        });
        navigate("/cart");
      }
    }
  };

  // Always return a valid React element or null
  return (
    <div className="bg-white-500 min-h-screen p-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-gray-500 text-sm mb-4">
        <span>Classes</span> <span className="mx-2">&gt;</span>
        <span>{courses.subcategory} ({courses.category || "No Category"})</span>
      </nav>

      {/* Course Title Section */}
      <header className="mb-8 mt-16">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {courses.subcategory} ({courses.category})
        </h1>
        <p className="text-gray-700 text-lg mt-2">
          Learn more about
          {courses.subcategory} ({courses.category})
          and its sessions below.
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
        <p className="text-gray-700 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: courses.description }}
        />
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
              {sessions.length > 0 ? (
                sessions.map((session: any) => (
                  <tr key={session.id}>
                    <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.fromDate}
                      </td>
                    <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
                    <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {isBooked(session.id) ? (
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
                          disabled
                        >
                          Booked
                        </button>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                          onClick={() => handleRegister(session.id!, courses.id!)}
                        >
                          Register
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};
export default CoursePage;
