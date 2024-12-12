import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddService: React.FC = () => {
  const [groups, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountBeginDate, setDiscountBeginDate] = useState("");
  const [discountEndDate, setDiscountEndDate] = useState("");
  const [discountQuantity, setDiscountQuantity] = useState(0);
  const [status, setStatus] = useState("Active");

  const navigate = useNavigate();
  const groupCategoryMap: { [key: string]: { categories: string[]; subCategories: { [key: string]: string[] } } } = {
    "About-us": {
      categories: ["Coaches"],
      subCategories: {
        Coaches: ["Owner/Head Coach", "Assistant Coach", "Fitness Coach"],
      },
    }, 
    "Contact-us": {
      categories: [""],
      subCategories: {
        "": ["Phone No", "Email", "Current Place"],
      },
    },
    "Gallery": {
      categories: ["Coaches", "Students", "Achievements"],
      subCategories: {
        Coaches: [],
        Students: [],
        Achievements: [],
      },
    },
    
    "Products": { categories: [], subCategories: {} },
  };

  // Custom toolbar options for ReactQuill
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // Basic text styles
    ["blockquote", "code-block"], // Blockquote and code
    [{ header: 1 }, { header: 2 }], // Headers
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ script: "sub" }, { script: "super" }], // Subscript and superscript
    [{ align: [] }], // Align text
    ["link"], // Add links
    ["clean"], // Clear formatting
  ];
  const categories = groups !== "All" ? groupCategoryMap[groups]?.categories || [] : [];
  const subCategories = category !== "All" ? groupCategoryMap[groups]?.subCategories[category] || [] : [];
  let token=JSON.parse(localStorage.getItem("token") || "")
  console.log(categories)
  console.log(subCategories)
  console.log(token)
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const tennis = {
      groups,
      category,
      subcategory,
      name,
      description,
      duration,
      price,
      status,
      discount,
      imgUrl
      // disbegindate,
      // disenddate,
      // disquantity,
      // phoneNumber: "1234567890"
    };

//console.log(tennis)
    // Create a FormData object
    const formData = new FormData();
    

    // Append the tennis as a string
    await formData.append("tennis", JSON.stringify(tennis));
    console.log(formData)
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
  });
 
  //   try {
  //     const response = await fetch("http://localhost:8082/api/v1/createTennis", {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Authorization: `Bearer ${token}`, 
  //       },
  //     });

  //     if (response.ok) {
  //         const responseData = await response.json();
  //         console.log("Success:", responseData);
  //     } else {
  //         console.error("Error:", response.statusText);
  //     }
  // } catch (error) {
  //     console.error("Error:", error);
  // }
    try {
      const response = await axios.post(
        "http://localhost:8082/api/v1/createTennis",
        tennis,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Service added successfully:", response.data);
      // navigate("/servicetable");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    }

  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button
        onClick={() => navigate("/servicetable")} // Replace "/servicetable" with the actual route for ServiceTable
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <h1 className="text-center text-2xl font-bold mb-6">Add Service</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        {/* Group */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Groups (Optional)
          </label>
          <select
            value={groups}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select a Group</option>
            <option value="About-us">About-us</option>
            <option value="Contact-us">Contact-us</option>
            <option value="Products">Products</option>
            <option value="Gallery">gallery</option>
            {/* <option value="New">New</option> */}
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category*
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            {/* <option value="">Select a Category</option>
            <option value="Coaches">Coaches</option>
            <option value="Contact-us">Contact-us</option>
            <option value="students">Students</option>
            <option value="Achievements">Achievements</option> */}
            {categories.length > 0
              ? categories.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))
              : <option value="">No Options Available</option>}

          </select>
        </div>

        {/* Sub-Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sub-Category
          </label>
          <select
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            {/* <option value="">Select a Subcategory</option>
            <option value="Owner/Head Coach">Owner/Headcoach</option>
            <option value="Assistant Coach">Assistant Coach</option>
            <option value="Fitnace Coach">Fitnace coach</option>
            <option value="Phone no">Phone no</option>
            <option value="Email">Email</option>
            <option value="Current Place">Current Place</option> */}
            {
              subCategories.length>0 ?
                subCategories.map((item)=>(<option key={item} value={item}>{item}</option>))
                : <option value="">No Options Available</option>
            }
          </select>
        </div>

        {/* Image URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Image URL"
            value={imgUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name*</label>
          <input
            type="text"
            placeholder="Service Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={{ toolbar: toolbarOptions }} // Custom toolbar applied here
            placeholder="Service Description"
          />
        </div>

        {/* Duration and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration
            </label>
            <input
              type="text"
              placeholder="Only enter numeric value in minutes"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price*
            </label>
            <input
              type="text"
              placeholder="Price (e.g., 100, no currency sign)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Discount */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Quantity
            </label>
            <input
              type="number"
              value={discountQuantity}
              onChange={(e) => setDiscountQuantity(Number(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Discount Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount Begin Date
            </label>
            <input
              type="date"
              value={discountBeginDate}
              onChange={(e) => setDiscountBeginDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount End Date
            </label>
            <input
              type="date"
              value={discountEndDate}
              onChange={(e) => setDiscountEndDate(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
          </div>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;