import React, { useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

const AddService: React.FC = () => {
  const [group, setGroup] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      group,
      category,
      subCategory,
      imageUrl,
      name,
      description,
      duration,
      price,
      discount,
      discountBeginDate,
      discountEndDate,
      discountQuantity,
      status,
    });
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
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select a Group</option>
            <option value="Group1">About-us</option>
            <option value="Group2">Contact-us</option>
            <option value="Group2">Products</option>
            <option value="Group2">gallery</option>
            <option value="Group2">New</option>
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
            <option value="">Select a Category</option>
            <option value="Category1">Coaches</option>
            <option value="Category2">Contact-us</option>
            <option value="Category2">Students</option>
            <option value="Category2">Achievements</option>
          </select>
        </div>

        {/* Sub-Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sub-Category
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option value="">Select a Subcategory</option>
            <option value="SubCategory1">Owner/Headcoach</option>
            <option value="SubCategory2">Assistant Coach</option>
            <option value="SubCategory2">Fitnace coach</option>
            <option value="SubCategory2">Phone no</option>
            <option value="SubCategory2">Email</option>
            <option value="SubCategory2">Current Place</option>
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
            value={imageUrl}
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