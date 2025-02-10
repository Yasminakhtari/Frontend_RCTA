// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../productpage/CartContext";
// import { getTennisSessionDetails } from "../../Services/TennisService";
// import { getAllPlayers } from "../../Services/PlayerService";
// import { useSelector } from "react-redux";


// interface Course {
//   id?: number;
//   category: string;
//   subcategory: string;
//   description: string;
//   price: number;
//   groups:string;
// }





// const CoursePage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const user = useSelector((state:any) => state.user);
//   const navigate = useNavigate();
//   const { addToCart, isBooked } = useCart();
//   const sessionRef = useRef<HTMLDivElement | null>(null);
//   const [courses, setCourse] = useState<Course>({} as Course);
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAnyBooked, setIsAnyBooked] = useState(false);
//   const [players, setPlayers] = useState<any[]>([]);

//   const [selectedPlayers, setSelectedPlayers] = useState<{ [key: number]: string[] }>({});
//   const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});
//   const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         console.log("get Tennis Session Details id is " + id);
//         const data = await getTennisSessionDetails(id);
//         setCourse(data.tennisData || {});
//         setSessions(data.sessions || []);
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

//   useEffect(() => {
//     if (sessions.length > 0) {
//       const anySessionBooked = sessions.some((session) => isBooked(session.id));
//       setIsAnyBooked(anySessionBooked);
//     } else {
//       setIsAnyBooked(false);
//     }
//   }, [sessions, isBooked]);

// const scrollToSessions = () => {
//   if (sessionRef.current) {
//     sessionRef.current.scrollIntoView({ behavior: "smooth" });
//   }
// };

// useEffect(() => {
//   const fetchPlayers = async () => {
//       try {

//           // const userId = userData?.userDetails?.id;
//           const userId = user?.data?.userDetails?.id;
//           const response = await getAllPlayers(userId);
//           const playerData = response?.data;
//           console.log(playerData)
//           if (playerData) {
//               setPlayers(playerData);
//           }
//           else {
//               console.error("Expected an array, but received:", playerData);
//               setPlayers([]);
//           }
//       } catch (error) {
//           console.log(error)
//           console.error("Failed to fetch Players", error);
//       }
//   };

//   fetchPlayers();
// }, [user?.data?.userDetails?.id]);

//   const handlePlayerSelect = (sessionId: number, player: string) => {
//     setSelectedPlayers((prev) => {
//       const prevSelected = prev[sessionId] || [];
//       if (prevSelected.includes(player)) {
//         return { ...prev, [sessionId]: prevSelected.filter((p) => p !== player) };
//       } else {
//         return { ...prev, [sessionId]: [...prevSelected, player] };
//       }
//     });
//   };

//   const toggleDropdown = (sessionId: number) => {
//     setDropdownOpen((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
//   };



//   //If course is not found, display a fallback message
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

//   // const handleRegister = (sessionId: number, courseId: number) => {
//   //   alert(" item added to cart successfully")
//   //   if (!isBooked(sessionId)) {
//   //     const selectedSession = sessions.find((session) => session.id === sessionId);
//   //     if (selectedSession) {
//   //       addToCart({
//   //         id: selectedSession.id,
//   //         courseId: courseId,
//   //         name: `${courses.subcategory} (${courses.category})` || "General",
//   //         price: selectedSession.price,
//   //         description: `Session with ${selectedSession.coachName || "TBD"}`,
//   //         category: "Sports",
//   //         image: "/path/to/image",
//   //       });
//   //       setIsAnyBooked(true);
//   //       navigate("/cart");
//   //     }
//   //   }
//   // };
//   const handleRegister = (sessionId: number, courseId: number) => {
//     if (isBooked(sessionId)) {
//       alert("This session is already booked!");
//       return;
//     }
  
//     const selectedSession = sessions.find((session) => session.id === sessionId);
//     console.log(selectedSession)
  
//     if (selectedSession) {
//       const selectedPlayersCount = selectedPlayers[sessionId]?.length || 1; // Default to 1 if no player selected
//       const totalPrice = selectedSession.price * selectedPlayersCount;
//       const selectedPlayerNames = selectedPlayers[sessionId] || ["Default Player"]; // Ensure at least 1 player
  
//       const cartItem = {
//         id: selectedSession.id,
//         courseId: courseId,
//         name: `${courses.subcategory} (${courses.category})` || "General",
//         price: totalPrice, // Updated price calculation
//         description: `Session with ${selectedSession.coachName || "TBD"} for ${selectedPlayersCount} player(s)`,
//         category: "Sports",
//         image: "/path/to/image",
//         players: selectedPlayerNames,  // Save selected players
//         groups:`${courses.groups}`
//       };
  
