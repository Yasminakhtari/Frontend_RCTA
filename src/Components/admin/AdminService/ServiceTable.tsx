import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

const initialServices: Service[] = [
  { id: 1, group: "About-us", category: "", subCategory: "", name: "About Us Section", duration: 10, price: 0, status: "Active", visible: true },
  { id: 2, group: "Contact-us", category: "", subCategory: "", name: "Contact Page", duration: 15, price: 0, status: "Inactive", visible: true },
  { id: 3, group: "Gallery", category: "", subCategory: "", name: "Image Gallery", duration: 30, price: 0, status: "Inactive", visible: false },
  { id: 4, group: "Products", category: "", subCategory: "", name: "Product Detail Page", duration: 45, price: 150, status: "Active", visible: true },
];

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


const ITEMS_PER_PAGE = 10;

const ServiceTable: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchText, setSearchText] = useState<string>("");
  const [groupFilter, setGroupFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");


  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesGroup = groupFilter === "All" || service.group === groupFilter;
    const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
    const matchesSubCategory = subCategoryFilter === "All" || service.subCategory === subCategoryFilter;
    const matchesStatus = statusFilter === "All" || service.status === statusFilter;
    return matchesSearch && matchesGroup && matchesCategory && matchesSubCategory && matchesStatus;
  });
  

  const categories = groupFilter !== "All" ? groupCategoryMap[groupFilter]?.categories || [] : [];
  const subCategories = categoryFilter !== "All" ? groupCategoryMap[groupFilter]?.subCategories[categoryFilter] || [] : [];

  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  let token = JSON.parse(localStorage.getItem("token") || "")
  const [tableData, setTableData] = useState<TennisData[]>([]);

////////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8082/api/v1/getAllTennis', {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res)
  
        if (res.data) {
          setTableData(res.data); // Update the state with fetched data
        }
      } catch (error) {
        console.error("Error fetching tennis data:", error);
      }
    };
  
    if (token) {
      fetchData(); // Call the async function
    }
  }, [token]);

  // console.log(tableData)
  ////////////////////////////////////
  useEffect(() => {
    const fetchFilteredStatusData = async () => {
      if (statusFilter !== "All") {
        try {
          const res = await axios.get(
            `http://localhost:8082/api/v1/getAllByStatus?status=${statusFilter}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (res.data) {
            setTableData(res.data); // Update the table data based on the API response
          }
        } catch (error) {
          console.error("Error fetching status-based data:", error);
        }
      }
      
      else {
        setTableData(tableData); 
      }
    };
  
    fetchFilteredStatusData();
  }, [statusFilter, token]);
  
  //////////////////////
  
  

  return (
    <div className="bg-white p-4 rounded shadow mt-24 lg:mt-16">
      <h1 className="text-2xl font-bold">All Services</h1>

      {/* Add Service Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/addservice")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between mb-4 ">
        <div className="flex gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Search:</label>
              <input
                type="text"
                placeholder="Search in records..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border border-gray-300 p-2 rounded w-60"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Group:</label>
              <select
                value={groupFilter}
                onChange={(e) => {
                  setGroupFilter(e.target.value);
                  setCategoryFilter("All");
                  setSubCategoryFilter("All");
                }}
                className="border border-gray-300 p-2 rounded w-40"
              >
                <option value="All">All</option>
                {Object.keys(groupCategoryMap).map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category:</label>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setSubCategoryFilter("All");
                }}
                className="border border-gray-300 p-2 rounded w-40"
                disabled={categories.length === 0}
              >
                <option value="All">All</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Sub-Category:</label>
              <select
                value={subCategoryFilter}
                onChange={(e) => setSubCategoryFilter(e.target.value)}
                className="border border-gray-300 p-2 rounded w-40"
                disabled={subCategories.length === 0}
              >
                <option value="All">All</option>
                {subCategories.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>
        </div>

            {/* Check Status */}

          <div className=" items-end">
                <label className="block text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 p-2 rounded w-40"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
        </div>
      </div>

      {/* Services Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Action</th>
            <th className="border border-gray-300 p-2">Service ID</th>
            <th className="border border-gray-300 p-2">Group</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Sub-Category</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length !== 0 && tableData.map((service) => (
            <tr key={service.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => navigate(`/edit-service/${service.id}`)}
                >
                  Edit
                </button>
                {/* <button
                  onClick={() =>
                    setServices((prevServices) =>
                      prevServices.map((s) =>
                        s.id === service.id ? { ...s, visible: !s.visible } : s
                      )
                    )
                  }
                  className={`text-${service.visible ? "green" : "red"}-500`}
                >
                  {service.visible ? "Hide" : "Show"}
                </button> */}
              </td>
              <td className="border border-gray-300 p-2">{service?.id}</td>
              <td className="border border-gray-300 p-2">{service?.groups}</td>
              <td className="border border-gray-300 p-2">{service.category}</td>
              <td className="border border-gray-300 p-2">{service.subcategory}</td>
              <td className="border border-gray-300 p-2">{service.name}</td>
              <td className="border border-gray-300 p-2">{service.duration}</td>
              <td className="border border-gray-300 p-2">${service.price}</td>
              <td className="border border-gray-300 p-2">{service.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`p-2 ${currentPage === 1 ? "text-gray-500" : "text-blue-500"}`}
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`p-2 ${currentPage === totalPages ? "text-gray-500" : "text-blue-500"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ServiceTable;
