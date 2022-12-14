import {Image, Flex, Text, Box, Divider, Button, Link} from '@chakra-ui/react'
import {MdFavoriteBorder, MdFavorite} from 'react-icons/md'
import { useState } from 'react'
import useFavorite from '../../Hooks/useFavorite'

export default function Card(props) {

  const [show, setShow] = useState(false)
  const [inFavor, favor] = useFavorite(props.id)

  return (
    <Box w='15rem' h='20rem' mt='3%'
      borderRadius='1%' bg='white'
      boxShadow='xl'
      onMouseOver={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}
      _hover={{ color: '#32CD32', boxShadow: '0px 20px 50px grey' }}>
        <Flex direction='row-reverse' justify='center' h='15rem'>
            <Flex ml='10%' mt='2%' position='absolute'>
                <Button variant='inner' onClick={favor}>
                  {inFavor ? <MdFavorite color='red'/> : <MdFavoriteBorder/>}
                </Button>
            </Flex>
            <Link href={`info/${props.id}`}>
            <Image 
                src={props.image}
                alt={'cardimage'}
                maxH='15rem'/>
            </Link>
        </Flex>
        <Divider/>
        <Text m='5%' fontSize='2xl'>${props.price}</Text>
        {show ?
        <Flex justify='center' fontSize='90%' 
          fontWeight='bold' position='relative'
          bg='white' pl='2%' pr='2%'>
            <Text noOfLines={2}>{props.title}</Text>
        </Flex> : null}
    </Box>
  )
}
