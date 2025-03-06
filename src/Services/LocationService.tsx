import axios from "axios";
import { base_url } from "../apiConfig";


const saveLocation=async (data:any)=>{
    return axios.post(`${base_url}/location/createLocation`,data)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

///////////////////////
const getAllLocation=async ()=>{
    return axios.get(`${base_url}/location/getAllLocation`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const getLocationById = async (id: number) => {
    return axios.get(`${base_url}/location`, {
        params: { id }
    })
    .then(res => res.data)
    .catch(error => { throw error; });
};


const updateLocation = async (id:number, locationDto:any) => {
    try {
      const response = await axios.put(`${base_url}/location/updateLocation`, locationDto, {
        params: { id }, // Send the ID as a request parameter
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update location:', error);
      throw error;
    }
  };

  const updateLocationStatus = async (id:number, status:any) => {
    try {
      const response = await axios.put(`${base_url}/location/updateStatus`, null, {
        params: { id, status }, // Send ID and status as request parameters
      });
      return response.data;
    } catch (error) {
      console.error('Failed to update location status:', error);
      throw error;
    }
  };

export {saveLocation,getAllLocation,getLocationById,updateLocation,updateLocationStatus};