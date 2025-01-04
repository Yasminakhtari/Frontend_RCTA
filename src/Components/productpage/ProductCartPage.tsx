import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  subCategory?: string;
  brand?: string;
}

const productData: Product[] = [
  { id: 1, name: "Racket", image: "racket.png", category: "Gaming Accessories", subCategory: "Racket", brand: "Babolat" },
  { id: 2, name: "Ball", image: "ball.png", category: "Gaming Accessories", subCategory: "Ball", brand: "Wilson" },
  { id: 3, name: "Gloves", image: "gloves.png", category: "Gaming Accessories", subCategory: "Gloves", brand: "Prince" },
  { id: 4, name: "Shoes", image: "shoes.png", category: "Gaming Accessories", subCategory: "Shoes", brand: "Nike" },
  { id: 5, name: "Shoes", image: "shoes2.png", category: "Gaming Accessories", subCategory: "Shoes", brand: "Puma" },
  { id: 6, name: "Racket", image: "racket.png", category: "Gaming Accessories", subCategory: "Racket", brand: "Wilson" },
  { id: 7, name: "Ball", image: "ball.png", category: "Gaming Accessories", subCategory: "Ball", brand: "Wilson" },
  { id: 8, name: "Gloves", image: "gloves.png", category: "Gaming Accessories", subCategory: "Gloves", brand: "Nike" },
  { id: 9, name: "Shoes", image: "shoes.png", category: "Gaming Accessories", subCategory: "Shoes", brand: "Nike" },
  { id: 10, name: "Shoes", image: "shoes2.png", category: "Gaming Accessories", subCategory: "Shoes", brand: "Nike" },
];

const ProductCartPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  const navigate = useNavigate();

  // Filtered products based on search query and selected brand
  const filteredProducts = productData.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "" || product.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="mx-auto p-4 sm:p-8 mt-20">
      {/* Top Section: Search and Filters */}
      <div className="flex flex-wrap items-center mb-6 space-x-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search in products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-full sm:w-1/4"
        />

        {/* Subcategory Dropdown */}
        <select
          className="border rounded p-2 sm:w-1/6"
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Racket">Racket</option>
          <option value="Ball">Ball</option>
          <option value="Gloves">Gloves</option>
          <option value="Shoes">Shoes</option>
        </select>

        {/* Brand Dropdown */}
        <select
          className="border rounded p-2 sm:w-1/6"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
        >
          <option value="">All Brands</option>
          <option value="Babolat">Babolat</option>
          <option value="Wilson">Wilson</option>
          <option value="Prince">Prince</option>
          <option value="Dunlop">Dunlop</option>
          <option value="Penn">Penn</option>
          <option value="Penn">Puma</option>
          <option value="Penn">Nike</option>
        </select>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">Brand: {product.brand}</p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => {
                navigate(`/details/${product.id}`); // Navigate with product ID
              }}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCartPage;