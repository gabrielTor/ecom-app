import io from 'socket.io-client'
import { useEffect, useState } from 'react'

// const socket = io.connect('https://websocket-server-mxn0.onrender.com')
const socket = io.connect('http://localhost:3002')

export default function useJoinChat() {
    const [chatIds, setChatIds] = useState(null)

    useEffect(()=>{
        if(chatIds){
            socket.emit("join_room", chatIds)
        }
    },[chatIds])

    return [setChatIds]

}