//       addToCart(cartItem);
  
//       setIsAnyBooked(true);
//       alert(`Item added to cart successfully! Total cost: $${totalPrice.toFixed(2)}`);
//       navigate("/cart");
//     }
//   };
  
  

//   return (
//     <div className="bg-white-500 min-h-screen p-8">
//           {/* Breadcrumb Navigation */}
//       <nav className="text-gray-500 text-sm mb-4">
//       <span>Classes</span> <span className="mx-2">&gt;</span>
//       <span>{courses.subcategory} ({courses.category || "No Category"})</span>
//     </nav>

//         {/* Course Title Section */}
//       <header className="mb-8 mt-16">
//       <h1 className="text-4xl font-extrabold text-gray-900">
//         {courses.subcategory} ({courses.category})
//       </h1>
//       <p className="text-gray-700 text-lg mt-2">
//         Learn more about
//         {courses.subcategory} ({courses.category})
//         and its sessions below.
//       </p>
//     </header>


//     {/* Tabs for Navigation */}
//     <div className="flex space-x-4 border-b border-gray-300 mb-6">
//     <button className="px-4 py-2 text-gray-900 border-b-2 border-blue-500 font-medium focus:outline-none">
//       Description
//     </button>
//     <button
//       className="px-4 py-2 text-gray-500 hover:text-gray-900 focus:outline-none"
//       onClick={scrollToSessions}
//     >
//       Sessions
//     </button>
//   </div>


//   {/* Course Description */}
//   <div className="mb-12">
//   <p className="text-gray-700 text-lg leading-relaxed"
//     dangerouslySetInnerHTML={{ __html: courses.description }}
//   />
// </div>

//       {/* <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
//             <thead>
//               <tr  className="bg-gray-100">
//                 <th className="border border-gray-300 px-4 py-2">Coach</th>
//                 <th className="border border-gray-300 px-4 py-2">Location</th>
//                 <th className="border border-gray-300 px-4 py-2">Start Date</th>
//                 <th className="border border-gray-300 px-4 py-2">End Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Days</th>
//                 <th className="border border-gray-300 px-4 py-2">Time</th>
//                 <th className="border border-gray-300 px-4 py-2">Price</th>
//                 <th className="border border-gray-300 px-4 py-2">Select Players</th>
//                 <th className="border border-gray-300 px-4 py-2">Register</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sessions.length > 0 ? (
//                 sessions.map((session) => (
//                   <tr key={session.id} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       {session.fromDate}
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
//                     <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <div className="relative inline-block text-left w-full" ref={(el) => (dropdownRefs.current[session.id] = el)}>
//                         <button
//                           onClick={() => toggleDropdown(session.id)}
//                           className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
//                         >
//                           <span>
//                             {selectedPlayers[session.id]?.length > 0
//                               ? selectedPlayers[session.id].join(", ")
//                               : "Select Players"}
//                           </span>
//                           <svg
//                             className="w-4 h-4"
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                           </svg>
//                         </button>

//                       {dropdownOpen[session.id] && (
//                         <div className="absolute left-0 mt-2 w-full max-h-[200px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-[100]">
//                           {players.length > 0 ? (
//                             players.map((player) => (
//                               <button
//                                 key={player.id}
//                                 onClick={() => handlePlayerSelect(session.id, player.name)}
//                                 className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//                               >
//                                 <input
//                                   type="checkbox"
//                                   checked={selectedPlayers[session.id]?.includes(player.name)}
//                                   readOnly
//                                   className="mr-2"
//                                 />
//                                 {player.name}
//                               </button>
//                             ))
//                           ) : (
//                             <p className="px-4 py-2 text-gray-500">No players found</p>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <button
//                         className={`px-4 py-2 rounded-md text-white ${
//                           isBooked(session.id)
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : isAnyBooked && !isBooked(session.id)
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-blue-500 hover:bg-blue-600"
//                         }`}
//                         disabled={isBooked(session.id) || (isAnyBooked && !isBooked(session.id))}
//                         onClick={() => handleRegister(session.id!, courses.id!)}
//                       >
//                         {isBooked(session.id) ? "Booked" : "Register"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={5} className="text-center py-4 text-gray-500">
//                     No sessions found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//     <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
//   <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

