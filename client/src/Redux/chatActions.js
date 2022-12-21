import axios from 'axios'
import {getChats, getErrors} from './apiSlice'

axios.defaults.baseURL = process.env.REACT_APP_GABR || "http://localhost:3001"

export function userChats(userId){
    return async(dispatch) =>{
        try {
            const resp = await axios.get(`/getChats?userId=${userId}`)
            await dispatch(getChats(resp.data))
        } catch (error) {
            dispatch(getErrors(error.response.data.message))
        }
    }
}