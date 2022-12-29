import axios from 'axios'
import { getErrors, successMessage, currentUser, updateCurrUser } from './apiSlice'

axios.defaults.baseURL = process.env.REACT_APP_GABR || "http://localhost:3001"

export function loginUser(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.post('/registerOrLogin', {email: value})
            await dispatch(currentUser(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function logOut(value){
    return async(dispatch) =>{
        try {
            await axios.put('/logout', value)
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function updateUser(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.put('/updateUser', value)
            await dispatch(successMessage(resp.data))
            await dispatch(updateCurrUser(value))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}

export function addToFavorites(value){
    return async(dispatch) =>{
        try {
            const resp = await axios.put('/addFavor', value)
            await dispatch(successMessage(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}
