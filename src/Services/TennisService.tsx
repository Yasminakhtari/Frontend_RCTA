import axios from "axios";

//export const base_url = "https://backend-rcta.onrender.com/api/v1";
export const base_url = "http://localhost:8082/api/v1"

const getAllCategoriesAndSubCategories = async () => {
    const token = JSON.parse(localStorage.getItem("token") || "null"); // Retrieve token from localStorage
  
    return axios
      .get(`${base_url}/getAllCategoriesAndSubCategories`, {
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
      const response = await axios.get(`${base_url}/getAllTennis`, {
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
        `${base_url}/toggleStatus/${id}?status=${updatedStatus}`,
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

export { getAllCategoriesAndSubCategories,getAllTennisData,toggleServiceStatus };