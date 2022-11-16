import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_GABR || "http://localhost:3001" }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})