//   <div className="overflow-x-auto">
//     <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="border border-gray-300 px-4 py-2">Coach</th>
//           <th className="border border-gray-300 px-4 py-2">Location</th>
//           <th className="border border-gray-300 px-4 py-2">Start Date</th>
//           <th className="border border-gray-300 px-4 py-2">End Date</th>
//           <th className="border border-gray-300 px-4 py-2">Days</th>
//           <th className="border border-gray-300 px-4 py-2">Time</th>
//           <th className="border border-gray-300 px-4 py-2">Price</th>
//           <th className="border border-gray-300 px-4 py-2">Select Players</th>
//           <th className="border border-gray-300 px-4 py-2">Register</th>
//         </tr>
//       </thead>
//       <tbody>
//         {sessions.length > 0 ? (
//           sessions.map((session) => (
//             <tr key={session.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.fromDate}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
//               <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <div className="relative inline-block text-left w-full" ref={(el) => (dropdownRefs.current[session.id] = el)}>
//                   <button
//                     onClick={(e) => {
//                       const buttonRect = e.currentTarget.getBoundingClientRect();
//                       setDropdownPosition({
//                         top: buttonRect.top + window.scrollY,
//                         left: buttonRect.left + window.scrollX,
//                       });
//                       toggleDropdown(session.id);
//                     }}
//                     className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
//                   >
//                     <span>
//                       {selectedPlayers[session.id]?.length > 0
//                         ? selectedPlayers[session.id].join(", ")
//                         : "Select Players"}
//                     </span>
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

//                   {dropdownOpen[session.id] && (
//                     <div
//                       className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-[1000]" // High z-index and fixed positioning
//                       style={{
//                         top: dropdownPosition.top - players.length * 40, // Position above the button
//                         left: dropdownPosition.left,
//                         maxHeight: "none", // Remove max height restriction
//                       }}
//                     >
//                       {players.length > 0 ? (
//                         players.map((player) => (
//                           <button
//                             key={player.id}
//                             onClick={() => handlePlayerSelect(session.id, player.name)}
//                             className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={selectedPlayers[session.id]?.includes(player.name)}
//                               readOnly
//                               className="mr-2"
//                             />
//                             {player.name}
//                           </button>
//                         ))
//                       ) : (
//                         <p className="px-4 py-2 text-gray-500">No players found</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   className={`px-4 py-2 rounded-md text-white ${
//                     isBooked(session.id)
//                       ? "bg-gray-500 cursor-not-allowed"
//                       : isAnyBooked && !isBooked(session.id)
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-blue-500 hover:bg-blue-600"
//                   }`}
//                   disabled={isBooked(session.id) || (isAnyBooked && !isBooked(session.id))}
//                   onClick={() => handleRegister(session.id!, courses.id!)}
//                 >
//                   {isBooked(session.id) ? "Booked" : "Register"}
//                 </button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={9} className="text-center py-4 text-gray-500">
//               No sessions found.
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>
//     </div>
//   );
// };

// export default CoursePage;


// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useCart } from "../productpage/CartContext";
// import { getTennisSessionDetails } from "../../Services/TennisService";
// import { getAllPlayers } from "../../Services/PlayerService";
// import { useSelector } from "react-redux";
// import { successNotification } from "../../Services/NotificationService";

// interface Course {
//   id?: number;
//   category: string;
//   subcategory: string;
//   description: string;
//   price: number;
//   groups: string;
// }

// const CoursePage: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const user = useSelector((state: any) => state.user);
//   const navigate = useNavigate();
//   const { cart, addToCart, isBooked: isBookedCart } = useCart(); // Renamed to isBookedCart
//   const sessionRef = useRef<HTMLDivElement | null>(null);
//   const [courses, setCourse] = useState<Course>({} as Course);
//   const [sessions, setSessions] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [isAnyBooked, setIsAnyBooked] = useState(false);
//   const [players, setPlayers] = useState<any[]>([]);
//   const [selectedPlayers, setSelectedPlayers] = useState<{ [key: number]: { id: number; name: string }[] }>({});
//   const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
//   const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
//   const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

//   useEffect(() => {
//     const fetchCourseDetails = async () => {
//       try {
//         setLoading(true);
//         console.log("get Tennis Session Details id is " + id);
//         const data = await getTennisSessionDetails(id);
//         setCourse(data.tennisData || {});
//         setSessions(data.sessions || []);
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

//   useEffect(() => {
//     if (sessions.length > 0) {
//       const anySessionBooked = sessions.some((session) => isBookedCart(session.id));
//       setIsAnyBooked(anySessionBooked);
//     } else {
//       setIsAnyBooked(false);
//     }
//   }, [sessions, isBookedCart]);

//   const scrollToSessions = () => {
//     if (sessionRef.current) {
//       sessionRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   useEffect(() => {
//     const fetchPlayers = async () => {
//       try {
//         const userId = user?.data?.userDetails?.id;
//         const response = await getAllPlayers(userId);
//         const playerData = response?.data;
//         console.log(playerData);
//         if (playerData) {
//           setPlayers(playerData);
//         } else {
//           console.error("Expected an array, but received:", playerData);
//           setPlayers([]);
//         }
//       } catch (error) {
//         console.log(error);
//         console.error("Failed to fetch Players", error);
//       }
//     };

