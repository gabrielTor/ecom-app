import axios from 'axios'
import { getProducts, getInfo, getErrors } from './apiSlice'

axios.defaults.baseURL = process.env.REACT_APP_GABR || "http://localhost:3001"

export function getProductsPage(page){
    return async(dispatch) =>{
        try {
            const resp = await axios.get(`/products?page=${page}`)
            await dispatch(getProducts(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}

export function getProductInfo(id){
    return async(dispatch) =>{
        try {
            const resp = await axios.get(`/info/${id}`)
            await dispatch(getInfo(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}