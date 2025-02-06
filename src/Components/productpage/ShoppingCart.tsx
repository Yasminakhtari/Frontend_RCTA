// import React, { useState, useEffect } from "react";
// import { useCart } from "./CartContext";
// import {  useLocation, useNavigate } from "react-router-dom";
// import { getAllOrder } from "../../Services/OrderService";

// const playersList = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Sample player list

// const ShoppingCart: React.FC = () => {
//   const { state } = useLocation();

// const successStatus =  state?.saveOrder;
//   const { cart, removeFromCart, clearCart, setCart } = useCart();
//   const navigate = useNavigate();
//   const [selectedPlayers, setSelectedPlayers] = useState<Record<number, string[]>>({});
//   useEffect(() => {
//     if (successStatus) {
//       clearCart(); // Clear cart if order is successful
//     }
//   }, []);
  
//   const handleQuantityChange = (id: number, amount: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//   const handlePlayerChange = (id: number, player: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, players: [...(item.players || []), player] } // Ensure players array is updated
//           : item
//       )
//     );
//   };
  

//   const handleRemovePlayer = (id: number, player: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, players: item.players.filter((p) => p !== player) }
//           : item
//       )
//     );
//   };
  

//   useEffect(() => {
//     console.log("Updated Selected Players:", selectedPlayers);
//   }, [selectedPlayers]);

//   const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
//   const classItems = cart.filter((product) => product.category === "Class");
//   const classTotal = classItems.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         successStatus ? (
//           <p className="text-green-600 font-bold text-lg">Your payment was successful! Thank you for your purchase.</p>
//           // Show success message if payment was successful
//         ) : (
//           <p>Your cart is empty.</p> // Show empty cart message if cart has no items
//         )
//       ) : (
//         <div>
//           {cart.map((product) => {
//             const productTotal = product.price * product.quantity;
//             return (
//               <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold">{product.name}</h2>
//                   <p className="mb-1 sm:mb-2"> Price: ${product.price.toFixed(2)}</p>
//                   <p className="mb-1 sm:mb-2 font-bold"> Total: ${productTotal.toFixed(2)}</p>

//                   {product.category !== "Sports" && (
//                     <div className="flex items-center space-x-2">
//                       <button
//                         className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                         onClick={() => handleQuantityChange(product.id, -1)}
//                       >
//                         -
//                       </button>
//                       <span className="text-lg">{product.quantity}</span>
//                       <button
//                         className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                         onClick={() => handleQuantityChange(product.id, 1)}
//                       >
//                         +
//                       </button>
//                       <h2 className="text-gray-700 ml-4">Total: ${productTotal.toFixed(2)}</h2>
//                     </div>
//                   )}

