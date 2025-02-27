import axios from "axios";
import { base_url } from "../apiConfig";


const saveFeedback=async (data:any)=>{
    const feedbackData = { 
        ...data,  
        bitDeletedFlag: 0 // Added to match backend structure (0 = active, 1 = deleted)
    };

    return axios.post(`${base_url}/testimonial`,feedbackData)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}


const getAllFeedback = async () => {
    return axios.get(`${base_url}/testimonial`)
        .then(res => res.data)
        .catch(error=>{throw error;});
};

export {saveFeedback,getAllFeedback};