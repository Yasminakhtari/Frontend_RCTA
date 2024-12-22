import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // Import the Quill editor styles
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const base_url = "https://backend-rcta.onrender.com/api/v1";
// export const base_url = "http://localhost:8082/api/v1";

interface Service {
  id: number;
  group: string;
  category: string;
  subCategory: string;
  name: string;
  duration: number;
  price: number;
  status: string;
  visible: boolean;
}
interface TennisData {
  id: number;
  groups: string | null;
  category: string | null;
  subcategory: string | null;
  imgUrl: string | null;
  name: string | null;
  description: string | null;
  duration: number | null;
  price: number | null;
  status: string | null;
  discount: number;
  disbegindate: string | null; // Using string to represent ISO date format
  disenddate: string | null;   // Using string to represent ISO date format
  disquantity: number | null;
  phoneNumber: string | null;
}
const initialServices: Service[] = [
  { id: 1, group: "About-us", category: "", subCategory: "", name: "About Us Section", duration: 10, price: 0, status: "Active", visible: true },
  { id: 2, group: "Contact-us", category: "", subCategory: "", name: "Contact Page", duration: 15, price: 0, status: "Inactive", visible: true },
  { id: 3, group: "Gallery", category: "", subCategory: "", name: "Image Gallery", duration: 30, price: 0, status: "Inactive", visible: false },
  { id: 4, group: "Products", category: "", subCategory: "", name: "Product Detail Page", duration: 45, price: 150, status: "Active", visible: true },
];

