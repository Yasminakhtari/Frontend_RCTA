import React from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
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
          {cart.map((product) => (
            <div key={product.id} className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p>Price: ${product.price.toFixed(2)}</p>
              </div>
              <div>
                {product.category === "Sports" ? (
                  <span className="text-gray-700">Quantity: {product.quantity}</span>
                ) : (
                  <>
                    <button
                      className="px-2 border border-gray-500 rounded hover:bg-gray-200"
                      onClick={() => handleQuantityChange(product.id, -1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      className="px-2 border border-gray-500 rounded hover:bg-gray-200"
                      onClick={() => handleQuantityChange(product.id, 1)}
                    >
                      +
                    </button>
                  </>
                )}
              </div>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-6">
            <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 mt-4"
              onClick={() => {
                clearCart();
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

