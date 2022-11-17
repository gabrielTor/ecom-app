import axios from 'axios'
import { getErrors, successMessage, currentUser } from './apiSlice'

axios.defaults.baseURL = process.env.REACT_APP_GABR || "http://localhost:3001"

export function loginUser(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.post('/registerOrLogin')
            await dispatch(currentUser(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}

export function logout(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.put('/logout', value)
            await dispatch(successMessage(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}

export function updateUser(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.put('/updateUser', value)
            await dispatch(successMessage(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}

export function addToFavorites(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.put('/addFavor', value)
            await dispatch(successMessage(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}

export function removeFromFavorites(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.put('/removeFavor', value)
            await dispatch(successMessage(resp.data))
        } catch (error) {
            getErrors(error)
        }
    }
}