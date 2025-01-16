import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "../Services/ProfileService";


const profileSlice  = createSlice({
    name:'profile',//Name of the slice
    initialState:{picture: null},//we have to keep initial state empty because whenever there are no image while initalize it should be empty
    reducers:{      // Reducers to update state
        changeProfile:(state,action)=>{
            // state = updateProfile(action.payload);
            // return action.payload;
            console.log("Action Payload:", action.payload);
            return { ...state, ...action.payload };
        },
        setProfile:(state,action)=>{
            // state = action.payload;
            // return state;
            return action.payload;
        }
    }
    
})

export const {changeProfile,setProfile} = profileSlice.actions;
export default profileSlice.reducer;