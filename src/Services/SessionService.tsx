import axios from "axios";
import { base_url } from "../apiConfig";


const saveSession = async (data: any) => {
    return axios.post(`${base_url}/session/createSession`, data)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const getAllSession = async (userId: number) => {
    return axios.get(`${base_url}/session`, {
        params: { userId }
    })
        .then(res => res.data)
        .catch(error => { throw error; });
}

const getSessionById = async (id: any) => {
    try{
        const response = await axios.get(`${base_url}/session/${id}`)
        // .then(res => res.data)
        // .catch(error => { throw error; });
        return response.data;
    }catch(error){
        console.error("Failed to fetch session by id");
        throw error;
    }
}

// const getSessionByIddd = async (id: string) => {
//     return axios.get(`${base_url}/session/${id}`)
//         .then(res => res.data)
//         .catch(error => { throw error; });
// }

const updateSession = async (id: number, updatedSession: any) => {
    return axios.put(`${base_url}/session/${id}`, updatedSession)
        .then(res => res.data)
        .catch(error => { throw error; });
}

const deleteSession = async (id: number) => {
    return axios.delete(`${base_url}/session/${id}`)
        .then(res => res.data)
        .catch(error => { throw error; });
}

//Session save in transaction table
const saveTSession = async (data: any) => {
    return axios.post(`${base_url}/t_session/saveSession`, data)
        .then(res => res.data)
        .catch(error => { throw error; });
}
//Delete particular player in a session
const deleteSinglePlayer = async (sessionId: number, courseId: number, playerId: number) => {
    return axios.delete(`${base_url}/t_session/removePlayer`, {
        params: {
            sessionId: sessionId,
            courseId: courseId,
            playerId: playerId
        }
    })
        .then(res => res.data)
        .catch(error => { throw error; });
}

export {
    saveSession,
    getAllSession,
    getSessionById,
    updateSession,
    deleteSession,
    // getSessionByIddd,
    saveTSession,
    deleteSinglePlayer
};