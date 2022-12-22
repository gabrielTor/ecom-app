import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useSessionStorage from './useSessionStorage'
import { getErrors } from '../Redux/apiSlice'
import { useDispatch } from 'react-redux'
/* eslint-disable */

const socket = io.connect('https://websocket-server-mxn0.onrender.com')
// const socket = io.connect('http://localhost:3002')

export default function useJoinChat() {
    
    const dispatch = useDispatch()
    const [value, setValue] = useSessionStorage('chatId')
    const [chatIds, setChatIds] = useState(null)

    useEffect(()=>{ 
        const createChat = async() => {
            try {
                if(chatIds){
                    const resp = await axios.post('/chat', chatIds)
                    setValue(resp.data._id.toString())
                }
            } catch (error) {
                dispatch(getErrors(error.response.data.message))
            }
        }
        createChat()
    },[chatIds, setValue])
    
    socket.emit("join_room", value)

    return [setChatIds]
}
