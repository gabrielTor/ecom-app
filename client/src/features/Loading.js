import { Center, Spinner } from '@chakra-ui/react'

export default function Loading() {
  return (
    <Center m='28%'>
      <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='green.500'
          size='xl'/>
    </Center> 
  )
}
