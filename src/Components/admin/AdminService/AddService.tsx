import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddService: React.FC = () => {
  const [groups, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [customGroup, setCustomGroup] = useState(""); // New state for custom group
  const [customCategory, setCustomCategory] = useState(""); // New state for custom category
  const [customSubCategory, setCustomSubCategory] = useState(""); // New state for custom subcategory
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
  const { id } = useParams<{ id: string }>(); // Extract `id` from URL
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
  let token = JSON.parse(localStorage.getItem("token") || "");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8082/api/v1/getTennis/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          setGroup(data.groups || "");
          setCategory(data.category || "");
          setSubCategory(data.subcategory || "");
          setImageUrl(data.imgUrl || "");
          setName(data.name || "");
          setDescription(data.description || "");
          setDuration(data.duration || "");
          setPrice(data.price || "");
          setDiscount(data.discount || 0);
          setDiscountBeginDate(data.discountBeginDate || "");
          setDiscountEndDate(data.discountEndDate || "");
          setDiscountQuantity(data.discountQuantity || 0);
          setStatus(data.status || "Active");
        })
        .catch((error) => {
          console.error("Error fetching service details:", error);
        });
    }
  }, [id, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tennis = {
      groups: customGroup || groups,
      category: customCategory || category,
      subcategory: customSubCategory || subcategory,
      name,
      description,
      duration,
      price,
      status,
      discount,
      imgUrl,
    };

    try {
      if (id) {
        // Update existing service
        const response = await axios.put(
          `http://localhost:8082/api/v1/updateTennis/${id}`,
          tennis,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Service updated successfully:", response.data);
        alert("Service updated successfully!");
      } else {
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
        alert("Service added successfully");
        console.log("Service added successfully:", response.data);
      }
      navigate("/servicetable");
    } catch (error) {
      console.error("Error adding service:", error);
      alert("Failed to add service. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6  mt-24 lg:mt-20">
      <button
        onClick={() => navigate("/servicetable")}
        className="mb-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
      >
        ← Back
      </button>
      <h1 className="text-center text-2xl font-bold mb-6">{id ? "Edit Service" : "Add Service"}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        {/* Group */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Groups (Optional)
          </label>
          <div className="relative">
              <select
                value={groups}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Select a Group</option>
                <option value="About-us">About-us</option>
                <option value="Contact-us">Contact-us</option>
                <option value="Products">Products</option>
                <option value="Gallery">Gallery</option>
                <option value="New">New</option> 
              </select>
              {groups === "New" && (
                <input
                  type="text"
                  placeholder="Enter new group"
                  value={customGroup}
                  onChange={(e) => setCustomGroup(e.target.value)}
                 className="absolute  inset-y-0 right-0 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              )}
          
          </div>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Category*
          </label>
          <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                {categories.length > 0 ? (
                  categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))
                ) : (
                  <option value="">No Options Available</option>
                )}
                <option value="New">New</option>
              </select>
              {category === "New" && (
                <input
                  type="text"
                  placeholder="Enter new category"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="absolute  inset-y-0 right-0 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
                />
              )}
          </div>
        </div>

        {/* Sub-Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sub-Category
          </label>
          <div className="relative">
          <select
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            {subCategories.length > 0 ? (
              subCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))
            ) : (
              <option value="">No Options Available</option>
            )}
            <option value="New">New</option> 
          </select>
          {subcategory === "New" && (
            <input
              type="text"
              placeholder="Enter new subcategory"
              value={customSubCategory}
              onChange={(e) => setCustomSubCategory(e.target.value)}
              className="absolute  inset-y-0 right-0 border border-gray-300 p-2 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          )}
          
          </div>
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
            {id ? "Update Service" : "Add Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
