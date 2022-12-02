import {VStack, Image, Text, Container, Heading, Flex, Button, Link} from '@chakra-ui/react'
import {getUserProducts} from '../../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'
import {EditIcon} from '@chakra-ui/icons'

import React, { useEffect } from 'react'

export default function MySellings(props) {

    const dispatch = useDispatch()
    const userListings = useSelector(state => state.api.userListings)

    useEffect(()=>{
        dispatch(getUserProducts(props.userId))
    },[dispatch, props.userId])

  return (
    <VStack m='7% 0'>
        {
            !userListings ? <Text>You have no Listings, go publish!</Text> :
            userListings?.map(listing => (
                <Container key={listing._id} bg='green.100'>
                    <Heading size='md' m='1%' noOfLines={3}>{listing.title}</Heading>
                    <Flex justify={['space-between', 'space-evenly']}>
                        <Image src={listing.image[0].url} alt='myListings' h={['5rem', '6rem', '7rem', '8rem']} mb='1%'/>
                        <Flex direction='column'>
                            <Text>Selling at: ${listing.price}</Text>
                            <Text>Condition: {listing.used ? 'Used' : 'New'}</Text>
                            <Text>Amount Sold: {listing.sold}</Text>
                            <Text>Current Stock: {listing.stock}</Text>
                        </Flex>
                        <Flex direction='column' justify='space-evenly'>
                            <Button variant='link'>Edit<EditIcon m='5%'/></Button>
                            <Link fontWeight='bold' href={`info/${listing._id}`}>Preview</Link>
                        </Flex>
                    </Flex>
                </Container>
            ))
        }
    </VStack>
  )
}
