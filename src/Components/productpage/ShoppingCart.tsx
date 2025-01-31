// import React from "react";
// import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";

// const ShoppingCart: React.FC = () => {
//   const { cart, removeFromCart, clearCart, setCart } = useCart();
//   const navigate = useNavigate();

//   const handleQuantityChange = (id: number, amount: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//   const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   const isClassOnly = cart.every((product) => product.category === "Class");

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map((product) => {
//             const productTotal = product.price * product.quantity;
//             return (
//               <div key={product.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
//                 <div>
//                   <h2 className="text-lg font-semibold">{product.name}</h2>
//                   <p className="mb-1 sm:mb-2">Price: ${product.price.toFixed(2)}</p>
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
//                 onClick={() => navigate("/payment", { state: { isClassOnly } })}
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


// import React, { useState } from "react";
// import { useCart } from "./CartContext";
// import { useNavigate } from "react-router-dom";

// const playersList = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Sample player list

// const ShoppingCart: React.FC = () => {
//   const { cart, removeFromCart, clearCart, setCart } = useCart();
//   const navigate = useNavigate();
//   const [selectedPlayers, setSelectedPlayers] = useState<Record<number, string[]>>({});

//   const handleQuantityChange = (id: number, amount: number) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
//       )
//     );
//   };

//   const handlePlayerChange = (id: number, player: string) => {
//     setSelectedPlayers((prev) => ({
//       ...prev,
//       [id]: [...(prev[id] || []), player]
//     }));
//   };

//   const handleRemovePlayer = (id: number, player: string) => {
//     setSelectedPlayers((prev) => {
//       const updatedPlayers = prev[id]?.filter((p) => p !== player) || [];
//       return { ...prev, [id]: updatedPlayers };
//     });
//   };

//   const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
//   const classItems = cart.filter((product) => product.category === "Class");
//   const classTotal = classItems.reduce((sum, product) => sum + product.price * product.quantity, 0);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8 mt-14">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
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
//           {classItems.length > 0 && (
//             <div className="mt-4 sm:mt-6 p-4 bg-blue-100 rounded-lg shadow-md">
//               <h2 className="text-lg sm:text-xl font-bold text-blue-900">Price : ${classItems.reduce((sum, product) => sum + product.price, 0).toFixed(2)}</h2>
//               <h2 className="text-lg sm:text-xl font-bold text-blue-900">Total: ${classTotal.toFixed(2)}</h2>
//             </div>
//           )}
//           <div className="mt-4 sm:mt-6">
//             <h2 className="text-lg sm:text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 onClick={() => navigate("/payment", { state: { isClassOnly: classItems.length > 0, selectedPlayers } })}
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
import { useNavigate } from "react-router-dom";

const playersList = ["Player 1", "Player 2", "Player 3", "Player 4"]; // Sample player list

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();
  const [selectedPlayers, setSelectedPlayers] = useState<Record<number, string[]>>({});

  const handleQuantityChange = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const handlePlayerChange = (id: number, player: string) => {
    setSelectedPlayers((prev) => {
      const currentPlayers = prev[id] || [];
      if (!currentPlayers.includes(player)) {  // Prevent duplicates
        return { ...prev, [id]: [...currentPlayers, player] };
      }
      return prev;
    });
  };

  const handleRemovePlayer = (id: number, player: string) => {
    setSelectedPlayers((prev) => {
      const updatedPlayers = prev[id]?.filter((p) => p !== player) || [];
      return { ...prev, [id]: updatedPlayers };
    });
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
        <p>Your cart is empty.</p>
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
                            <option key={player} value={player}>{player}</option>
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
                onClick={() => navigate("/payment", { state: { isClassOnly: classItems.length > 0, selectedPlayers } })}
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
