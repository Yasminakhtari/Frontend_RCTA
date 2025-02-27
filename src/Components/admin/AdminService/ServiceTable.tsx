import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../apiConfig";
import "react-responsive-modal/styles.css";
//import { FaEdit, FaEye, FaEyeSlash, FaTrash,FaDownload } from "react-icons/fa";

// import { FaEdit } from "react-icons/fa";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { FaTrash } from "react-icons/fa";

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
  disbegindate: string | null;
  disenddate: string | null;
  disquantity: number | null;
  phoneNumber: string | null;
}

const ITEMS_PER_PAGE = 10;

const ServiceTable: React.FC = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [groupFilter, setGroupFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [subCategoryFilter, setSubCategoryFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [groups, setGroups] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<[string, string[]][]>([]);
  const [tableData, setTableData] = useState<TennisData[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<TennisData | null>(null);



  let tokenString = localStorage.getItem("token");
  let token = tokenString ? JSON.parse(tokenString) : null;

  const filteredServices = tableData.filter((service) => {
    const searchTextLower = searchText.toLowerCase();
    const matchesSearch =
      (service.name && service.name.toLowerCase().includes(searchTextLower)) ||
      (service.groups && service.groups.toLowerCase().includes(searchTextLower)) ||
      (service.category && service.category.toLowerCase().includes(searchTextLower)) ||
      (service.subcategory && service.subcategory.toLowerCase().includes(searchTextLower));

    const matchesGroup = groupFilter === "All" || service.groups === groupFilter;
    const matchesCategory = categoryFilter === "All" || service.category === categoryFilter;
    const matchesSubCategory = subCategoryFilter === "All" || service.subcategory === subCategoryFilter;
    const matchesStatus = statusFilter === "All" || service.status === statusFilter;

    return matchesSearch && matchesGroup && matchesCategory && matchesSubCategory && matchesStatus;
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTableData = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        const response = await axios.get(`${base_url}/v1/getFilteredTennis`, {
          params: {
            group: groupFilter !== "All" ? groupFilter : null,
            category: categoryFilter !== "All" ? categoryFilter : null,
            subcategory: subCategoryFilter !== "All" ? subCategoryFilter : null,
            status: statusFilter !== "All" ? statusFilter : null,
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setTableData(response.data);
      } catch (error) {
        console.error("Error Fetching Filtered Tennis Data:", error);
      }
    };
    fetchFilteredData();
  }, [groupFilter, categoryFilter, subCategoryFilter, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, groupFilter, categoryFilter, subCategoryFilter, statusFilter]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${base_url}/v1/getAllTennis`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.data) {
          setTableData(res.data);

          const uniqueGroups = Array.from(new Set(res.data
            .map((item: { groups: string }) => item.groups?.toLowerCase())
            .filter((group: any) => group)
          )).map((group) => res.data.find((item: { groups: string }) => item.groups?.toLowerCase() === group)?.groups);
          setGroups(uniqueGroups);
        }
      } catch (error) {
        console.error("Error fetching tennis data:", error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    const fetchFilteredStatusData = async () => {
      if (statusFilter !== "All") {
        try {
          const res = await axios.get(`${base_url}/v1/getAllByStatus`, {
            params: { status: statusFilter },
            headers: { Authorization: `Bearer ${token}` },
          });
          setTableData(res.data);
        } catch (error) {
          console.error("Error fetching status-based data:", error);
        }
      } else {
        setTableData(tableData);
      }
    };
    fetchFilteredStatusData();
  }, [statusFilter, token]);

  const toggleStatus = async (id: number, status: string) => {
    try {
      const updatedStatus = status === 'Active' ? 'Inactive' : 'Active';
      const response = await axios.post(`${base_url}/v1/toggleStatus/${id}?status=${updatedStatus}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Service status updated to " + response.data.data.status);
      setTableData(prevData =>
        prevData.map(service =>
          service.id === id ? { ...service, status: response.data.data.status } : service
        )
      );
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/v1/getAllCategoriesAndSubCategories`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data: [string, string[]][] = response.data;
        setResponseData(data);
        const extractedCategories = data.map((item) => item[0]);
        setCategories(["All", ...extractedCategories]);
      } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    if (groupFilter === "All") {
      setCategories([
        "All",
        ...Array.from(new Set(tableData.filter(item => item.category != null).map(item => item.category as string))),
      ]);
    } else {
      const filteredCategories = tableData
        .filter((item) => item.groups === groupFilter)
        .filter(item => item.category != null)
        .map((item) => item.category as string);
      setCategories(["All", ...Array.from(new Set(filteredCategories))]);
    }
  }, [groupFilter, tableData]);

  useEffect(() => {
    if (categoryFilter !== "All") {
      const selectedCategory = responseData.find((item) => item[0] === categoryFilter);
      setSubCategories(selectedCategory ? ["All", ...selectedCategory[1]] : ["All"]);
    } else {
      setSubCategories(["All"]);
    }
  }, [categoryFilter, responseData]);

  const deleteServiceData = async (serviceId: number) => {
    try {
      const response = await axios.delete(`${base_url}/v1/deleteTennis/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setTableData((prevData) => prevData.filter((service) => service.id !== serviceId));
        alert("Service deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      alert("Failed to delete the service. Please try again.");
    }
  };

  const openDeleteModal = (service: TennisData) => {
    setSelectedService(service);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedService(null);
    setDeleteModalOpen(false);
  };

  const confirmDelete = async () => {
    if (selectedService) {
      await deleteServiceData(selectedService.id);
      closeDeleteModal();
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">All Services</h1>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate("/addservice")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center"
        >
          <span className="mr-2">+</span> Add Service
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search:</label>
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group:</label>
            <select
              value={groupFilter}
              onChange={(e) => {
                setGroupFilter(e.target.value);
                setCategoryFilter("All");
                setSubCategoryFilter("All");
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              {groups.map((group, index) => (
                <option key={index} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setSubCategoryFilter("All");
              }}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={categories.length === 0}
            >
              <option value="All">All</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category:</label>
            <select
              value={subCategoryFilter}
              onChange={(e) => setSubCategoryFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={subCategories.length === 0}
            >
              <option value="All">All</option>
              {subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option disabled value="All">All</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="w-full min-w-[1000px] bg-white">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sl No.</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Group</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sub-Category</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Text</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Duration</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedTableData.map((service, index) => (
              <tr key={service.id} className="hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4 space-x-3 text-gray-700">
                  <button
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-100"
                    onClick={() => navigate(`/add-service/${service.id}`)}
                  >
                    {/* <FaEdit size={20} /> */}
                    ✏️
                  </button>
                  <button
                    className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-100"
                    onClick={() => toggleStatus(service.id, service.status ?? 'inactive')}
                  >
                    {service.status === 'Active' ? "👁️" : "🙈"}
                  </button>
                  {/* <button
                    className="text-red-500 hover:text-red-700 ml-2"
                    onClick={() => deleteServiceData(service.id)}
                  >
                    🗑
                  </button> */}
                  <button
                    onClick={() => openDeleteModal(service)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-100"
                  >
                    {/* <FaTrash size={20} /> */}
                    🗑️
                  </button>

                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                <td className="px-6 py-4">
                  {service.imgUrl && (
                    <img
                      src={service.imgUrl}
                      alt="Service"
                      className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200"
                    />
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">{service?.groups}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{service.category}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{service.subcategory}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{service.name}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{service.duration}</td>
                <td className="px-4 py-3 text-sm text-gray-700">${service.price}</td>
                {/* <td className="px-4 py-3 text-sm text-gray-700">{service.status}</td> */}
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${service.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                    }`}>
                    {service.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="flex justify-center items-center mt-6 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Next
        </button>
      </div> */}
      {/* Pagination */}
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-gray-600 text-sm">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredServices.length)}
          of {filteredServices.length} entries
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3.5 py-1.5 rounded-md text-sm font-medium ${currentPage === page
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md text-sm font-medium ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              }`}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default ServiceTable;