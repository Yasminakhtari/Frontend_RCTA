import { base_url } from "../apiConfig"
import axios from "axios"

const getProfile =async (id:number)=>{
    return axios.get(`${base_url}/get/${id}`)
    .then(res => res.data)
    .catch(error => {throw error});
}

const updateProfile =async (profile:any)=>{
    return axios.put(`${base_url}/update`,profile)
    .then(res => res.data)
    .catch(error => {throw error});
}

export {getProfile,updateProfile}