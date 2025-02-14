import axios from "axios";
import { base_url } from "../apiConfig";


const saveOrder=async (data:any)=>{
    return axios.post(`${base_url}/order/save`,data,{
        headers: {
            "Content-Type": "application/json",
          },
    })
    .then(res=>res.data)
    .catch(error=>{throw error;});
}
const getAllOrder=async ()=>{
    return axios.get(`${base_url}/order/getAllOrder`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const saveShippingAddress=async(data:any)=>{
    return axios.post(`${base_url}/order/saveShippingAddress`,data,{
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(res=>res.data)
    .catch(error=>{throw error;});
}
export { saveOrder,getAllOrder,saveShippingAddress};