import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilteredProducts } from "../../Services/TennisService";

interface Product {
  imgUrl: string | undefined;
  subcategory?: string | undefined;
  id: number;
  name: string;
  image: string;
  category: string;
  subCategory?: string;
  brand?: string;
}

const ProductCartPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  // Fetch data on component mount
  const fetchProducts = async () => {
    try {
      const data: Product[] = await getFilteredProducts("Products");
      setProducts(data);

      const uniqueCategories: string[] = Array.from(
        new Set(data.map((product) => product.category))
      );
      setCategories(uniqueCategories);

      // Set initial subcategories based on the first product (or empty if none)
      const uniqueSubcategories: string[] = Array.from(
        new Set(
          data
            .filter((product) => product.category === selectedCategory)
            .map((product) => product.subcategory)
            .filter((sub): sub is string => sub !== undefined)
        )
      );
      setSubcategories(uniqueSubcategories);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Update subcategories when a category is selected
  useEffect(() => {
    if (selectedCategory) {
      // Update subcategories based on selected category
      const filteredSubcategories: string[] = Array.from(
        new Set(
          products
            .filter((product) => product.category === selectedCategory)
            .map((product) => product.subcategory)
            .filter((sub): sub is string => sub !== undefined)
        )
      );
      setSubcategories(filteredSubcategories);
    } else {
      // If no category is selected, show all subcategories
      const allSubcategories: string[] = Array.from(
        new Set(products.map((product) => product.subcategory))
      ).filter((sub): sub is string => sub !== undefined);
      setSubcategories(allSubcategories);
    }
  }, [selectedCategory, products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCategory = !selectedCategory || product.category === selectedCategory;

    // Ensure subcategory is not undefined and is correctly filtered
    const matchesSubcategory =
      !selectedSubcategory ||
      (product.subcategory && product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase());

      const matchesSubcategorySearch = product.subcategory
      ? product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      : false;

      return (
        matchesCategory &&
        matchesSubcategory &&
        (matchesSearch || matchesSubcategorySearch)
      );
  });





  return (
    <div className=" min-h-screen mx-auto p-4 sm:p-8 mt-20">
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
  
      {/* Category Dropdown */}
      <select
        className="border rounded p-2 w-full sm:w-1/4"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
  
      {/* Subcategory Dropdown */}
      <select
        className="border rounded p-2 w-full sm:w-1/4"
        value={selectedSubcategory}
        onChange={(e) => setSelectedSubcategory(e.target.value)}
      >
        <option value="">All</option>
        {subcategories.map((sub) => (
          <option key={sub} value={sub}>
            {sub}
          </option>
        ))}
      </select>
    </div>
  
    {/* Products Grid */}
    {filteredProducts.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded flex flex-col">
            <img
              src={product.imgUrl}
              alt={product.name}
              className="w-full h-40 object-cover sm:h-48 md:h-56 lg:h-64"
            />
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">Brand: {product.subcategory}</p>
            <button
              className="mt-auto w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => navigate(`/details/${product.id}`)}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    ) : (
      // Display message when no products match
      <div className="text-center text-gray-500 mt-10">
        No products found.
      </div>
    )}
  </div>
  
  );
};

export default ProductCartPage;
