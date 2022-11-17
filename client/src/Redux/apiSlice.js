import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_GABR || "http://localhost:3001" }),
    tagTypes: ['Products', 'User'],
    endpoints: builder => ({
        getProducts: builder.query({
            query: (page) => `/products?page=${page}`,
            providesTags: ['Products']
        }),
        searchProducts: builder.query({
            query: (value) => `/search?search=${value}`,
            providesTags: ['Products']
        }),
        getProductById: builder.query({
            query: (id) => `/info/${id}`,
            providesTags: ['Products']
        }),
        getCategories: builder.query({
            query: () => '/categories'
        }),
        getUsers: builder.query({
            query: () => '/users',
            providesTags: ['Users']
        }),
        loginUser: builder.mutation({
            query: (user) => ({
                url: '/registerOrLogin',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        postProduct: builder.mutation({
            query: (obj) => ({
                url: '/postProduct',
                method: 'POST',
                body: obj
            }),
            invalidatesTags: ['Products']
        }),
        logoutUser: builder.mutation({
            query: (user) => ({
                url: '/logout',
                method: 'PUT',
                body: user
            }),
            invalidatesTags: ['User']
        }),
        updateUser: builder.mutation({
            query: (value) => ({
                url: '/updateUser',
                method: 'PUT',
                body: value
            }),
            invalidatesTags: ['User']
        }),
        addFavorite: builder.mutation({
            query: (value) => ({
                url: '/logout',
                method: 'PUT',
                body: value
            }),
            invalidatesTags: ['User']
        }),
        removeFavorite: builder.mutation({
            query: (value) => ({
                url: '/logout',
                method: 'PUT',
                body: value
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useGetCategoriesQuery,
    useGetUsersQuery,
    usePostProductMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useUpdateUserMutation,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation
} = apiSlice