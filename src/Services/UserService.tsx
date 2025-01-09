import axios from "axios"
import { base_url } from "../apiConfig"
import { Row } from "react-table"


const registerUser =async (user:any)=>{
    console.log(user)
    try {
        const userdetails=await axios.post(`${base_url}/auth/register`,user,{withCredentials: true })
        console.log(userdetails)
        return userdetails.data
    } catch (error) {
        console.log(error)
        throw error;
    }
    // return axios.post(`${base_url}register`,user,{withCredentials: true })//here user is a object we mentioned here because we want to send request from user object
    // .then(res=>res.data)
    // .catch(error=>{throw error;});
    
}


const loginUser=async (login:any)=>{
    return axios.post(`${base_url}/auth/login`,login)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const sendOtp = async (email:any)=>{
    return axios.post(`${base_url}/sendotp/${email}`,email)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const verifyOtp = async(email:any,otp:any)=>{
    return axios.get(`${base_url}/verifyotp/${email}/${otp}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const changePass = async(email:string,password:string)=>{
    return axios.post(`${base_url}/changePass`,{email,password})
    .then(res=>res.data)
    .catch(error=>{throw error;})
}

const getAllUsers = async () => {
    try {
      const response = await axios.get(`${base_url}/auth/getAllUsers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getAllRoles = async () => {
    try {
      const response = await axios.get(`${base_url}/roles`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Update user details, including role
   const updateUser = async (id: number, updatedUser: any) => {
    try {
      const response = await axios.put(`${base_url}/auth/update/${id}`, updatedUser);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };
  
export {loginUser,registerUser,sendOtp,verifyOtp,changePass,getAllUsers,getAllRoles,updateUser};