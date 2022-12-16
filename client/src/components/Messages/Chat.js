import styles from './messages.module.css'
import { Text, Box } from '@chakra-ui/react'
import { useEffect, useRef, useId } from 'react'

export default function Chat({chat, user}) {

    const lastMessageRef = useRef(null)
    const id = useId()

    useEffect(()=>{
        lastMessageRef.current?.scrollIntoView({behavior: 'smooth'})
    },[chat])

  return (
    <>
    <Box w={['100%', '80%', '60%']} h='20em' bg='white' overflowY='scroll' rounded='base'>
          {chat?.map(({mess, currentUser})=>(
            <Box key={id} className={currentUser === user ? styles.otherUser : styles.user}>
              <Text fontSize='60%'>{currentUser}</Text>
              <Text fontWeight='semibold'>{mess}</Text>
            </Box>
          ))}
        <Box ref={lastMessageRef}/>
    </Box>
    </>
  )
}