//     fetchPlayers();
//   }, [user?.data?.userDetails?.id]);

//   const handlePlayerSelect = (sessionId: number, playerId: number, playerName: string) => {
//     setSelectedPlayers((prevSelectedPlayers) => {
//       const currentPlayers = prevSelectedPlayers[sessionId] || [];
//       const isSelected = currentPlayers.some((p) => p.id === playerId);
//       const updatedPlayers = isSelected
//         ? currentPlayers.filter((p) => p.id !== playerId)
//         : [...currentPlayers, { id: playerId, name: playerName }];
//       return { ...prevSelectedPlayers, [sessionId]: updatedPlayers };
//     });
//   };

//   const handleDropdownToggle = (sessionId: number) => {
//     setDropdownOpen((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
//   };

//   const handleRegister = (sessionId: number, courseId: number) => {
//     // if (isBookedCart(sessionId)) {
//     //   alert("This session is already booked!");
//     //   return;
//     // }

//     const selectedSession = sessions.find((session) => session.id === sessionId);
//     console.log(selectedSession);

//     if (selectedSession) {
//       const selectedPlayersList = selectedPlayers[sessionId] || [{ id: "default", name: "Default Player" }];
//       const selectedPlayerNames = selectedPlayersList.map((player) => player.name);
//       const selectedPlayerObjects = selectedPlayersList.map((player) => ({ id: player.id, name: player.name }));
//       const selectedPlayersCount = selectedPlayersList.length;
//       const totalPrice = selectedSession.price * selectedPlayersCount;
      

//       const cartItem = {
//         id: selectedSession.id,
//         courseId: courseId,
//         name: `${courses.subcategory} (${courses.category})` || "General",
//         price: selectedSession.price,
//         description: `Session with ${selectedSession.coachName || "TBD"} for ${selectedPlayersCount} player(s)`,
//         category: "Sports",
//         image: "/path/to/image",
//         players: selectedPlayerObjects,
//         groups: `${courses.groups}`,
//       };
//       console.log(cartItem);

//       addToCart(cartItem);
//       // setIsAnyBooked(true);
//       successNotification("",`Item added to cart successfully! Total cost: $${totalPrice.toFixed(2)}`);
//       navigate("/cart");
//     }
//   };

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

//   // function setDropdownPosition(arg0: { top: number; left: number; }) {
//   //   throw new Error("Function not implemented.");
//   // }
//   const toggleDropdown = (sessionId: string) => {
//     setDropdownOpen(prevState => ({
//       ...prevState,
//       [sessionId]: !prevState[sessionId], // Toggle specific session dropdown
//     }));
//   };
  
  

//   return (
//     <div className="bg-white-500 min-h-screen p-8">
//       <nav className="text-gray-500 text-sm mb-4">
//         <span>Classes</span> <span className="mx-2">&gt;</span>
//         <span>{courses.subcategory} ({courses.category || "No Category"})</span>
//       </nav>

//       <header className="mb-8 mt-16">
//         <h1 className="text-4xl font-extrabold text-gray-900">
//           {courses.subcategory} ({courses.category})
//         </h1>
//         <p className="text-gray-700 text-lg mt-2">
//           Learn more about {courses.subcategory} ({courses.category}) and its sessions below.
//         </p>
//       </header>

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

//       <div className="mb-12">
//         <p className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: courses.description }} />
//       </div>

//       {/* <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
//         <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

//         <div className="overflow-x-auto">
//           <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-300 px-4 py-2">Coach</th>
//                 <th className="border border-gray-300 px-4 py-2">Location</th>
//                 <th className="border border-gray-300 px-4 py-2">Start Date</th>
//                 <th className="border border-gray-300 px-4 py-2">End Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Days</th>
//                 <th className="border border-gray-300 px-4 py-2">Time</th>
//                 <th className="border border-gray-300 px-4 py-2">Price</th>
//                 <th className="border border-gray-300 px-4 py-2">Select Players</th>
//                 <th className="border border-gray-300 px-4 py-2">Register</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sessions.length > 0 ? (
//                 sessions.map((session) => (
//                   <tr key={session.id} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.fromDate}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
//                     <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
//                     <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <div className="relative inline-block text-left w-full">
//                         <button
//                           onClick={() => toggleDropdown(session.id)}
//                           className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
//                         >
//                           <span>
//                             {selectedPlayers[session.id] && selectedPlayers[session.id].length > 0
//                               ? selectedPlayers[session.id].map((p) => p.name).join(", ") // ✅ Only show names
//                               : "Select Players"}
//                           </span>
//                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
//                           </svg>
//                         </button>

