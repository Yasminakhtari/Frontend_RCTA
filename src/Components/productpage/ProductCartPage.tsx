// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface Product {
//   id: number;
//   name: string;
//   image: string;
//   category: string;
//   subCategory?: string;
// }

// const productData: Product[] = [
//   { id: 1, name: "Racket", image: "racket.png", category: "Gaming Accessories", subCategory: "Racket" },
//   { id: 2, name: "Ball", image: "racket.png", category: "Gaming Accessories", subCategory: "Ball" },
//   { id: 3, name: "Gloves", image: "gloves.png", category: "Gaming Accessories", subCategory: "Gloves" },
//   { id: 4, name: "Shoes", image: "shoes.png", category: "Gaming Accessories", subCategory: "Shoes" },
// ];

// const ProductCartPage: React.FC = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

//   const navigate = useNavigate();

//   // Filtered products based on search and subcategory
//   const filteredProducts = productData.filter((product) => {
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesSubCategory = selectedSubCategory
//       ? product.subCategory === selectedSubCategory
//       : true;
//     return matchesSearch && matchesSubCategory;
//   });

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const handleSubCategoryClick = (subCategory: string | null) => {
//     setSelectedSubCategory(subCategory);
//     setIsSidebarOpen(false); // Close the sidebar on selection
//   };

//   return (
//     <div className="mx-auto p-4 sm:p-8 mt-20">
//       {/* Top Section: Sidebar Toggle Button + Search */}
//       <div className="flex items-center mb-6">
//         <button
//           className="mr-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 text-sm sm:text-base px-3 py-2"
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
//             <h3
//               className="font-bold text-lg mb-4 mt-20 cursor-pointer hover:text-blue-600"
//               onClick={() => handleSubCategoryClick(null)} // Show all products
//             >
//               Products
//             </h3>
//             {Array.from(new Set(productData.map((product) => product.subCategory))).map(
//               (subCategory) => (
//                 <div
//                   key={subCategory}
//                   className="mb-2 cursor-pointer hover:text-blue-600"
//                   onClick={() => handleSubCategoryClick(subCategory!)}
//                 >
//                   {subCategory}
//                 </div>
//               )
//             )}
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredProducts.map((product) => (
//           <div key={product.id} className="bg-white p-4 shadow rounded relative">
//             <img
//               src={product.image}
//               alt={product.name}
//               className="w-full h-40 object-cover mb-4"
//             />
//             <h3 className="font-bold text-lg">{product.name}</h3>
//             <button
//               className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               onClick={() => {
//                 navigate(`/details/${product.id}`); // Navigate with product ID
//               }}
//             >
//               Details
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

interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
  subCategory?: string;
}

const productData: Product[] = [
  { id: 1, name: "Racket", image: "racket.png", category: "Gaming Accessories", subCategory: "Racket" },
  { id: 2, name: "Ball", image: "racket.png", category: "Gaming Accessories", subCategory: "Ball" },
  { id: 3, name: "Gloves", image: "gloves.png", category: "Gaming Accessories", subCategory: "Gloves" },
  { id: 4, name: "Shoes", image: "shoes.png", category: "Gaming Accessories", subCategory: "Shoes" },
];

const ProductCartPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  // Filtered products based on search
  const filteredProducts = productData.filter((product) => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="mx-auto p-4 sm:p-8 mt-20">
      {/* Top Section: Search */}
      <div className="flex items-center mb-6 space-x-4">
        <input
          type="text"
          placeholder="Search in products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded p-2 w-full sm:w-1/2"
        />
        <select
          className="border rounded p-2"
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <option value="">All</option>
          <option value="Racket">Racket</option>
          <option value="Ball">Ball</option>
          <option value="Gloves">Gloves</option>
          <option value="Shoes">Shoes</option>
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
