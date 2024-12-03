//the store is a central container that holds the entire application's state. It allows your application to manage and access state in a predictable way, as well as dispatch actions to update the state.
//
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/UserSlice";//We have to export it ourselves

export default configureStore({
    reducer:{
        user:userReducer
    }
})