//                         {dropdownOpen[session.id] && (
//                           <div className="absolute left-0 mt-2 w-full max-h-[200px] overflow-visible bg-white border border-gray-300 rounded-lg shadow-lg z-[100]">
//                             {players.length > 0 ? (
//                               players.map((player) => (
//                                 <button
//                                   key={player.id}
//                                   onClick={() => handlePlayerSelect(session.id, player.id, player.name)}
//                                   className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//                                 >
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedPlayers[session.id]?.some((p) => p.id === player.id) || false}
//                                     readOnly
//                                     className="mr-2"
//                                   />
//                                   {player.name}
//                                 </button>
//                               ))
//                             ) : (
//                               <p className="px-4 py-2 text-gray-500">No players found</p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <button
//                         className={`px-4 py-2 rounded-md text-white ${
//                           isBookedCart(session.id)
//                             ? "bg-gray-500 cursor-not-allowed"
//                             : isAnyBooked && !isBookedCart(session.id)
//                             ? "bg-gray-400 cursor-not-allowed"
//                             : "bg-blue-500 hover:bg-blue-600"
//                         }`}
//                         disabled={isBookedCart(session.id) || (isAnyBooked && !isBookedCart(session.id))}
//                         onClick={() => handleRegister(session.id!, courses.id!)}
//                       >
//                         {isBookedCart(session.id) ? "Booked" : "Register"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={9} className="text-center py-4 text-gray-500">
//                     No sessions found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div> */}
//       <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
//   <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

//   <div className="overflow-x-auto">
//     <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
//       <thead>
//         <tr className="bg-gray-100">
//           <th className="border border-gray-300 px-4 py-2">Coach</th>
//           <th className="border border-gray-300 px-4 py-2">Location</th>
//           <th className="border border-gray-300 px-4 py-2">Start Date</th>
//           <th className="border border-gray-300 px-4 py-2">End Date</th>
//           <th className="border border-gray-300 px-4 py-2">Days</th>
//           <th className="border border-gray-300 px-4 py-2">Time</th>
//           <th className="border border-gray-300 px-4 py-2">Price</th>
//           <th className="border border-gray-300 px-4 py-2">Select Players</th>
//           <th className="border border-gray-300 px-4 py-2">Register</th>
//         </tr>
//       </thead>
//       <tbody>
//         {sessions.length > 0 ? (
//           sessions.map((session) => (
//             <tr key={session.id} className="hover:bg-gray-50">
//               <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.fromDate}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
//               <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
//               <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <div className="relative inline-block text-left w-full" ref={(el) => (dropdownRefs.current[session.id] = el)}>
//                 <button
//   onClick={(e) => {
//     const buttonRect = e.currentTarget.getBoundingClientRect();
//     setDropdownPosition({
//       top: buttonRect.top + window.scrollY - players.length * 40, // Adjusted position
//       left: buttonRect.left + window.scrollX,
//     });
//     toggleDropdown(session.id);
//   }}
//   className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
// >

//                     <span>
//                       {selectedPlayers[session.id]?.length > 0
//                         ? selectedPlayers[session.id].map((p) => p.name).join(", ") // Show player names
//                         : "Select Players"}
//                     </span>
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

//                   {dropdownOpen[session.id] && dropdownPosition && (
//   <div
//     className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-[1000]"
//     style={{
//       top: dropdownPosition.top,
//       left: dropdownPosition.left,
//     }}
//   >
//                       {players.length > 0 ? (
//                         players.map((player) => (
//                           <button
//                             key={player.id}
//                             onClick={() => handlePlayerSelect(session.id, player.id, player.name)}
//                             className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
//                           >
//                             <input
//                               type="checkbox"
//                               checked={selectedPlayers[session.id]?.some((p) => p.id === player.id) || false}
//                               readOnly
//                               className="mr-2"
//                             />
//                             {player.name}
//                           </button>
//                         ))
//                       ) : (
//                         <p className="px-4 py-2 text-gray-500">No players found</p>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                 className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
//                   // className={`px-4 py-2 rounded-md text-white ${
//                   //   isBookedCart(session.id)
//                   //     ? "bg-gray-500 cursor-not-allowed"
//                   //     : isAnyBooked && !isBookedCart(session.id)
//                   //     ? "bg-gray-400 cursor-not-allowed"
//                   //     : "bg-blue-500 hover:bg-blue-600"
//                   // }`}
//                   // disabled={isBookedCart(session.id) || (isAnyBooked && !isBookedCart(session.id))}
//                   onClick={() => handleRegister(session.id!, courses.id!)}
//                 >
//                   {/* {isBookedCart(session.id) ? "Booked" : "Register"} */}
//                   Register
//                 </button>
//               </td>
//             </tr>
//           ))
//         ) : (
//           <tr>
//             <td colSpan={9} className="text-center py-4 text-gray-500">
//               No sessions found.
//             </td>
//           </tr>
//         )}
//       </tbody>
//     </table>
//   </div>
// </div>
//     </div>
//   );
// };

