import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTennisById } from "../../Services/TennisService"; // Service to fetch data
import { useCart } from "./CartContext"; // Custom hook for cart context

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get product ID from URL params
  const { addToCart } = useCart(); // Cart context function
  const navigate = useNavigate(); // Use navigate for routing

  // State variables
  const [product, setProduct] = useState<any>(null); // To store fetched product
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [message, setMessage] = useState<string | null>(null); // Success message
  const token = localStorage.getItem('authToken') || ''; // Get the auth token from localStorage

  // Use useEffect hook unconditionally at the top level
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Set loading to true before API call
        const response = await getTennisById(id); // Fetch the product by ID
        console.log(response); // Log the full response to check its structure

        // Check if data exists and set the product state accordingly
        if (response?.data) {
          setProduct(response.data); // Update the product state with the fetched data
        } else {
          setError('Product not found'); // Set error if no product data is found
        }
        
        setLoading(false); // Set loading to false after fetching
      } catch (err) {
        setLoading(false); // Stop loading in case of error
        setError('Failed to fetch tennis data'); // Set the error message
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]); // Dependency on id to fetch the product every time the id changes

  // Handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add the product to cart
      setMessage("Product added successfully!"); // Set success message
      setTimeout(() => setMessage(null), 3000); // Clear success message after 3 seconds
    }
  };

  // If product is loading or an error occurred
  if (loading) {
    return <div className="container mx-auto p-4 sm:p-8 mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 sm:p-8 mt-10 text-red-600">{error}</div>;
  }

  // If product is not found
  if (!product) {
    return <div className="container mx-auto p-4 sm:p-8 mt-10">Product not found.</div>;
  }

  return (
    <div className="mx-auto p-4 sm:p-8 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product?.imgUrl || 'default_image.jpg'} // Provide a fallback image
            alt={product?.name || 'Product Image'}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-4">{product?.name || 'Product Name'}</h1>
          {product?.category && (
            <p className="text-gray-600 mb-4">Category: {product?.category}</p>
          )}
          <p className="text-xl text-gray-700 font-semibold mb-4">
            Price: ${product?.price?.toFixed(2) || '0.00'}
          </p>
          {/* <p className="text-gray-600 mb-6">{product?.description || 'No description available'}</p> */}
          <div className="text-gray-600 mb-6">
          {/* Option 1: Render HTML tags */}
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: product?.description || 'No description available' }}
          />
          
          {/* Option 2: Remove HTML tags and show plain text */}
          {/* <p>{stripHTMLTags(product?.description || 'No description available')}</p> */}
        </div>
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
              onClick={handleAddToCart} // Add to cart handler
            >
              Add to Cart
            </button>

            {/* Go to Cart Button */}
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              onClick={() => navigate("/cart")} // Redirect to the cart page
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
