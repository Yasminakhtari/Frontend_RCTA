// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import Flatpickr from 'react-flatpickr';
// import 'flatpickr/dist/themes/material_green.css';
// import ReactQuill from 'react-quill'; // Import React Quill
// import 'react-quill/dist/quill.snow.css'; // Import styles
// import { useUserData } from '@/queries/userData';
// import { getCategoriesAndSubCategories, updateIvblu } from '@/api/ivblu.api';
// // import './reactquill.css';

// // Define fonts and sizes you want to allow
// const Font = ReactQuill.Quill.import('formats/font');
// Font.whitelist = ["Roboto", "Raleway", "Montserrat", "Lato", "Rubik", "Ariel"];
// ReactQuill.Quill.register(Font, true);

// const EditService = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Get the service id from URL params
//   const { data, refetch, isLoading, error } = useUserData();
//   const [formData, setFormData] = useState({
//     id: '',
//     groups: '',
//     category: '',
//     subcategory: '',
//     imgUrl: '',
//     name: '',
//     description: '',
//     duration: '',
//     price: '',
//     status: 'Active',
//     discount: 0,
//     disbegindate: null,
//     disenddate: null,
//     disquantity: 0,
//   });
//   const [categoriesData, setCategoriesData] = useState([]);  // Holds categories and subcategories
//   const [groups, setGroups] = useState([]);  // If needed for groups
//   const [filteredSubcategories, setFilteredSubcategories] = useState([]);  // Dynamic subcategories based on category
//   const [newGroups, setNewGroups] = useState('');
//   const [newCategory, setNewCategory] = useState('');
//   const [newSubcategory, setNewSubcategory] = useState('');
//   const modules = {
//     toolbar: [
//       [{ 'font': Font.whitelist }], // Add font options here
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header options
//       [{ 'align': [] }], // Text alignment
//       ['bold', 'italic', 'underline', 'strike'], // Formatting options
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }], // List options
//       [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript and superscript
//       [{ 'indent': '-1' }, { 'indent': '+1' }], // Indentation
//       // [{ 'direction': 'rtl' }], // Text direction
//       [{ 'color': [] }, { 'background': [] }], // Color and background
//       ['link'], // Link, image, video
//       // ['link', 'image', 'video'], // Link, image, video
//       ['clean'], // Remove formatting button
//       ['blockquote'], // Blockquote and code block
//       // ['blockquote', 'code-block'], // Blockquote and code block
//     ],
//   };


//   useEffect(() => {
//     const loadCategoriesAndService = async () => {
//       try {
//         // Load categories and subcategories
//         const categories = await getCategoriesAndSubCategories();
//         setCategoriesData(categories);
        
//         // Extract unique groups
//         if (data && data.allServices) {
//           const uniqueGroups = [...new Set(data.allServices.map(service => service.groups).filter(Boolean))];
//           setGroups(uniqueGroups);
//         }

//         // Once categories are loaded, find and set the service data
//         if (data && data.allServices) {
//           const serviceId = parseInt(id, 10); // Ensure id is a number
//           const serviceData = data.allServices.find(service => service.id === serviceId);

//           if (serviceData) {
//             setFormData({
//               id: id,
//               groups: serviceData.groups || '',
//               category: serviceData.category || '',
//               subcategory: serviceData.subcategory || '',
//               imgUrl: serviceData.imgUrl || '',
//               name: serviceData.name || '',
//               description: serviceData.description || '',
//               duration: serviceData.duration || '',
//               price: serviceData.price || '',
//               status: serviceData.status || 'Active',
//               discount: serviceData.discount || 0,
//               disbegindate: serviceData.disbegindate ? new Date(serviceData.disbegindate) : null,
//               disenddate: serviceData.disenddate ? new Date(serviceData.disenddate) : null,
//               disquantity: serviceData.disquantity || 0,
//             });

//             // Set filtered subcategories based on the existing category
//             const foundCategory = categories.find(cat => cat.category === serviceData.category);
//             if (foundCategory) {
//               setFilteredSubcategories(foundCategory.subcategories);
//             }
//           } else {
//             console.warn("No service data found for the provided serviceId");
//           }
//         }
//       } catch (error) {
//         console.error("Error loading categories or service data:", error);
//       }
//     };

//     if (!isLoading && data) {
//       loadCategoriesAndService();
//     }
//   }, [data, isLoading, id]);

//   const handleGroupsChange = (e) => {
//     const selectedGroups = e.target.value;
//     setFormData({ ...formData, groups: selectedGroups });
//   };

//   const handleCategoryChange = (e) => {
//     const selectedCategory = e.target.value;
//     setFormData({ ...formData, category: selectedCategory, subcategory: '' });

//     // Filter subcategories based on the selected category
//     const foundCategory = categoriesData.find(cat => cat.category === selectedCategory);
//     if (foundCategory) {
//       setFilteredSubcategories(foundCategory.subcategories);
//     } else {
//       setFilteredSubcategories([]);
//     }
//   };

//   const handleSubcategoryChange = (e) => {
//     const selectedSubcategory = e.target.value;
//     setFormData({ ...formData, subcategory: selectedSubcategory });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDescriptionChange = (value) => {
//     setFormData({ ...formData, description: value }); // Update the description field directly
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     e.preventDefault();
//     const payload = { ...formData };

