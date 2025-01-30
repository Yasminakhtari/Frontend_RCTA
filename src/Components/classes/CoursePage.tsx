// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../productpage/CartContext";
// import { getTennisSessionDetails } from "../../Services/TennisService";
// // Define a list of courses
// // const courses = [];
// interface Course {
//   id?: number;
//   category: string;
//   subcategory: string;
//   description: string;
//   price: number;
//   // Add other properties of the course if needed
// }

// const CoursePage: React.FC = () => {
//   const { id } = useParams<{ id: string }>(); // Retrieve course ID from URL
//   const navigate = useNavigate();
//   const { addToCart, isBooked } = useCart();
//   const sessionRef = useRef<HTMLDivElement | null>(null);
//   const [courses, setCourse] = useState<Course>({} as Course); // Initialize as an empty array
//   const [sessions, setSessions] = useState<any[]>([]); // State to store session details
//   const [loading, setLoading] = useState(true); // Loading state to handle async data fetching
//   const [isAnyBooked, setIsAnyBooked] = useState(false); // Track if any session is booked.

//   const [selectedPlayer, setSelectedPlayer] = useState<{ [key: number]: string }>({});
//   const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});
//   const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

//   const handlePlayerSelect = (sessionId: number, player: string) => {
//     setSelectedPlayer((prev) => ({ ...prev, [sessionId]: player }));
//     setDropdownOpen((prev) => ({ ...prev, [sessionId]: false })); // Close dropdown after selection
//   };
  
//   const toggleDropdown = (sessionId: number) => {
//     setDropdownOpen((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
//   };
  
  

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await getTennisSessionDetails(id);
//         console.log(data.tennisData.category)
//         setCourse(data.tennisData || {}); // Set course data as an array (in case of empty data)
//         setSessions(data.sessions || []); // Set session data as an array
//       } catch (error) {
//         console.error("Error fetching course details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchCourseDetails();
//     }
//   }, [id]);

//   // Find the course by ID
//   // const course = courses.find((course: { id: string | undefined }) => course.id === id);
//     // Update if any session is booked
//     useEffect(() => {
//       if (sessions.length > 0) {
//         const anySessionBooked = sessions.some((session: any) => isBooked(session.id));
//         setIsAnyBooked(anySessionBooked);
//       } else {
//         setIsAnyBooked(false);
//       }
//     }, [sessions, isBooked]);

//   const scrollToSessions = () => {
//     if (sessionRef.current) {
//       sessionRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // If course is not found, display a fallback message
//   if (!courses) {
//     return (
//       <div className="bg-gray-50 min-h-screen p-8 text-center">
//         <h1 className="text-4xl font-bold text-red-500">Course Not Found</h1>
//         <p className="text-gray-700 mt-4">The course you're looking for does not exist.</p>
//       </div>
//     );
//   }
//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
//         <p className="text-gray-700 text-lg font-semibold">Loading ...</p>
//       </div>
//     );
//   }

//   // const handleRegister = () => {
//   //   if (!isBooked(Number(courses.id))) {
//   //     addToCart({
//   //       id: Number(courses.id),
//   //       name: courses.subcategory,
//   //       price: courses.price,
//   //       description: "An amazing course to boost your skills!",
//   //       category: "Sports",
//   //       image: "/path/to/image", // Replace with actual image path
//   //     });
//   //     navigate("/cart");
//   //   }
//   // };
//   const handleRegister = (sessionId: number, courseId: number) => {
//     alert(" item added to cart successfully")
//     if (!isBooked(sessionId)) {
//       const selectedSession = sessions.find((session) => session.id === sessionId);
  
//       if (selectedSession) {
//         addToCart({
//           id: selectedSession.id,
//           courseId: courseId, // Send course ID
//           name: `${courses.subcategory} (${courses.category})` || "General", // Show course category as the name
//           price: selectedSession.price,
//           description: `Session with ${selectedSession.coachName || "TBD"}`,
//           category: "Sports",
//           image: "/path/to/image", // Replace with actual image path
//         });
//         setIsAnyBooked(true);
//         navigate("/cart");
//       }
//     }
//   };

