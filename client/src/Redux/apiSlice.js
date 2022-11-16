import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_GABR || "http://localhost:3001" }),
    tagTypes: ['Products', 'User'],
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products',
            providesTags: ['Products']
        }),
        getProductById: builder.query({
            query: (id) => `/info/${id}`,
            providesTags: ['Products']
        })
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery
} = apiSlice