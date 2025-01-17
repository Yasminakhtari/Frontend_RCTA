import axios from "axios";
import { base_url } from "../apiConfig";


const saveSession=async (data:any)=>{
    return axios.post(`${base_url}/session/createSession`,data)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const getAllSession=async ()=>{
    return axios.get(`${base_url}/session`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const getSessionById=async (id: number)=>{
    return axios.get(`${base_url}/session/${id}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const updateSession=async (id: number, updatedSession: any)=>{
    return axios.put(`${base_url}/session/${id}`,updatedSession)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const deleteSession=async (id: number)=>{
    return axios.delete(`${base_url}/session/${id}`)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

export {saveSession,getAllSession,getSessionById,updateSession,deleteSession};