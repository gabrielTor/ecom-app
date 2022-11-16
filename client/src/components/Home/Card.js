import {Image, Flex, Text, Box, Divider, Button} from '@chakra-ui/react'
import {MdFavoriteBorder, MdFavorite} from 'react-icons/md'
import { useState } from 'react'

import React from 'react'

export default function Card(props) {

  const [show, setShow] = useState(false)
  const favor = () => {
    //dispatch(action to favorites)
  }

  return (
    <Box maxW='fit-content'
      borderRadius='1%' bg='white'
      boxShadow='2xl'
      onMouseOver={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}
      _hover={{
        color: '#32CD32',
        boxShadow: '20px 20px 50px grey',
        }}>
        <Flex direction='row-reverse'>
            <Flex margin='2%' position='absolute'>
                <Button variant='inner' onClick={favor}><MdFavoriteBorder/></Button>
            </Flex>
            <Image 
                src={props.image}
                alt={'cardimage'}/>
        </Flex>
        <Divider/>
        <Text m='10%' p='5%'>${props.price}</Text>
        {
          show ?
        <Flex justify='center' 
          fontSize='120%' 
          fontWeight='bold' 
          position='absolute' 
          bg='white' pl='2%' pr='2%'>
            {props.title}
        </Flex> : null
        }
    </Box>
  )
}
