import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../../apiConfig";


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
  { id: 1, group: "About-Us", category: "", subCategory: "", name: "About Us Section", duration: 10, price: 0, status: "Active", visible: true },
  { id: 2, group: "Contact-Us", category: "", subCategory: "", name: "Contact Page", duration: 15, price: 0, status: "Inactive", visible: true },
  { id: 3, group: "Gallery", category: "", subCategory: "", name: "Image Gallery", duration: 30, price: 0, status: "Inactive", visible: false },
  { id: 4, group: "Products", category: "", subCategory: "", name: "Product Detail Page", duration: 45, price: 150, status: "Active", visible: true },
];

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
  const [groups, setGroups] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [responseData, setResponseData] = useState<[string, string[]][]>([]); // Holds the full API response

  const [data, setData] = useState([]);
  const [group, setGroup] = useState('');
  const [category, setCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [tableData, setTableData] = useState<TennisData[]>([]);
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



  // const categories = groupFilter !== "All" ? groupCategoryMap[groupFilter]?.categories || [] : [];
  // const subCategories = categoryFilter !== "All" ? groupCategoryMap[groupFilter]?.subCategories[categoryFilter] || [] : [];

  // const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);
  // const paginatedServices = filteredServices.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );
  let tokenString = localStorage.getItem("token");
  let token = tokenString ? JSON.parse(tokenString) : null;
  console.log("token===>", token);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTableData = filteredServices.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);

  ////////////////////////////////////////
  //For Filter Data//
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
        console.log(response.data)
        setTableData(response.data);//set The table data
      }
      catch (error) {
        console.error("Error Fetching Filtered Tennis Data:", error);
      }

    };
    fetchFilteredData();
  }, [groupFilter, categoryFilter, subCategoryFilter, statusFilter])// Re-fetch when filters change

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search text or any filter changes
  }, [searchText, groupFilter, categoryFilter, subCategoryFilter, statusFilter]);


  //////////////////////////////////////
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await
          axios.get(`${base_url}/v1/getAllTennis`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
        console.log(res)

        if (res.data) {
          setTableData(res.data); // Update the state with fetched data
          // Extract unique groups from the data
          const uniqueGroups = Array.from(
            new Set(
              res.data.map((item: { groups: string }) => item.groups?.toLowerCase())
                .filter((group: any) => group)
            )
          ).map((group) =>
            res.data.find((item: { groups: string }) => item.groups?.toLowerCase() === group)?.groups
          );
          setGroups(uniqueGroups); // Update the groups state
          console.log(uniqueGroups)
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
            `${base_url}/v1/getAllByStatus`, {
            params: { status: statusFilter },
            headers: { Authorization: `Bearer ${token}` }
          }
            // {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //     "Content-Type": "application/json",
            //   },
            // }
          );

          // if (res.data) {
          //   setTableData(res.data); // Update the table data based on the API response
          // }
          setTableData(res.data)
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



  // Function to toggle the status of the service
  const toggleStatus = async (id: number, status: string) => {
    try {
      // If the status is 'Active', send 'Inactive' and vice versa
      const updatedStatus = status === 'Active' ? 'Inactive' : 'Active';

      // Call the API to toggle the status
      const response = await axios.post(
        `${base_url}/v1/toggleStatus/${id}?status=${updatedStatus}`, // Assuming the backend API path
        // { status: validStatus }, 
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle success
      console.log('Status updated:', response.data);
      alert("Service status updated to" + " " + response.data.data.status)
      // Optionally, update the status in the state to reflect the change immediately
      // Update the status in the table data to reflect the change immediately
      setTableData(prevData =>
        prevData.map(service =>
          service.id === id ? { ...service, status: response.data.data.status } : service
        )
      );

    } catch (error) {
      // Handle error
      console.error('Error updating service status:', error);
    }
  };
  // Get All Categories and sub categories data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = JSON.parse(localStorage.getItem("token") || "null"); // Retrieve token
        const response = await axios.get(`${base_url}/v1/getAllCategoriesAndSubCategories`, {

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
        setCategories(["All", ...extractedCategories]); // Include "All" as default
      } catch (error) {
        console.error("Error fetching categories and subcategories:", error);
      }
    };

    fetchData();
  }, [token]);

  // Update Category when group change

  useEffect(() => {
    if (groupFilter === "All") {
      // For "All" group filter, get all unique categories, excluding null
      setCategories([
        "All",
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

      setCategories(["All", ...Array.from(new Set(filteredCategories))]);
    }
  }, [groupFilter, tableData]); // Re-run effect when groupFilter or tableData changes




  // Update subcategories when category changes
  useEffect(() => {
    if (categoryFilter !== "All") {
      const selectedCategory = responseData.find((item) => item[0] === categoryFilter);
      setSubCategories(selectedCategory ? ["All", ...selectedCategory[1]] : ["All"]);
    } else {
      setSubCategories(["All"]);
    }
  }, [categoryFilter, responseData]);


  //////////////////////

  //Delete Services
  const deleteServiceData = async (serviceId: number) => {
    try {
      const response = await axios.delete(`${base_url}/v1/deleteTennis/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        // Remove the deleted service from the table data
        setTableData((prevData) =>
          prevData.filter((service) => service.id !== serviceId)
        );

        // Show a success notification
        alert("Service deleted successfully!");
      }
    } catch (error) {
      // Handle any errors during the delete request
      console.error("Error deleting service:", error);
      alert("Failed to delete the service. Please try again.");
    }
  };




  return (
    <div className="
    ">
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
              {/* {Object.keys(groupCategoryMap).map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))} */}
              {groups.map((group, index) => (
                <option key={index} value={group}>
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
              {/* {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))} */}
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
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
              {/* {subCategories.map((subCat) => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))} */}
              {subCategories.map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
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
            <option disabled value="All">All</option>
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
            <th className="border border-gray-300 p-2">Sl No.</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Group</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">Sub-Category</th>
            <th className="border border-gray-300 p-2">Text</th>
            <th className="border border-gray-300 p-2">Duration</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {paginatedTableData.map((service, index) => (
            <tr key={service.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2">

                <button
                  className="text-blue-500 mr-2"
                  onClick={() => navigate(`/add-service/${service.id}`)}
                >
                  Edit
                </button>

                <button
                  key={service.status}
                  className="text-blue-500"
                  onClick={() => toggleStatus(service.id, service.status ?? 'inactive')} // Pass serviceId and status
                >
                  {service.status === 'Active' ? '👁️' : '👁️‍🗨️'}
                </button>

                <button
                  // className="mr-4"
                  title="delete"
                  style={{ color: 'red', fontSize: '1rem' }}
                  onClick={() => deleteServiceData(service.id)}
                >
                  🗑️
                </button>
              </td>
              <td className="border border-gray-300 p-2">
                {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                {/* {service?.id} */}
              </td>
              <td className="border border-gray-300 p-2">
                {service.imgUrl ? (
                  <img
                    src={service.imgUrl}
                    alt="service"
                    style={{ width: '50px', height: '50px', borderRadius: '0%' }}
                  />
                ) : null}
              </td>
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
      {/* <div className="flex justify-between items-center mt-4">

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
          className={`p-0 ${currentPage === totalPages ? "text-gray-500" : "text-blue-500"}`}
        >
          Next
        </button>
      </div> */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"}`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default ServiceTable;
