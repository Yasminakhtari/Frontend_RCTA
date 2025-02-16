import axios from "axios";
import { base_url } from "../apiConfig";


const saveFeedback=async (data:any)=>{
    return axios.post(`${base_url}/testimonial`,data)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}


const getAllFeedback = async () => {
    return axios.get(`${base_url}/testimonial`)
        .then(res => res.data)
        .catch(error=>{throw error;});
};

export {saveFeedback,getAllFeedback};