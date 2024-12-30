import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productData, Product } from "./ProductData";
import { useCart } from "./CartContext"; // Use the custom hook

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = productData.find((p: Product) => p.id === Number(id));
  const { addToCart } = useCart(); // Access the addToCart function via useCart
  const navigate = useNavigate(); // Use navigate for redirection
  const [message, setMessage] = useState<string | null>(null); // State to manage success message

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add the product to the cart
      setMessage("Product added successfully!"); // Set success message
      setTimeout(() => setMessage(null), 3000); // Clear the message after 3 seconds
    }
  };

  if (!product) {
    return <div className="container mx-auto p-4 sm:p-8 mt-10">Product not found.</div>;
  }

  return (
    <div className=" mx-auto p-4 sm:p-8 mt-16">
      {/* Product Details Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">{product.name}</h1>
          {product.category && (
            <p className="text-gray-600 mb-4">Category: {product.category}</p>
          )}
          <p className="text-xl text-gray-700 font-semibold mb-4">
            Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="flex flex-col gap-4">
            {/* Success Message */}
            {message && (
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md">
                {message}
              </div>
            )}
            {/* Add to Cart Button */}
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleAddToCart} // Use the handler function
            >
              Add to Cart
            </button>

            {/* Go to Cart Button */}
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/cart")} // Navigate to the cart page
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;