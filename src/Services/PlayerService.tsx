import axios from "axios";
import { base_url } from "../apiConfig";


const savePlayer=async (data:any)=>{
    return axios.post(`${base_url}/players/createPlayer`,data)
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const getAllPlayers=async (userId:number)=>{
    return axios.get(`${base_url}/players/getAllPlayers`,{
        params: { userId } 
    })
    .then(res=>res.data)
    .catch(error=>{throw error;});
}

const getPlayersById = async (id: number) => {
    return axios.get(`${base_url}/players`, {
        params: { id }
    })
    .then(res => res.data)
    .catch(error => { throw error; });
};

const updatePlayers=async (id: number, updatedPlayer: any)=>{
    try {
        const response = await axios.put(`${base_url}/players/updatePlayers`, updatedPlayer, {
          params: { id}, 

        });
        return response.data;
      } catch (error) {
        console.error('Failed to update location:', error);
        throw error;
      }
}

const deletePlayer=async (id: number,reason : string)=>{
    return axios.delete(`${base_url}/players`,{
        params: { id ,reason}
    })
    .then(res=>res.data)
    .catch(error=>{throw error;});
}


export {savePlayer,getAllPlayers,getPlayersById,updatePlayers,deletePlayer};