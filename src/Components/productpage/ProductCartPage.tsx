
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCart } from "./CartContext";

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   category: string;
//   subCategory?: string;
// }

// const productData: Product[] = [
//   { id: 1, name: "Racket", price: 20.0, image: "racket.png", category: "Gaming Accessories", subCategory: "Racket" },
//   { id: 2, name: "Ball", price: 10.0, image: "racket.png", category: "Gaming Accessories", subCategory: "Ball" },
//   { id: 3, name: "Gloves", price: 15.0, image: "gloves.png", category: "Gaming Accessories", subCategory: "Gloves" },
//   { id: 4, name: "Shoes", price: 30.0, image: "shoes.png", category: "Gaming Accessories", subCategory: "Shoes" },
// ];

// const ProductCartPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOrder, setSortOrder] = useState<"low-to-high" | "high-to-low">("low-to-high");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const { addToCart } = useCart();
//   const navigate = useNavigate();

//   const filteredProducts = productData
//     .filter((product) =>
//       product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .sort((a, b) =>
//       sortOrder === "low-to-high" ? a.price - b.price : b.price - a.price
//     );

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <div className=" mx-auto p-4 sm:p-8 mt-20">
//       {/* Top Section: Sidebar Toggle Button + Search + Sort */}
//       <div className="flex items-center mb-6 ">
//         <button
//           className="mr-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
//           onClick={toggleSidebar}
//         >
//           ---
//         </button>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border rounded p-2 w-full sm:w-1/2"
//         />
//         <select
//           value={sortOrder}
//           onChange={(e) => setSortOrder(e.target.value as "low-to-high" | "high-to-low")}
//           className="border rounded p-2 ml-4"
//         >
//           <option value="low-to-high">Price: Low to High</option>
//           <option value="high-to-low">Price: High to Low</option>
//         </select>
//       </div>

//       {/* Sidebar */}
//       {isSidebarOpen && (
//         <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40">
//           <div className="p-4">
//             <button
//               className="text-blue-500 hover:text-gray-700 float-right mt-16"
//               onClick={toggleSidebar} 
//             >
//               ×
//             </button>
//             <h3 className="font-bold text-lg mb-4">All Products</h3>
//             {productData.map((product) => (
//               <div key={product.id} className="mb-4">
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-full h-20 object-cover mb-2"
//                 />
//                 <h4 className="font-semibold text-gray-700">{product.name}</h4>
//                 <p className="text-gray-500">€{product.price.toFixed(2)}</p>
//                 <button
//                   className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
//                   onClick={() => {
//                     addToCart({ ...product, quantity: 1 });
//                     navigate("/cart");
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white p-4 shadow rounded relative">
//             <img
//                src={product.image}
//               alt={product.name}
//               className="w-full h-40 object-cover mb-4"
//             />
//             <h3 className="font-bold text-lg">{product.name}</h3>
//             <p className="text-gray-700">€{product.price.toFixed(2)}</p>
//             <button
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               onClick={() => {
//                 addToCart({ ...product, quantity: 1 });
//                 navigate("/cart");
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductCartPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  subCategory?: string;
}

const productData: Product[] = [
  { id: 1, name: "Racket", price: 20.0, image: "racket.png", category: "Gaming Accessories", subCategory: "Racket" },
  { id: 2, name: "Ball", price: 10.0, image: "racket.png", category: "Gaming Accessories", subCategory: "Ball" },
  { id: 3, name: "Gloves", price: 15.0, image: "gloves.png", category: "Gaming Accessories", subCategory: "Gloves" },
  { id: 4, name: "Shoes", price: 30.0, image: "shoes.png", category: "Gaming Accessories", subCategory: "Shoes" },
];

const ProductCartPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"low-to-high" | "high-to-low">("low-to-high");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Filtered products based on search and subcategory
  const filteredProducts = productData
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubCategory = selectedSubCategory
        ? product.subCategory === selectedSubCategory
        : true;
      return matchesSearch && matchesSubCategory;
    })
    .sort((a, b) =>
      sortOrder === "low-to-high" ? a.price - b.price : b.price - a.price
    );

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSubCategoryClick = (subCategory: string | null) => {
    setSelectedSubCategory(subCategory);
    setIsSidebarOpen(false); // Close the sidebar on selection
  };
  

  return (
    <div className="mx-auto p-4 sm:p-8 mt-20">
      {/* Top Section: Sidebar Toggle Button + Search + Sort */}
      <div className="flex items-center mb-6">
        <button
        className="mr-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm sm:text-base px-3 py-2"
        onClick={toggleSidebar}
      >
        ---
      </button>

        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-full sm:w-1/2"
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "low-to-high" | "high-to-low")}
          className="border rounded p-2 ml-4"
        >
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40">
          <div className="p-4">
            <button
              className="text-blue-500 hover:text-gray-700 float-right mt-16"
              onClick={toggleSidebar}
            >
              ×
            </button>
            {/* <h3 className="font-bold text-lg mb-4 mt-20">products</h3> */}
            <h3
        className="font-bold text-lg mb-4 mt-20 cursor-pointer hover:text-blue-600"
        onClick={() => handleSubCategoryClick(null)} // Show all products
      >
        Products
      </h3>
            {Array.from(new Set(productData.map((product) => product.subCategory))).map(
              (subCategory) => (
                <div
                  key={subCategory}
                  className="mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => handleSubCategoryClick(subCategory!)}
                >
                  {subCategory}
                </div>
              )
            )}
          </div>
        </div>
      )}

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
            <p className="text-gray-700">€{product.price.toFixed(2)}</p>
            <button
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              onClick={() => {
                addToCart({ ...product, quantity: 1 });
                navigate("/cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCartPage;
