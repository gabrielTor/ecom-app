import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        categories: [],
        products: [],
        count: null,
        productInfo: {},
        user: null,
        allUsers: null,
        error: null,
        success: null,
        disable: false
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
        },
        getCateg: (state, action) => {
            state.categories = action.payload
        },
        search: (state, action) => {
            if(action.payload.message){
                state.error = action.payload.message
            } else{
                state.products = action.payload
                state.disable = true
            }
        },
        getUsers: (state, action) => {
            state.allUsers = action.payload
        },
        currentUser: (state, action) => {
            state.user = action.payload
        },
        successMessage: (state, action) => {
            state.success = action.payload
        }
    }
})
    
export const {
    getProducts,
    getInfo,
    getErrors,
    getCateg,
    search,
    getUsers,
    currentUser,
    successMessage
} = apiSlice.actions

export default apiSlice.reducer