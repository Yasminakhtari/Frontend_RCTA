
import React from "react";
import { useCart } from "./CartContext";

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart, clearCart, setCart } = useCart();

  const handleQuantityChange = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
    );
  };

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-8 sm:p-16 mt-10">
      <h1 className="text-2xl sm:text-4xl font-bold text-center mb-6">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cart.map((product) => (
            <div key={product.id} className="flex justify-between items-center mb-4 border-b pb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded"
              />
              <div>
                <h2 className="font-bold">{product.name}</h2>
                <p>€{product.price.toFixed(2)}</p>
              </div>
              <div>
                <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                <span className="mx-2">{product.quantity}</span>
                <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4 flex justify-between items-center">
            <p className="font-bold">Total: €{total.toFixed(2)}</p>
            <div>
              <button onClick={clearCart} className="mr-4 bg-blue-600 text-white px-4 py-2 rounded ">
                Clear Cart
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;