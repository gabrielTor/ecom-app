import { configureStore } from "@reduxjs/toolkit";
import api from './apiSlice';

export default configureStore({
    reducer: {
       api: api
    },
    devTools: true
})