//     // Override category and subcategory if "New" is selected
//     if (formData.groups === 'New') {
//       payload.groups = newGroups;
//     }
//     if (formData.category === 'New') {
//       payload.category = newCategory;
//     }
//     if (formData.subcategory === 'New') {
//       payload.subcategory = newSubcategory;
//     }

//     try {
//       const response = await updateIvblu(payload);
//       // const response = await updateIvblu(id, updatedData);
//       console.log(response);
//       alert('Service updated successfully');
//       refetch();
//       navigate(-1);
//     } catch (error) {
//       alert('Failed to update service');
//     }
//   };

//   const handleBack = () => {
//     navigate(-1);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading service data.</div>;
//   }

//   return (
//     <div className="container mx-auto p-0">
//       <div className="flex justify-between items-center mb-6">
//         <button
//           onClick={handleBack}
//           className="flex items-center px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 focus:outline-none"
//         >
//           &#8592; Back
//         </button>
//       </div>
//       <h1 className="text-2xl font-bold text-center mb-4">Edit Service</h1>
//       <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-6 rounded shadow-md">

//         {/* Groups selection */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Groups (Optional)</label>
//           <div className="relative">
//             <select
//               name="groups"
//               value={formData.groups}
//               onChange={handleGroupsChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             >
//               <option value="">Select a Group</option>
//               {groups.map((group, index) => (
//                 <option key={index} value={group}>{group}</option>
//               ))}
//               <option value="New">New</option>
//             </select>
//             {formData.groups === 'New' && (
//               <input
//                 type="text"
//                 value={newGroups}
//                 onChange={(e) => setNewGroups(e.target.value)}
//                 placeholder="Enter new Group"
//                 className="absolute inset-y-0 right-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               />
//             )}
//           </div>
//         </div>

//         {/* Category selection */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Category*</label>
//           <div className="relative">
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleCategoryChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               required
//             >
//               <option value="">Select a Category</option>
//               {categoriesData.map((cat, index) => (
//                 <option key={index} value={cat.category}>{cat.category}</option>
//               ))}
//               <option value="New">New</option>
//             </select>
//             {formData.category === 'New' && (
//               <input
//                 type="text"
//                 value={newCategory}
//                 onChange={(e) => setNewCategory(e.target.value)}
//                 placeholder="Enter new category"
//                 className="absolute inset-y-0 right-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               />
//             )}
//           </div>
//         </div>

//         {/* Subcategory selection */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Sub-Category</label>
//           <div className="relative">
//             <select
//               name="subcategory"
//               value={formData.subcategory}
//               onChange={handleSubcategoryChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             >
//               <option value="">Select a Subcategory</option>
//               {filteredSubcategories.map((sub, index) => (
//                 <option key={index} value={sub}>{sub}</option>
//               ))}
//               <option value="New">New</option>
//             </select>
//             {formData.subcategory === 'New' && (
//               <input
//                 type="text"
//                 value={newSubcategory}
//                 onChange={(e) => setNewSubcategory(e.target.value)}
//                 placeholder="Enter new subcategory"
//                 className="absolute inset-y-0 right-0 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               />
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
//             <input
//               type="text"
//               name="imgUrl"
//               value={formData.imgUrl}
//               onChange={handleInputChange}
//               placeholder="Image URL"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               placeholder="Service Name"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>

//         {/* <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             placeholder="Service Description"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             required
//           />
//         </div> */}

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
//           <ReactQuill
//             name="description"
//             value={formData.description}
//             onChange={handleDescriptionChange} // Update the state on change
//             placeholder="Service Description"
//             theme='snow'
//             modules={modules}
//             className="bg-white rounded border border-gray-300" // Add any custom styles
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Duration</label>
//             <input
//               type="text"
//               name="duration"
//               value={formData.duration}
//               onChange={handleInputChange}
//               placeholder="Duration (e.g., 30 mins)"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={formData.price}
//               onChange={handleInputChange}
//               placeholder="Price (e.g., 100)"
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Discount</label>
//           <input
//             type="number"
//             name="discount"
//             value={formData.discount}
//             onChange={handleInputChange}
//             placeholder="Discount (%)"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Discount Start Date</label>
//             <Flatpickr
//               value={formData.disbegindate}
//               onChange={(date) => setFormData({ ...formData, disbegindate: date })}
//               options={{ dateFormat: 'Y-m-d' }}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">Discount End Date</label>
//             <Flatpickr
//               value={formData.disenddate}
//               onChange={(date) => setFormData({ ...formData, disenddate: date })}
//               options={{ dateFormat: 'Y-m-d' }}
//               className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Discount Quantity</label>
//           <input
//             type="number"
//             name="disquantity"
//             value={formData.disquantity}
//             onChange={handleInputChange}
//             placeholder="Discount Quantity"
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
//           <select
//             name="status"
//             value={formData.status}
//             onChange={handleInputChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
//           >
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </div>

//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Update Service
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditService;
import React from 'react'

const EditService = () => {
  return (
    <div>EditService</div>
  )
}

export default EditService
