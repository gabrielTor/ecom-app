import { Button, Input, Center, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import Chat from './Chat'

const socket = io.connect('https://websocket-server-mxn0.onrender.com')
// const socket = io.connect('http://localhost:3002')

function Messages() {
  
  const {user} = useAuth0()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [typing, setTyping] = useState('')
  socket.emit("join_room", 'abc');
  
  const handleSend = () => {
    if(!message) return
    socket.emit('send_message', {message, userEmail: user.email, room: 'abc'})
    socket.emit('typing', {typing: ''})
    setChat([...chat, {mess: message, currentUser: user.email}])
    setMessage('')
  }
  const handleTyping = (event) => {
    let input = event.target.value
    setMessage(input)
    input !== '' ?
    socket.emit('typing', {typing: 'typing...', user: user.email}) :
    socket.emit('typing', {typing: ''})
  }

  useEffect(() => {
      socket.on("receive_message", (data) => {
        setChat([...chat, {mess: data.message, currentUser: data.userEmail}])
      })
      socket.on('display', (data) => {
        setTyping(data)
      })
    }, [chat])

  return (
    <VStack mt='3%' h='85vh'>
      <Chat chat={chat} user={user.email} typing={typing?.typing} userTyping={typing?.user}/>
      <Center w={['100%', '80%', '60%']}>
        <Input value={message} bg='white' placeholder='message' onChange={handleTyping}/>
        <Button bg='#32CD32' ml='7px' onClick={handleSend}>Send</Button>
      </Center>
    </VStack>
  )
}

export default withAuthenticationRequired(Messages)