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

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-8 sm:p-16 mt-10">
//       <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div>
//           {cart.map((product) => (
//             <div key={product.id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
//               <h2 className="text-lg font-semibold">{product.name}</h2>
//               <p className="mb-2">Price: ${product.price.toFixed(2)}</p>
//               <div className="flex items-center justify-between">
//                 <div>
//                   {product.category === "Sports" ? (
//                     // <span className="text-gray-700">Quantity: {product.quantity}</span>
//                     <span className="text-gray-700"> {product.quantity}</span>
//                   ) : (
//                     <div className="flex space-x-2 mt-2">
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
//                     </div>
//                   )}
//                 </div>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   onClick={() => removeFromCart(product.id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//           <div className="mt-6">
//             <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
//             <button
//               className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mt-4 mr-4"
//               onClick={() => navigate("/checkout")}
//             >
//               Checkout
//             </button>
//             <button
//               className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 mt-4"
//               onClick={clearCart}
//             >
//               Clear Cart
//             </button>
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 sm:p-16 mt-10">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => {
            const productTotal = product.price * product.quantity; // Calculate individual product total
            return (
              <div key={product.id} className="mb-6 p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="mb-2">Price per item: ${product.price.toFixed(2)}</p>
                <div className="flex items-center justify-between">
                  <div>
                    {product.category === "Sports" ? (
                      <span className="text-gray-700"> {product.quantity}</span>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
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
                        </div>
                        <h2 className="text-gray-700 sm:ml-4 sm:mt-0 mt-2">: ${productTotal.toFixed(2)}</h2>
                      </div>
                    )}
                  </div>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mt-4 mr-4"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </button>
            <button
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 mt-4"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
