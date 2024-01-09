import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "@reduxjs/toolkit";
import {thunk} from "redux-thunk";
import authSlice from "../Slice/authSlice";

const Store = configureStore(
    {
        reducer: {
         user:authSlice
        },
    },
    applyMiddleware(thunk)
);

export default Store;