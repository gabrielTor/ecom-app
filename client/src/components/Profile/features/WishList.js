import {VStack, Container, Image, Heading, Flex, Text, Link, Button} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavorites } from '../../../Redux/productActions'

export default function WishList({userFavor}) {

  const dispatch = useDispatch()
  const favorites = useSelector(state => state.api.favorites)

  useEffect(()=>{
    dispatch(getFavorites({ids: userFavor}))
  },[dispatch, userFavor])

  return (
    <VStack m='7% 0'>
      {!favorites?.length ? <Text>You have no Favorites!!!</Text> :
        favorites.map(fav => (
          <Container key={fav._id} bg='blue.100'>
            <Heading size='md' m='1%' noOfLines={1}>{fav.title}</Heading>
            <Flex>
              <Text fontWeight='bold' pl='3%' fontSize='2rem'>${fav.price}</Text>
              <Link href={`info/${fav._id}`} m='3%' h='fit-content' fontSize='1rem' bg='gray.100'>Go Buy</Link>
              <Button variant='link' color='red'>Remove</Button>
            </Flex>
            <Flex>
              <Image src={fav.image[0].url} alt='favorImages' h={['5rem', '6rem', '7rem', '8rem']} mb='1%'/>
              <Flex direction='column'>
                <Text noOfLines={5}>
                {fav?.description?.map(des => (
                  <Text ml='1.5%' key={des}>- {des}</Text>
                ))}
                </Text>
              </Flex>
            </Flex>
          </Container>
        ))
      }
    </VStack>
  )
}