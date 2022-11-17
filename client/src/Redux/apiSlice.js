import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        products: [],
        productInfo: {},
        user: null,
        error: null
    },
    reducers: {
        getProducts: (state, action) => {
            state.products = action.payload
        },
        getInfo: (state, action) => {
            state.productInfo = action.payload
        },
        getErrors: (state, action) => {
            state.error = action.payload
        }
    }
})
    
export const {getProducts, getInfo, getErrors} = apiSlice.actions
export default apiSlice.reducer