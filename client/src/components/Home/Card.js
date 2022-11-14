import {Image, Flex, Text, Box, Divider} from '@chakra-ui/react'
import {MdFavoriteBorder} from 'react-icons/md'

import React from 'react'

export default function Card() {
  return (
    <Box maxW='fit-content' border='1px' borderRadius='1%' bg='white'>
        <Flex direction='row-reverse'>
            <Flex margin='2%' position='absolute'>
                <MdFavoriteBorder/>
            </Flex>
            <Image 
                src={'https://http2.mlstatic.com/D_Q_NP_966952-MLA44098967288_112020-AB.webp'}
                alt={''}/>
        </Flex>
        <Divider/>
        <Text>$1000</Text>
        <Text>Titulo</Text>
    </Box>
  )
}