// export default CoursePage;

// function setDropdownOpen(arg0: (prev: any) => any) {
//   throw new Error("Function not implemented.");
// }


import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../productpage/CartContext";
import { getTennisSessionDetails } from "../../Services/TennisService";
import { getAllPlayers } from "../../Services/PlayerService";
import { useSelector } from "react-redux";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { getAllOrder } from "../../Services/OrderService";

interface Course {
  id?: number;
  category: string;
  subcategory: string;
  description: string;
  price: number;
  groups: string;
}

interface Order {
  userId: any;
  paymentMethod: any;
  id: number;
  userName: string;
  mobileNo: string;
  items: any;
  total: string;
  paymentStatus: string;
}

const CoursePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const { cart, addToCart, isBooked: isBookedCart } = useCart(); // Renamed to isBookedCart
  const sessionRef = useRef<HTMLDivElement | null>(null);
  const [courses, setCourse] = useState<Course>({} as Course);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnyBooked, setIsAnyBooked] = useState(false);
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: number]: { id: number; name: string }[] }>({});
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null);
  //const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});
  const [dropdownOpen, setDropdownOpen] = useState<Record<number, boolean>>({});
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target as Node)
      );

      if (isOutside) {
        setDropdownOpen({}); // Close all dropdowns
        setDropdownPosition(null); // Reset dropdown position
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        console.log("get Tennis Session Details id is " + id);
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
      const anySessionBooked = sessions.some((session) => isBookedCart(session.id));
      setIsAnyBooked(anySessionBooked);
    } else {
      setIsAnyBooked(false);
    }
  }, [sessions, isBookedCart]);

  const scrollToSessions = () => {
    if (sessionRef.current) {
      sessionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const userId = user?.data?.userDetails?.id;
        const response = await getAllPlayers(userId);
        const playerData = response?.data;
        console.log(playerData);
        if (playerData) {
          setPlayers(playerData);
        } else {
          console.error("Expected an array, but received:", playerData);
          setPlayers([]);
        }
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch Players", error);
      }
    };

    fetchPlayers();
  }, [user?.data?.userDetails?.id]);

    const handlePlayerSelect = (sessionId: number, playerId: number, playerName: string) => {
      // Your logic for handling player selection
    setSelectedPlayers((prevSelectedPlayers) => {
      const currentPlayers = prevSelectedPlayers[sessionId] || [];
      const isSelected = currentPlayers.some((p: { id: number; }) => p.id === playerId);
      const updatedPlayers = isSelected
        ? currentPlayers.filter((p: { id: number; }) => p.id !== playerId)
        : [...currentPlayers, { id: playerId, name: playerName }];
      return { ...prevSelectedPlayers, [sessionId]: updatedPlayers };
    });
  };

  const handleDropdownToggle = (sessionId: number) => {
    setDropdownOpen((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };
  const handleRegister = async (sessionId: number, courseId: number) => {
    // setLoading(true);

    try {
        // Fetch all orders with "Success" payment status
        const data = await getAllOrder();
        const filteredOrders = Array.isArray(data?.data)
            ? data.data.filter((item: { paymentStatus: string }) => item.paymentStatus === "Success")
            : [];

        console.log("Fetched Orders:", filteredOrders);

        //  Extract players from orders where `groups === "Classes"`
        let existingPlayersSet = new Set();

        filteredOrders.forEach((order: { items: string; userId: any }) => {
            let items = parseItemsJson(order.items); //  Use the parsing function

            items.forEach((item: { groups: string, name: string, players: any[] }) => {
                if (item.groups === "Classes") {
                    item.players.forEach(player => {
                        existingPlayersSet.add(`${order.userId}_${player.id}`);
                    });
                }
            });
        });

        console.log("Existing Players Set:", existingPlayersSet);

        //  Get Selected Session & Players
        const selectedSession = sessions.find(session => session.id === sessionId);
        if (!selectedSession) return;

        const selectedPlayersList = selectedPlayers[sessionId] || [{ id: "default", name: "Default Player" }];
        const selectedPlayersCount = selectedPlayersList.length;
        const selectedPlayerObjects = selectedPlayersList.map(player => ({ id: player.id, name: player.name }));

        //  Check If Player Already Exists for the Same `userId`
        const currentUserId = user.data.userDetails.id; //  Use dynamic userId

        let duplicatePlayers: string[] = []; //  Collect duplicate player names

        for (let player of selectedPlayerObjects) {
            if (existingPlayersSet.has(`${currentUserId}_${player.id}`)) {
                duplicatePlayers.push(player.name); //  Store duplicate player names
            }
        }

        if (duplicatePlayers.length > 0) {
            //  Show a single alert with all duplicate names
            errorNotification("", `Players ${duplicatePlayers.join(", ")} are already registered for a class.`);
            return; // Stop further processing if there are duplicates
        }

        //  Proceed with Registration (If No Duplicates)
        const totalPrice = selectedSession.price * selectedPlayersCount;
        const cartItem = {
            id: selectedSession.id,
            courseId: courseId,
            name: `${courses.subcategory} (${courses.category})` || "General",
            price: selectedSession.price,
            description: `Session with ${selectedSession.coachName || "TBD"} for ${selectedPlayersCount} player(s)`,
            category: "Sports",
            image: "/path/to/image",
            players: selectedPlayerObjects,
            groups: `${courses.groups}`,
        };

        console.log("Cart Item:", cartItem);
        addToCart(cartItem);

        successNotification("", `Item added to cart successfully! Total cost: $${totalPrice.toFixed(2)}`);
        navigate("/cart");
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    } finally {
        setLoading(false);
    }
};

  // const handleRegister = (sessionId: number, courseId: number) => {
  //   // if (isBookedCart(sessionId)) {
  //   //   alert("This session is already booked!");
  //   //   return;
  //   // }

  //   const selectedSession = sessions.find((session) => session.id === sessionId);
  //   console.log(selectedSession);

  //   if (selectedSession) {
  //     const selectedPlayersList = selectedPlayers[sessionId] || [{ id: "default", name: "Default Player" }];
  //     const selectedPlayerNames = selectedPlayersList.map((player) => player.name);
  //     const selectedPlayerObjects = selectedPlayersList.map((player) => ({ id: player.id, name: player.name }));
  //     const selectedPlayersCount = selectedPlayersList.length;
  //     const totalPrice = selectedSession.price * selectedPlayersCount;
      

  //     const cartItem = {
  //       id: selectedSession.id,
  //       courseId: courseId,
  //       name: `${courses.subcategory} (${courses.category})` || "General",
  //       price: selectedSession.price,
  //       description: `Session with ${selectedSession.coachName || "TBD"} for ${selectedPlayersCount} player(s)`,
  //       category: "Sports",
  //       image: "/path/to/image",
  //       players: selectedPlayerObjects,
  //       groups: `${courses.groups}`,
  //     };
  //     console.log(cartItem);

  //     addToCart(cartItem);
  //     // setIsAnyBooked(true);
  //     successNotification("",`Item added to cart successfully! Total cost: $${totalPrice.toFixed(2)}`);
  //     navigate("/cart");
  //   }
  // };

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

  // function setDropdownPosition(arg0: { top: number; left: number; }) {
  //   throw new Error("Function not implemented.");
  // }
  // const toggleDropdown = (sessionId: string) => {
  //   setDropdownOpen(prevState => ({
  //     ...prevState,
  //     [sessionId]: !prevState[sessionId], // Toggle specific session dropdown
  //   }));
  // };
  const toggleDropdown = (sessionId: number) => {
    setDropdownOpen((prev) => ({ ...prev, [sessionId]: !prev[sessionId] }));
  };

  
  

  return (
    <div className="bg-white-500 min-h-screen p-8">
      <nav className="text-gray-500 text-sm mb-4">
        <span>Classes</span> <span className="mx-2">&gt;</span>
        <span>{courses.subcategory} ({courses.category || "No Category"})</span>
      </nav>

      <header className="mb-8 mt-16">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {courses.subcategory} ({courses.category})
        </h1>
        <p className="text-gray-700 text-lg mt-2">
          Learn more about {courses.subcategory} ({courses.category}) and its sessions below.
        </p>
      </header>

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

      <div className="mb-12">
        <p className="text-gray-700 text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: courses.description }} />
      </div>

      {/* <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
            <thead>
              <tr className="bg-gray-100">
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
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.fromDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
                    <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
                    <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      <div className="relative inline-block text-left w-full">
                        <button
                          onClick={() => toggleDropdown(session.id)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
                        >
                          <span>
                            {selectedPlayers[session.id] && selectedPlayers[session.id].length > 0
                              ? selectedPlayers[session.id].map((p) => p.name).join(", ") // ✅ Only show names
                              : "Select Players"}
                          </span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </button>

                        {dropdownOpen[session.id] && (
                          <div className="absolute left-0 mt-2 w-full max-h-[200px] overflow-visible bg-white border border-gray-300 rounded-lg shadow-lg z-[100]">
                            {players.length > 0 ? (
                              players.map((player) => (
                                <button
                                  key={player.id}
                                  onClick={() => handlePlayerSelect(session.id, player.id, player.name)}
                                  className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedPlayers[session.id]?.some((p) => p.id === player.id) || false}
                                    readOnly
                                    className="mr-2"
                                  />
                                  {player.name}
                                </button>
                              ))
                            ) : (
                              <p className="px-4 py-2 text-gray-500">No players found</p>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className={`px-4 py-2 rounded-md text-white ${
                          isBookedCart(session.id)
                            ? "bg-gray-500 cursor-not-allowed"
                            : isAnyBooked && !isBookedCart(session.id)
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={isBookedCart(session.id) || (isAnyBooked && !isBookedCart(session.id))}
                        onClick={() => handleRegister(session.id!, courses.id!)}
                      >
                        {isBookedCart(session.id) ? "Booked" : "Register"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center py-4 text-gray-500">
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
      <div ref={sessionRef} className="bg-gray p-6 shadow rounded-lg">
  <h2 className="text-2xl font-bold mb-4">Session Details:</h2>

  <div className="overflow-x-auto">
    <table className="w-full table-auto border-collapse border border-gray-300 text-left text-sm">
      <thead>
        <tr className="bg-gray-100">
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
            <tr key={session.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{session.coachName || "TBD"}</td>
              <td className="border border-gray-300 px-4 py-2">{session.locationName || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{session.fromDate}</td>
              <td className="border border-gray-300 px-4 py-2">{session.toDate}</td>
              <td className="border border-gray-300 px-4 py-2">{session.days?.join(", ") || "N/A"}</td>
              <td className="border border-gray-300 px-4 py-2">{session.startTime} – {session.endTime}</td>
              <td className="border border-gray-300 px-4 py-2">${session.price.toFixed(2)}</td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="relative inline-block text-left w-full" ref={(el) => (dropdownRefs.current[session.id] = el)}>
                <button
                    onClick={(e) => {
                      const buttonRect = e.currentTarget.getBoundingClientRect();
                      setDropdownPosition({
                        top: buttonRect.top + window.scrollY - players.length * 40, // Adjusted position
                        left: buttonRect.left + window.scrollX,
                      });
                      toggleDropdown(session.id);
                    }}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition duration-200"
                  >

                    <span>
                      {selectedPlayers[session.id]?.length > 0
                        ? selectedPlayers[session.id].map((p) => p.name).join(", ") // Show player names
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

                  {dropdownOpen[session.id] && dropdownPosition && (
                      <div
                        className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-[1000]"
                        style={{
                          top: dropdownPosition.top,
                          left: dropdownPosition.left,
                        }}
                      >
                      {players.length > 0 ? (
                        players.map((player) => (
                          <button
                            key={player.id}
                            onClick={() => handlePlayerSelect(session.id, player.id, player.name)}
                            className="flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                          >
                            <input
                              type="checkbox"
                              checked={selectedPlayers[session.id]?.some((p) => p.id === player.id) || false}
                              readOnly
                              className="mr-2"
                            />
                            {player.name}
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-gray-500">No players found</p>
                      )}
                    </div>
                  )}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                  // className={`px-4 py-2 rounded-md text-white ${
                  //   isBookedCart(session.id)
                  //     ? "bg-gray-500 cursor-not-allowed"
                  //     : isAnyBooked && !isBookedCart(session.id)
                  //     ? "bg-gray-400 cursor-not-allowed"
                  //     : "bg-blue-500 hover:bg-blue-600"
                  // }`}
                  // disabled={isBookedCart(session.id) || (isAnyBooked && !isBookedCart(session.id))}
                  onClick={() => handleRegister(session.id!, courses.id!)}
                >
                  {/* {isBookedCart(session.id) ? "Booked" : "Register"} */}
                  Register
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={9} className="text-center py-4 text-gray-500">
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

function setDropdownOpen(arg0: (prev: any) => any) {
  throw new Error("Function not implemented.");
}

function parseItemsJson(itemsString: string) {
  try {
      //  Fix incorrect key-value formatting (Convert `=` to `:`)
      let formattedItems = itemsString
          .replace(/=/g, ':')  // Replace `=` with `:`
          .replace(/([{,])(\s*)(\w+):/g, '$1"$3":')  // Ensure property names have double quotes
          .replace(/:\s*([\w\s()]+)/g, ': "$1"'); // Ensure values have double quotes if needed

      //  Parse the corrected JSON string
      return JSON.parse(formattedItems);
  } catch (error) {
      console.error("Error parsing items JSON:", error);
      return []; // Return an empty array if parsing fails
  }
}



