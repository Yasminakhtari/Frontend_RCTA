import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  subcategory: string; // Use consistent naming
  brand: string;
  price: number; // Add price
}

interface ProductDetailsProps {
  productData: Product[];
}

const ProductDetailsPage: React.FC<ProductDetailsProps> = ({ productData }) => {
  const { subCategory } = useParams<{ subCategory?: string }>();
  const navigate = useNavigate();

  if (!subCategory) {
    return <p className="text-center text-gray-500">Invalid category.</p>;
  }

  // Filter products based on the subcategory
  const filteredProducts = productData.filter(
    (product) => product.subcategory?.toLowerCase() === subCategory.toLowerCase()
  );

  return (
    <div className="mx-auto min-h-screen p-4 sm:p-8 mt-20">
      <h2 className="text-xl font-bold mb-6">Products: {subCategory}</h2>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow rounded relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">Brand: {product.brand}</p>
              <p className="text-gray-600">Price: ${product.price}</p>
              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                onClick={() => alert(`Added ${product.name} to cart`)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="mt-8 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default ProductDetailsPage;
