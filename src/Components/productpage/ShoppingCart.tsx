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

//                   {/* {product.category === "Sports" && product.players?.length > 0 && (
//                     <div className="mt-2">
//                       <h3 className="text-gray-700">Selected Players:</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {product.players.map((player, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center justify-between bg-gray-200 p-2 rounded border border-gray-300"
//                           >
//                             <span>{player}</span>
//                             <button
//                               className="text-red-500 hover:text-red-700 ml-2"
//                               onClick={() => handleRemovePlayer(product.id, player)}
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )} */}

//                   {product.players?.length > 0 && (
//                     <div className="mt-2">
//                       <h3 className="text-gray-700">Selected Players:</h3>
//                       <div className="flex flex-wrap gap-2">
//                         {product.players.map((player, index) => (
//                           <div
//                             key={index}
//                             className="flex items-center bg-blue-500 px-3 py-1 rounded-full border border-gray-300"
//                           >
//                             <span>{player}</span>
//                             <button
//                               className="text-red-600 hover:text-red-700 ml-2"
//                               onClick={() => handleRemovePlayer(product.id, player)}
//                             >
//                               ✕
//                             </button>
//                           </div>
//                         ))}
//                       </div>
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
import { deleteSinglePlayer } from "../../Services/SessionService";
import { errorNotification, successNotification } from "../../Services/NotificationService";

interface Player {
  id: string;
  name: string;
}

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
  players: Player[]; // Players are now stored as objects with id and name
}

const playersList: Player[] = [
  { id: "1", name: "Player 1" },
  { id: "2", name: "Player 2" },
  { id: "3", name: "Player 3" },
  { id: "4", name: "Player 4" },
];

const ShoppingCart: React.FC = () => {
  const { state } = useLocation();
  const successStatus = state?.saveOrder;
  const { cart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<Record<number, Player[]>>({});
  console.log(cart)
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

  const handlePlayerChange = (id: number, player: Player) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, players: [...(item.players || []), player] } // Add player to the list
          : item
      )
    );
  };

  const handleRemovePlayer = async (product:any,id: number, playerId: string) => {
    if(playerId){
      console.log(product)
      console.log(playerId)
      console.log(id)
      console.log(product.courseId)
      try {
        // 🔹 Call API to remove player
        const response = await deleteSinglePlayer(id, product.courseId, Number(playerId));
        console.log("Player removed successfully:", response);

        // 🔹 Update UI after successful removal (if needed)
        successNotification("",`Player ${playerId} removed successfully.`);
        
    } catch (error) {
        console.error("Error removing player:", error);
        errorNotification("","Failed to remove player. Please try again.");
    }

    return;   
  }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? {
              ...item,
              players: item.players.filter((p: { id: string; }) => p.id !== playerId), // Remove player by ID
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
            const playerCount = product.players ? product.players.length : 1;
            const productTotal = product.price * playerCount;
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
                          const selectedPlayer = playersList.find((p) => p.id === e.target.value);
                          if (selectedPlayer) {
                            handlePlayerChange(product.id, selectedPlayer);
                          }
                        }}
                      >
                        <option value="">Select a Player</option>
                        {playersList
                          .filter((player) => !(selectedPlayers[product.id] || []).some((p) => p.id === player.id))
                          .map((player) => (
                            <option key={player.id} value={player.id}>
                              {player.name}
                            </option>
                          ))}
                      </select>
                      <div className="mt-2">
                        {selectedPlayers[product.id]?.map((player) => (
                          <div key={player.id} className="flex items-center justify-between bg-gray-200 p-2 rounded mt-1">
                            <span>{player.name}</span>
                            <button
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleRemovePlayer(product,product.id, player.id)}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.players?.length > 0 && (
                    <div className="mt-2">
                      <h3 className="text-gray-700">Selected Players:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.players.map((player: Player) => (
                          <div
                            key={player.id}
                            className="flex items-center bg-blue-500 px-3 py-1 rounded-full border border-gray-300"
                          >
                            <span>{player.name}</span>
                            <button
                              className="text-red-600 hover:text-red-700 ml-2"
                              onClick={() => handleRemovePlayer(product,product.id, player.id)}
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