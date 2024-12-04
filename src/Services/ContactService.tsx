import axios from "axios"
export const  base_url = "http://localhost:8082/api/contact"


const sendEmail=async (contact:any)=>{
    return axios.post(`${base_url}`,contact)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

export {sendEmail};
