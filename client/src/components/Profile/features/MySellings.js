import {VStack, Image, Text, Container, Heading, Flex} from '@chakra-ui/react'
import {getUserProducts} from '../../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'

import React, { useEffect } from 'react'

export default function MySellings(props) {

    const dispatch = useDispatch()
    const userListings = useSelector(state => state.api.userListings)

    useEffect(()=>{
        dispatch(getUserProducts(props.userId))
    },[dispatch, props.userId])

  return (
    <VStack>
        {
            !userListings ? null :
            userListings?.map(listing => (
                <Container key={listing._id} bg='green.100'>
                    <Heading size='md' m='1%' noOfLines={3}>{listing.title}</Heading>
                    <Flex justify='space-between'>
                    <Image src={listing.image[0].url} alt='myListings' h='8rem'/>
                    <Text>Selling at: ${listing.price}</Text>
                    <Text>Condition: {listing.used ? 'Used' : 'New'}</Text>
                    {/* <Text>Amount Sold: {listing.sold}</Text> */}
                    </Flex>
                </Container>
            ))
        }
    </VStack>
  )
}