//   // function handlePlayerSelect(id: any, player: string): void {
//   //   throw new Error("Function not implemented.");
//   // }

//   // function toggleDropdown(id: any): void {
//   //   throw new Error("Function not implemented.");
//   // }

//   // Always return a valid React element or null
//   return (
//     <div className="bg-white-500 min-h-screen p-8">
//       {/* Breadcrumb Navigation */}
//       <nav className="text-gray-500 text-sm mb-4">
//         <span>Classes</span> <span className="mx-2">&gt;</span>
//         <span>{courses.subcategory} ({courses.category || "No Category"})</span>
//       </nav>

//       {/* Course Title Section */}
//       <header className="mb-8 mt-16">
//         <h1 className="text-4xl font-extrabold text-gray-900">
//           {courses.subcategory} ({courses.category})
//         </h1>
//         <p className="text-gray-700 text-lg mt-2">
//           Learn more about
//           {courses.subcategory} ({courses.category})
//           and its sessions below.
//         </p>
//       </header>

//       {/* Tabs for Navigation */}
//       <div className="flex space-x-4 border-b border-gray-300 mb-6">
//         <button className="px-4 py-2 text-gray-900 border-b-2 border-blue-500 font-medium focus:outline-none">
//           Description
//         </button>
//         <button
//           className="px-4 py-2 text-gray-500 hover:text-gray-900 focus:outline-none"
//           onClick={scrollToSessions}
//         >
//           Sessions
//         </button>
//       </div>

//       {/* Course Description */}
//       <div className="mb-12">
//         <p className="text-gray-700 text-lg leading-relaxed"
//           dangerouslySetInnerHTML={{ __html: courses.description }}
//         />
//       </div>

//       {/* Session Details */}
//       <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

//         {/* Responsive Table Wrapper */}
//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Coach</th>
//                 <th className="border border-gray-300 px-4 py-2">Location</th>
//                 <th className="border border-gray-300 px-4 py-2">Start Date</th>
//                 <th className="border border-gray-300 px-4 py-2">End Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Days</th>
//                 <th className="border border-gray-300 px-4 py-2">Time</th>
//                 <th className="border border-gray-300 px-4 py-2">Price</th>
//                 <th className="border border-gray-300 px-4 py-2">Register</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sessions.length > 0 ? (
//                 sessions.map((session: any) => (
//                   <tr key={session.id}>
//                     <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {session.fromDate}
//                       </td>
//                     <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
//                     <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {/* {isBooked(session.id) ? (
//                         <button
//                           className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed"
//                           disabled
//                         >
//                           Booked
//                         </button>
//                       ) : isAnyBooked && !isBooked(session.id) ? (
//                         <button
//                           className="bg-gray-400 text-white px-4 py-2 rounded-md cursor-not-allowed"
//                           disabled
//                         >
//                           Disabled
//                         </button>
//                       ) : (
//                         <button
//                           className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                           onClick={() => handleRegister(session.id!, courses.id!)}
//                         >
//                           Register
//                         </button>
//                       )} */}

// <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[session.id] = el)}>
//                   <button
//                     onClick={() => toggleDropdown(session.id)}
//                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
//                   >
//                     <span>{selectedPlayer[session.id] || "Select"}</span>
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                     </svg>
//                   </button>

//                   {/* Dropdown Menu */}
//                   {dropdownOpen[session.id] && (
//                     <div className="absolute left-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
//                       {["Player 1", "Player 2", "Player 3"].map((player) => (
//                         <button
//                           key={player}
//                           onClick={() => handlePlayerSelect(session.id, player)}
//                           className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//                         >
//                           {player}
//                         </button>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//                        <button
//             className={`px-4 py-2 rounded-md text-white ${
//               isBooked(session.id)
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : isAnyBooked && !isBooked(session.id)
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-blue-500 hover:bg-blue-600"
//             }`}
//             disabled={isBooked(session.id) || (isAnyBooked && !isBooked(session.id))}
//             onClick={() => handleRegister(session.id!, courses.id!)}
//           >
//             {isBooked(session.id) ? "Booked" : "Register"}
//           </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="text-center py-4 text-gray-500">
//                     No sessions found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CoursePage;


