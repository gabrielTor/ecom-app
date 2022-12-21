import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import useSessionStorage from './useSessionStorage'

const socket = io.connect('https://websocket-server-mxn0.onrender.com')
// const socket = io.connect('http://localhost:3002')

export default function useJoinChat() {
    
    const [value, setValue] = useSessionStorage('chatId')
    const [id, setId] = useState(null)
    const [chatIds, setChatIds] = useState(null)

    useEffect(()=>{ 
        const createChat = async() => {
            if(chatIds){
                const resp = await axios.post('http://localhost:3001/chat', chatIds)
                setId(resp.data._id.toString())
                setValue(resp.data._id.toString())
            }
        }
        createChat()
    },[chatIds, setValue])
    
    useEffect(()=>{
        if(id) {
            socket.emit("join_room", id)
        }
        else if(!id && value) {
            socket.emit("join_room", value)
        }
    }, [value, id])

    return [setChatIds, setId]
}
