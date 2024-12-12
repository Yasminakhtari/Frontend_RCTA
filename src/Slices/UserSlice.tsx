// a slice is a collection of Redux logic for a specific feature of our application. It combines the state, reducers, and actions for that feature into a single unit.
// State: Defines the initial state of the feature.
// Reducers: Contains logic to modify the state.
// Actions: Automatically generated action creators for the reducers.

import { createSlice } from "@reduxjs/toolkit";
import { getItem, removeItem, setItem } from "../Services/LocalStorageService";



//creatSlice is function of redux toolkit
const UserSlice = createSlice({  
    name: 'user',         // Name of the slice
    initialState:getItem("user"), // Initial state
    reducers: {              // Reducers to update state
      setUser:(state,action)=>{
        //payload means ame jo bi object send karuchachanti athi ku, ta basis r current state ku update pai
        setItem("user",action.payload);//here user is key and action.payload is value
        state = getItem("user");//here state updated
        return state;
      },
      removeUser:(state)=>{////here no need of action parameter,you can give action or not ur choice
        removeItem("user");
        state = null;
        return state;
      }

    },
});

export const {setUser,removeUser} = UserSlice.actions;
export default UserSlice.reducer;
