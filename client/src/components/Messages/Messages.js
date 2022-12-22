import { Button, Input, Center, VStack, Box, Heading, Flex, Avatar, Show } from '@chakra-ui/react'
import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react'
import { loginUser } from '../../Redux/userActions'
import Chat from './Chat'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useSelector, useDispatch } from 'react-redux'
import { userChats } from '../../Redux/chatActions'
import useFetch from '../../Hooks/useFetch'
import useSessionStorage from '../../Hooks/useSessionStorage'

const socket = io.connect('https://websocket-server-mxn0.onrender.com')
// const socket = io.connect('http://localhost:3002')

function Messages() {
  
  const dispatch = useDispatch()
  const {user, isAuthenticated} = useAuth0()
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [typing, setTyping] = useState('')
  const chats = useSelector(state => state.api.chats)
  const userConnected = useSelector(state => state.api.user)
  const [value, setValue] = useSessionStorage('chatId')
  socket.emit("join_room", value)
  useFetch(userChats, userConnected?._id)

  useEffect(()=>{
    if(chats){
      let currentChat = chats.find(texts => texts.chat._id === value)
      setChat(currentChat?.chat?.messages)
    }
  },[chats, value])

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev)=>[...prev, {text: data.text, currentUser: data.currentUser}])
    })
    socket.on('display', (data) => {
      setTyping(data)
    })
  }, [])
  
  useEffect(()=>{
    if(isAuthenticated && user){
        dispatch(loginUser({email: user.email}))
    }
  }, [dispatch, user, isAuthenticated])

  const handleSend = () => {
    if(!message) return
    socket.emit('send_message', {text: message, currentUser: user.email, room: value})
    socket.emit('typing', {typing: '', room: value})
    setChat((prev)=>[...prev, {text: message, currentUser: user.email}])
    setMessage('')
  }
  const handleTyping = (event) => {
    let input = event.target.value
    setMessage(input)
    input !== '' ?
    socket.emit('typing', {typing: 'typing...', room: value}) :
    socket.emit('typing', {typing: '', room: value})
  }

  return (
    <VStack mt='3%' h='85vh'>
      <Center w='100%'>
        <Box bg='white' w={['fit-content', '20%']} h='23em' 
          mr='4px' rounded='base' overflowY='scroll'>
          {
            chats?.map(({product, chat}) => (
              <Box key={chat._id} bg={value === chat._id ? 'blue.300' : 'blue.100'} mb={['12%', '4%']}
                onClick={()=>setValue(chat._id)}
                cursor='pointer'>
                <Flex>
                  <Avatar size='sm' src={product.image[0].url} name={product.title}/>
                  <Show breakpoint='(min-width: 500px)'>
                    <Heading m='auto' size='xs' noOfLines={2}>{product.title}</Heading>
                  </Show>
                </Flex>
              </Box>
            ))
          }
        </Box>
        <Box w={['90%', '80%', '60%']}>
        <Chat chat={chat} user={user.email} typing={typing?.typing}/>
        <Center mt='7px'>
          <Input value={message} bg='white' placeholder='message' onChange={handleTyping}/>
          <Button bg='#32CD32' ml='7px' onClick={handleSend}>Send</Button>
        </Center>
        </Box>
      </Center>
    </VStack>
  )
}

export default withAuthenticationRequired(Messages)