//                   {product.category === "Class" && (
//                     <div className="mt-2">
//                       <label className="block text-gray-700">Select Player:</label>
//                       <select
//                         className="border rounded p-2 w-full"
//                         onChange={(e) => {
//                           if (e.target.value) {
//                             handlePlayerChange(product.id, e.target.value);
//                           }
//                         }}
//                       >
//                         <option value="">Select a Player</option>
//                         {playersList
//                           .filter((player) => !(selectedPlayers[product.id] || []).includes(player))
//                           .map((player) => (
//                             <option key={player} value={player}>{player}</option>
//                           ))}
//                       </select>
//                       <div className="mt-2">
//                         {selectedPlayers[product.id]?.map((player) => (
//                           <div key={player} className="flex items-center justify-between bg-gray-200 p-2 rounded mt-1">
//                             <span>{player}</span>
//                             <button
//                               className="text-red-500 hover:text-red-700"
//                               onClick={() => handleRemovePlayer(product.id, player)}
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {product.category === "Sports" && product.players?.length > 0 && (
//                     <div className="mt-2">
//                       <h3 className="text-gray-700">Selected Players:</h3>
//                       <ul className="list-disc pl-5">
//                         {product.players.map((player: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: React.Key | null | undefined) => (
//                           <li key={index}>{player}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//                   onClick={() => removeFromCart(product.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             );
//           })}
//           <div className="mt-4 sm:mt-6">
//             <h2 className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 onClick={() => navigate("/payment", { state: { isClassOnly: classItems.length > 0, selectedPlayers,cart,total } })}
//               >
//                 Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCart;



// import React, { useState, useEffect } from "react";
// import { useCart } from "./CartContext";
// import { useLocation, useNavigate } from "react-router-dom";
// import { getAllOrder } from "../../Services/OrderService";

// const playersList = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Sample player list

// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   description: string;
//   category: string;
//   courseId: number;
//   groups: string;
//   players: string[]; // Players are stored as strings
// }

// const ShoppingCart: React.FC = () => {
//   const { state } = useLocation();
//   const successStatus = state?.saveOrder;
//   const { cart, removeFromCart, clearCart, setCart } = useCart();
//   const navigate = useNavigate();
//   const [selectedPlayers, setSelectedPlayers] = useState<Record<number, string[]>>({});

//   useEffect(() => {
//     if (successStatus) {
//       clearCart(); // Clear cart if order is successful
//       window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
//     }
//   }, [successStatus]);

//   const handleQuantityChange = (id: number, amount: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//   const handlePlayerChange = (id: number, player: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, players: [...(item.players || []), player] } // Add player to the list
//           : item
//       )
//     );
//   };

//   const handleRemovePlayer = (id: number, player: string) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               players: item.players.filter((p) => p !== player),
//               price: item.price - 100, // Decrease the price by $100 when a player is removed
//             }
//           : item
//       )
//     );
//   };

//   useEffect(() => {
//     console.log("Updated Selected Players:", selectedPlayers);
//   }, [selectedPlayers]);

//   const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
//   const classItems = cart.filter((product) => product.category === "Class");
//   const classTotal = classItems.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         successStatus ? (
//           <p className="text-green-600 font-bold text-lg">Your payment was successful! Thank you for your purchase.</p>
//         ) : (
//           <p>Your cart is empty.</p>
//         )
//       ) : (
//         <div>
//           {cart.map((product) => {
//             const productTotal = product.price * product.quantity;
//             return (
//               <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold">{product.name}</h2>
//                   <p className="mb-1 sm:mb-2"> Price: ${product.price.toFixed(2)}</p>
//                   <p className="mb-1 sm:mb-2 font-bold"> Total: ${productTotal.toFixed(2)}</p>

//                   {product.category !== "Sports" && (
//                     <div className="flex items-center space-x-2">
//                       <button
//                         className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                         onClick={() => handleQuantityChange(product.id, -1)}
//                       >
//                         -
//                       </button>
//                       <span className="text-lg">{product.quantity}</span>
//                       <button
//                         className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                         onClick={() => handleQuantityChange(product.id, 1)}
//                       >
//                         +
//                       </button>
//                       <h2 className="text-gray-700 ml-4">Total: ${productTotal.toFixed(2)}</h2>
//                     </div>
//                   )}

//                   {product.category === "Class" && (
//                     <div className="mt-2">
//                       <label className="block text-gray-700">Select Player:</label>
//                       <select
//                         className="border rounded p-2 w-full"
//                         onChange={(e) => {
//                           if (e.target.value) {
//                             handlePlayerChange(product.id, e.target.value);
//                           }
//                         }}
//                       >
//                         <option value="">Select a Player</option>
//                         {playersList
//                           .filter((player) => !(selectedPlayers[product.id] || []).includes(player))
//                           .map((player) => (
//                             <option key={player} value={player}>
//                               {player}
//                             </option>
//                           ))}
//                       </select>
//                       <div className="mt-2">
//                         {selectedPlayers[product.id]?.map((player) => (
//                           <div key={player} className="flex items-center justify-between bg-gray-200 p-2 rounded mt-1">
//                             <span>{player}</span>
//                             <button
//                               className="text-red-500 hover:text-red-700"
//                               onClick={() => handleRemovePlayer(product.id, player)}
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {product.category === "Sports" && product.players?.length > 0 && (
//                     <div className="mt-2">
//                       <h3 className="text-gray-700">Selected Players:</h3>
//                       <ul className="list-disc pl-5">
//                         {product.players.map((player, index) => (
//                           <li key={index} className="flex items-center justify-between">
//                             <span>{player}</span>
//                             <button
//                               className="text-red-500 hover:text-red-700 ml-2"
//                               onClick={() => handleRemovePlayer(product.id, player)}
//                             >
//                               ✕
//                             </button>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//                   onClick={() => removeFromCart(product.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             );
//           })}
//           <div className="mt-4 sm:mt-6">
//             <h2 className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 onClick={() => navigate("/payment", { state: { isClassOnly: classItems.length > 0, selectedPlayers, cart, total } })}
//               >
//                 Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCart;

import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllOrder } from "../../Services/OrderService";

const playersList = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Sample player list

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  category: string;
  courseId: number;
  groups: string;
  players: string[]; // Players are stored as strings
}

const ShoppingCart: React.FC = () => {
  const { state } = useLocation();
  const successStatus = state?.saveOrder;
  const { cart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<Record<number, string[]>>({});

  useEffect(() => {
    if (successStatus) {
      clearCart(); // Clear cart if order is successful
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
    }
  }, [successStatus]);

  const handleQuantityChange = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const handlePlayerChange = (id: number, player: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, players: [...(item.players || []), player] } // Add player to the list
          : item
      )
    );
  };

  const handleRemovePlayer = (id: number, player: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              players: item.players.filter((p) => p !== player),
              price: item.price - 100, // Decrease the price by $100 when a player is removed
            }
          : item
      )
    );
  };

  useEffect(() => {
    console.log("Updated Selected Players:", selectedPlayers);
  }, [selectedPlayers]);

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const classItems = cart.filter((product) => product.category === "Class");
  const classTotal = classItems.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        successStatus ? (
          <p className="text-green-600 font-bold text-lg">Your payment was successful! Thank you for your purchase.</p>
        ) : (
          <p>Your cart is empty.</p>
        )
      ) : (
        <div>
          {cart.map((product) => {
            const productTotal = product.price * product.quantity;
            return (
              <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="mb-1 sm:mb-2"> Price: ${product.price.toFixed(2)}</p>
                  <p className="mb-1 sm:mb-2 font-bold"> Total: ${productTotal.toFixed(2)}</p>

                  {product.category !== "Sports" && (
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
                        onClick={() => handleQuantityChange(product.id, -1)}
                      >
                        -
                      </button>
                      <span className="text-lg">{product.quantity}</span>
                      <button
                        className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
                        onClick={() => handleQuantityChange(product.id, 1)}
                      >
                        +
                      </button>
                      <h2 className="text-gray-700 ml-4">Total: ${productTotal.toFixed(2)}</h2>
                    </div>
                  )}

                  {product.category === "Class" && (
                    <div className="mt-2">
                      <label className="block text-gray-700">Select Player:</label>
                      <select
                        className="border rounded p-2 w-full"
                        onChange={(e) => {
                          if (e.target.value) {
                            handlePlayerChange(product.id, e.target.value);
                          }
                        }}
                      >
                        <option value="">Select a Player</option>
                        {playersList
                          .filter((player) => !(selectedPlayers[product.id] || []).includes(player))
                          .map((player) => (
                            <option key={player} value={player}>
                              {player}
                            </option>
                          ))}
                      </select>
                      <div className="mt-2">
                        {selectedPlayers[product.id]?.map((player) => (
                          <div key={player} className="flex items-center justify-between bg-gray-200 p-2 rounded mt-1">
                            <span>{player}</span>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemovePlayer(product.id, player)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* {product.category === "Sports" && product.players?.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-gray-700">Selected Players:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.players.map((player, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-200 p-2 rounded border border-gray-300"
                          >
                            <span>{player}</span>
                            <button
                              className="text-red-500 hover:text-red-700 ml-2"
                              onClick={() => handleRemovePlayer(product.id, player)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {product.players?.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-gray-700">Selected Players:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.players.map((player, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-gray-200 px-3 py-1 rounded-full border border-gray-300"
                          >
                            <span>{player}</span>
                            <button
                              className="text-red-500 hover:text-red-700 ml-2"
                              onClick={() => handleRemovePlayer(product.id, player)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  onClick={() => removeFromCart(product.id)}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <div className="mt-4 sm:mt-6">
            <h2 className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={() => navigate("/payment", { state: { isClassOnly: classItems.length > 0, selectedPlayers, cart, total } })}
              >
                Checkout
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;