const AddService: React.FC = () => {
  //const [groups, setGroup] = useState("");
   const [services, setServices] = useState<Service[]>(initialServices);
  const [groups, setGroups] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");

  const [customGroup, setCustomGroup] = useState(""); // New state for custom group
  const [customCategory, setCustomCategory] = useState(""); // New state for custom category
  const [customSubCategory, setCustomSubCategory] = useState(""); // New state for custom subcategory

  const [groupFilter, setGroupFilter] = useState<string>("select");
    const [categoryFilter, setCategoryFilter] = useState<string>("select");
    const [subCategoryFilter, setSubCategoryFilter] = useState<string>("select");

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
  const token = JSON.parse(localStorage.getItem("token") || "")
  const [responseData, setResponseData] = useState<[string, string[]][]>([]);
  const [categories, setCategories] = useState<string[]>([]);
   const [subCategories, setSubCategories] = useState<string[]>([]);
 //const [categoryFilter, setCategoryFilter] = useState<string>("All");
 const [statusFilter, setStatusFilter] = useState<string>("All");
 const [tableData, setTableData] = useState<TennisData[]>([]);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Extract `id` from URL
  
  
  const filteredServices = services.filter((service) => {
   // const matchesSearch = service.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesGroup = groupFilter === "All" || service.group === groupFilter;
    const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
    const matchesSubCategory = subCategoryFilter === "All" || service.subCategory === subCategoryFilter;
    const matchesStatus = statusFilter === "All" || service.status === statusFilter;
    return matchesGroup && matchesCategory && matchesSubCategory && matchesStatus;
  });

  // const groupCategoryMap: { [key: string]: { categories: string[]; subCategories: { [key: string]: string[] } } } = {
  //   "About-us": {
  //     categories: ["Coaches"],
  //     subCategories: {
  //       Coaches: ["Owner/Head Coach", "Assistant Coach", "Fitness Coach"],
  //     },
  //   },
  //   "Contact-us": {
  //     categories: [""],
  //     subCategories: {
  //       "": ["Phone No", "Email", "Current Place"],
  //     },
  //   },
  //   "Gallery": {
  //     categories: ["Coaches", "Students", "Achievements"],
  //     subCategories: {
  //       Coaches: [],
  //       Students: [],
  //       Achievements: [],
  //     },
  //   },
  //   "Products": { categories: [], subCategories: {} },
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await
          axios.get(`${base_url}/getAllTennis`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        console.log(res)

        if (res.data) {
          setTableData(res.data);
          const uniqueGroups = Array.from(
            new Set(
              res.data.map((item: { groups: string }) => item.groups.toLowerCase())
            )
          ).map((group) =>
            res.data.find((item: { groups: string }) => item.groups.toLowerCase() === group)?.groups
          );
          setGroups(uniqueGroups); // Update the groups state
          //console.log(uniqueGroups)
        }
      } catch (error) {
        console.error("Error fetching tennis data:", error);
      }
    };

    if (token) {
      fetchData(); // Call the async function
    }
  }, [token]);


  //categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = JSON.parse(localStorage.getItem("token") || "null"); // Retrieve token
        const response = await axios.get(`${base_url}/getAllCategoriesAndSubCategories`, {

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("okkkkkkkkkk getAllcs" + response.data);

        const data: [string, string[]][] = response.data;
        setResponseData(data); // Save full response

        // Extract categories from the response
        const extractedCategories = data.map((item) => item[0]);
        setCategories([ ...extractedCategories]); // Include "All" as default
      } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
      }
    };

    fetchData();
  }, []);

  // Update subcategories when category changes
  useEffect(() => {
    if (categoryFilter !== "All") {
      const selectedCategory = responseData.find((item) => item[0] === categoryFilter);
      setSubCategories(selectedCategory ? [ ...selectedCategory[1]] : []);
    } else {
      setSubCategories(["select"]);
    }
  }, [categoryFilter, responseData]);



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

  //const categories = groups !== "All" ? groupCategoryMap[groups]?.categories || [] : [];
  //const subCategories = category !== "All" ? groupCategoryMap[groups]?.subCategories[category] || [] : [];
  //let token = JSON.parse(localStorage.getItem("token") || "");

  console.log(token);
  useEffect(() => {
    if (id) {
      axios
        .get(`{base_url}/getTennis/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const data = response.data.data;
          console.log(data)
          setGroupFilter(data.groups || "");
          setCategoryFilter(data.category || "");
          setSubCategoryFilter(data.subcategory || "");
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
      groups: customGroup || groupFilter,
      category: customCategory || categoryFilter,
      subcategory: customSubCategory || subCategoryFilter,
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
          `{base_url}/updateTennis/${id}`,
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
        console.log(tennis)
        const response = await axios.post(
          `{base_url}/createTennis`,
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
  
    useEffect(() => {
      if (groupFilter === "All") {
        // For "All" group filter, get all unique categories, excluding null
        setCategories([
          // "All", 
          ...Array.from(
            new Set(
              tableData
                .filter(item => item.category != null) // Exclude null categories
                .map(item => item.category as string) // Assert category as string
            )
          )
        ]);
      } else {
        // Filter categories based on selected group and exclude null categories
        const filteredCategories = tableData
          .filter((item) => item.groups === groupFilter)
          .filter(item => item.category != null) // Exclude null categories
          .map((item) => item.category as string); // Assert category as string
    
        setCategories([ ...Array.from(new Set(filteredCategories))]);
      }
    }, [groupFilter,tableData]); // Re-run effect when groupFilter or tableData changes
    
  

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
                value={groupFilter}
                onChange={(e) => {
                  setGroupFilter(e.target.value);
                  setCategoryFilter("select");
                  setSubCategoryFilter("select");
                }}
              className="w-full border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-500"
            >
                <option disabled value="select">Select</option>
                <option value="New" className="text-amber-700">New</option>
                {groups?.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {groupFilter === "New" && (
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
             value={categoryFilter}
             onChange={(e) => {
               setCategoryFilter(e.target.value);
               setSubCategoryFilter("select");
             }}
              className="w-full border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-500"
            >       <option disabled value="select">Select</option>
                  <option value="New">New</option>
              {categories?.length > 0 ? (
                    categories?.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))
              ) : (
                <option value="">No Options Available</option>
              )}
          
            </select>
            {categoryFilter=== "New" && (
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
              value={subCategoryFilter}
              onChange={(e) => setSubCategoryFilter(e.target.value)}
              className="w-full border border-gray-300 p-2 mt-1 rounded focus:outline-none focus:ring focus:border-blue-500"
            >       <option disabled value="select">Select</option>
              <option value="New">New</option>
              {subCategories?.length > 0 ? (
                  subCategories?.map((subCategory, index) => (
                    <option key={index} value={subCategory}>
                      {subCategory}
                    </option>
                  ))
              ) : (
                <option value="">No Options Available</option>
              )}
              
            </select>
            {subCategoryFilter === "New" && (
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
