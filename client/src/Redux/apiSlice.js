import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        categories: [],
        products: [],
        count: null,
        productInfo: {},
        user: null,
        userListings: null,
        allUsers: null,
        error: null,
        success: null,
        disable: false,
        favorites: [],
        chats: null,
        shoppingCart: []
    },
    reducers: {
        getProducts: (state, action) => {
            state.products = state.products.concat(action.payload.products)
            state.count = action.payload.count
            state.disable = false
        },
        userListings: (state, action) => {
            state.userListings = action.payload
        },
        getInfo: (state, action) => {
            state.productInfo = action.payload
        },
        getErrors: (state, action) => {
            state.error = action.payload
        },
        resetErrors: (state) => {
            state.error = null
        },
        getCateg: (state, action) => {
            state.categories = action.payload
        },
        getByCateg: (state, action) => {
            state.products = action.payload
            state.disable = true
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
        },
        resetSuccessM: (state) => {
            state.success = null
        },
        setFavorites: (state, action) => {
            state.favorites = action.payload
        },
        updateCurrUser: (state, action) => {
            state.user = {...state.user, name: action.payload.name, socialMedia: action.payload.socialMedia}
        },
        getChats: (state, action) => {
            state.chats = action.payload
        },
        addToCart: (state, action) => {
            state.shoppingCart = action.payload
        }
    }
})
    
export const {
    getProducts,
    userListings,
    getInfo,
    getErrors,
    getCateg,
    search,
    getUsers,
    currentUser,
    successMessage,
    resetErrors,
    resetSuccessM,
    getByCateg,
    setFavorites,
    updateCurrUser,
    getChats,
    addToCart
} = apiSlice.actions

export default apiSlice.reducer