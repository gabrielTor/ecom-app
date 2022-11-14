import {Heading, Text, Flex, Box, UnorderedList, ListItem, Button, Select} from '@chakra-ui/react'
import ImageSlider from './ImageSlider'
import {MdFavoriteBorder} from 'react-icons/md'

export default function Details() {

    let arr = [
        'https://http2.mlstatic.com/D_Q_NP_966952-MLA44098967288_112020-AB.webp',
        'https://http2.mlstatic.com/D_Q_NP_966952-MLA44098967288_112020-AB.webp',
        'https://http2.mlstatic.com/D_Q_NP_966952-MLA44098967288_112020-AB.webp',
        'https://http2.mlstatic.com/D_Q_NP_966952-MLA44098967288_112020-AB.webp'
    ]

  return (
    <Flex justify='space-evenly' marginTop='5%'>
        <Box w='40%' h='20%'>
            <ImageSlider slides={arr}/>
        </Box>
        <Box w='40%' h='20%'>
            <Heading>Title</Heading>
            <Text>Rating</Text>
            <Text>Price</Text>
            <Flex direction='column' w='50%'>
                <Select m='3%'>
                    <option>Amount: 1</option>
                    <option>Amount: 2</option>
                    <option>Amount: 3</option>
                </Select>
                <Button m='3%' colorScheme='whatsapp' variant='solid'>ADD TO CART</Button>
                <Button m='3%' colorScheme='whatsapp' variant='outline'><MdFavoriteBorder/>Add to Favorites</Button>
            </Flex>
            <Heading>Description</Heading>
            <UnorderedList>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
            </UnorderedList>
        </Box>
    </Flex>
  )
}
