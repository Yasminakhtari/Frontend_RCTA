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
export { saveOrder };