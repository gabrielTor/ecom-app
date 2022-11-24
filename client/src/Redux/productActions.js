import axios from 'axios'
import { getProducts, getInfo, getErrors, getCateg, search, successMessage, getByCateg } from './apiSlice'

axios.defaults.baseURL = process.env.REACT_APP_GABR || "http://localhost:3001"

export function getProductsPage(page){
    return async(dispatch) =>{
        try {
            const resp = await axios.get(`/products?page=${page}`)
            await dispatch(getProducts(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function getProductInfo(id){
    return async(dispatch) =>{
        try {
            const resp = await axios.get(`/info/${id}`)
            await dispatch(getInfo(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function getCategories(value){
    return async(dispatch) =>{
        try {
            if(value){
                const resp = await axios.get(`/categories?category=${value}`)
                await dispatch(getByCateg(resp.data))
            }
            const resp = await axios.get('/categories')
            await dispatch(getCateg(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function searchProducts(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.get(`/search?search=${value}`)
            await dispatch(search(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function postProduct(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.post('/postProduct', value)
            await dispatch(successMessage(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function deleteCloudImg(id){
    return async(dispatch) =>{
        try {
            await axios.delete('/cloudinary/delete', id)
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}