import axios from "axios";
import { base_url } from "../apiConfig";


const getAllCategoriesAndSubCategories = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "null"); // Retrieve token from localStorage
  
    return axios
      .get(`${base_url}/v1/getAllCategoriesAndSubCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
  
  const getAllTennisData = async (token: string) => {
    try {
      const response = await axios.get(`${base_url}/v1/getAllTennis`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching tennis data:", error);
      throw error;
    }
  };
  
  const toggleServiceStatus = async (id: number, status: string, token: string) => {
    const updatedStatus = status === 'Active' ? 'Inactive' : 'Active';
    try {
      const response = await axios.post(
        `${base_url}/v1/toggleStatus/${id}?status=${updatedStatus}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error toggling service status:", error);
      throw error;
    }
  };

  const getFilteredProducts = async (groupName: string) => {
    try {
      const response = await axios.get(`${base_url}/v1/getFilteredTennis`, {
        params: {
          group: groupName,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching filtered products:", error);
      throw error;
    }
  };
  const getTennisById = async (id: any) => {
    try {
      const response = await axios.get(`${base_url}/v1/getTennis/${id}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   "Content-Type": "application/json",
        // },
      });
      return response.data; // return the data from the response
    } catch (error) {
      console.error('Error fetching tennis data:', error);
      throw error; // rethrow the error to be handled by the component
    }
  };

  const getTennisSessionDetails = async (id: any) => {
    try {
      const response = await axios.get(`${base_url}/v1/sessionDetail/${id}`, {
      });
      return response.data; // return the data from the response
    } catch (error) {
      console.error('Error fetching tennis data:', error);
      throw error; // rethrow the error to be handled by the component
    }
  };
  
export { getAllCategoriesAndSubCategories,
          getAllTennisData,
          toggleServiceStatus,
          getFilteredProducts,
          getTennisById,
          getTennisSessionDetails
         };