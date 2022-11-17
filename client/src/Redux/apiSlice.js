import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        products: [],
        count: null,
        productInfo: {},
        user: null,
        error: null
    },
    reducers: {
        getProducts: (state, action) => {
            state.products = state.products.concat(action.payload.products)
            state.count = action.payload.count
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