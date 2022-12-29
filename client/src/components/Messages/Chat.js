import styles from './messages.module.css'
import { Text, Box } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'

export default function Chat({chat, user, typing}) {

  const lastMessageRef = useRef(null)

  useEffect(()=>{
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
  },[chat])

  return (
    <>
    <Box h='20em' bg='white' overflowY='scroll' rounded='base'>
          {chat?.map(({text, currentUser, _id}, ind)=>(
            <Box key={_id || ind} className={currentUser === user ? styles.otherUser : styles.user}>
              <Text fontSize='60%' mb='2%'>{currentUser}</Text>
              <Text fontWeight='semibold'>{text}</Text>
            </Box>
          ))}
          <Text m='3%'>{typing}</Text>
        <Box ref={lastMessageRef}/>
    </Box>
    </>
  )
}
