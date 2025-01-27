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
//                 onClick={() => navigate("/payment")}
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


import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  const isClassOnly = cart.every((product) => product.category === "Class");

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
                  <p className="mb-1 sm:mb-2">Price: ${product.price.toFixed(2)}</p>
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
                onClick={() => navigate("/payment", { state: { isClassOnly } })}
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