import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../productpage/CartContext";
import { getTennisSessionDetails } from "../../Services/TennisService";

interface Course {
  id?: number;
  category: string;
  subcategory: string;
  description: string;
  price: number;
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isBooked } = useCart();
  const sessionRef = useRef<HTMLDivElement | null>(null);
  const [courses, setCourse] = useState<Course>({} as Course);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnyBooked, setIsAnyBooked] = useState(false);

  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: number]: string[] }>({});
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await getTennisSessionDetails(id);
        setCourse(data.tennisData || {});
        setSessions(data.sessions || []);
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

  useEffect(() => {
    if (sessions.length > 0) {
      const anySessionBooked = sessions.some((session) => isBooked(session.id));
      setIsAnyBooked(anySessionBooked);
    } else {
      setIsAnyBooked(false);
    }
  }, [sessions, isBooked]);

const scrollToSessions = () => {
  if (sessionRef.current) {
    sessionRef.current.scrollIntoView({ behavior: "smooth" });
  }
};

  const handlePlayerSelect = (sessionId: number, player: string) => {
    setSelectedPlayers((prev) => {
      const prevSelected = prev[sessionId] || [];
      if (prevSelected.includes(player)) {
        return { ...prev, [sessionId]: prevSelected.filter((p) => p !== player) };
      } else {
        return { ...prev, [sessionId]: [...prevSelected, player] };
      }
    });
  };

  const toggleDropdown = (sessionId: number) => {
    setDropdownOpen((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  //If course is not found, display a fallback message
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

  const handleRegister = (sessionId: number, courseId: number) => {
    alert(" item added to cart successfully")
    if (!isBooked(sessionId)) {
      const selectedSession = sessions.find((session) => session.id === sessionId);
      if (selectedSession) {
        addToCart({
          id: selectedSession.id,
          courseId: courseId,
          name: `${courses.subcategory} (${courses.category})` || "General",
          price: selectedSession.price,
          description: `Session with ${selectedSession.coachName || "TBD"}`,
          category: "Sports",
          image: "/path/to/image",
        });
        setIsAnyBooked(true);
        navigate("/cart");
      }
    }
  };

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

      <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Coach</th>
                <th className="border border-gray-300 px-4 py-2">Location</th>
                <th className="border border-gray-300 px-4 py-2">Start Date</th>
                <th className="border border-gray-300 px-4 py-2">End Date</th>
                <th className="border border-gray-300 px-4 py-2">Days</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Select Players</th>
                <th className="border border-gray-300 px-4 py-2">Register</th>
              </tr>
            </thead>
            <tbody>
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <tr key={session.id}>
                    <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session.fromDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
                    <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="relative inline-block text-left" ref={(el) => (dropdownRefs.current[session.id] = el)}>
                        <button
                          onClick={() => toggleDropdown(session.id)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
                        >
                          <span>
                            {selectedPlayers[session.id]?.length > 0
                              ? selectedPlayers[session.id].join(", ")
                              : "Select Players"}
                          </span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>

                        {dropdownOpen[session.id] && (
                          <div className="absolute left-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                            {["Player 1", "Player 2", "Player 3"].map((player) => (
                              <button
                                key={player}
                                onClick={() => handlePlayerSelect(session.id, player)}
                                className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedPlayers[session.id]?.includes(player)}
                                  readOnly
                                  className="mr-2"
                                />
                                {player}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className={`px-4 py-2 rounded-md text-white ${
                          isBooked(session.id)
                            ? "bg-gray-500 cursor-not-allowed"
                            : isAnyBooked && !isBooked(session.id)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={isBooked(session.id) || (isAnyBooked && !isBooked(session.id))}
                        onClick={() => handleRegister(session.id!, courses.id!)}
                      >
                        {isBooked(session.id) ? "Booked" : "Register"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
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
