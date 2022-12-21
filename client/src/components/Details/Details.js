import {
    Heading, Text, Flex, Box,
    UnorderedList, ListItem, Button, 
    NumberInput, NumberInputField, NumberInputStepper,
    NumberDecrementStepper, NumberIncrementStepper,
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import ImageSlider from './ImageSlider'
import {MdFavoriteBorder, MdFavorite, MdChat} from 'react-icons/md'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductInfo } from '../../Redux/productActions'
import { useState } from 'react'
import Loading from '../../features/Loading'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { useAuth0 } from '@auth0/auth0-react'
import { successMessage, getErrors } from '../../Redux/apiSlice'
import useFavorite from '../../Hooks/useFavorite'
import useJoinChat from '../../Hooks/useJoinChat'
import useFetch from '../../Hooks/useFetch'

export default function Details() {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useAuth0()
    const [value, setValue] = useLocalStorage('cart')
    const [inFavor, favor] = useFavorite(id, user?.email)
    const [setChatIds] = useJoinChat()
    const [amount, setAmount] = useState(1)
    const data = useSelector(state => state.api.productInfo)
    const userData = useSelector(state => state.api.user)
    useFetch(getProductInfo, id)
    
    const handleCart = () => {
        if(!user) return dispatch(getErrors('Must login to add to cart'))
        else if(value.length){
            for (let i = 0; i < value.length; i++) {
                if(value[i].title === data.title) return
            }
        }
        setValue(prev => [...prev, {title: data.title, price: data.price, amount}])
        dispatch(successMessage({message: 'Added to Cart'}))
    }
    const handleChat = () => {
        if(!user) return
        setChatIds({
            userId: userData._id,
            sellerUserId: data.userId,
            productId: id
        })
        setTimeout(()=>{navigate('/messages')},500)
    }

  return (
    <>
    {!data.title ? <Loading/> :
        <Flex justify='space-evenly' marginTop='5%' wrap='wrap'>
            <Box w={['fit-content', '45%', '40%']} h='20%' m={['5%', '2%']}>
                <ImageSlider slides={data.image}/>
            </Box>
            <Box w={['fit-content', '45%', '40%']} h='20%' m={['5%', '2%']}>
                <Heading>{data.title}</Heading>

                <Flex m='2%' color='gray.300'>
                    <StarIcon color='gold'/>
                    <StarIcon color='gold'/>
                    <StarIcon color='gold'/>
                    <StarIcon color='gold'/>
                    <StarIcon/>
                    <Text ml='1.5%' color='gray.400'
                     _before={{ content: '"("' }}
                     _after={{ content: '")"' }}>100 reviews</Text>
                </Flex>

                <Text fontSize='3xl'>${data.price}</Text>

                <Flex direction='column' w='50%'>
                    <Text color='gray.400'
                        _before={{ content: '"("' }}
                        _after={{ content: '")"' }}>
                            Availabe Stock: {data.stock}
                    </Text>
                    <NumberInput defaultValue={1} min={1} max={data.stock} m='3%' onChange={(event)=>setAmount(event)}>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button m='3%' colorScheme='whatsapp' variant='solid' onClick={handleCart}>ADD TO CART</Button>

                    <Button m='3%' colorScheme='whatsapp' variant='outline' onClick={favor}>
                        {inFavor ? <><MdFavorite color='red'/>Favorite</> : <><MdFavoriteBorder/>Add to Favorites</>}
                    </Button>
                </Flex>

                <Heading as='h3' size='lg' m='2%'>Information about the product:</Heading>
                <UnorderedList pb='5%'>
                    {data.description?.map((des, i) => (
                        <ListItem key={i}>{des}</ListItem>
                    ))}
                </UnorderedList>
            </Box>
            <Button bg='gray.300' onClick={handleChat}><MdChat color='green'/>Chat with the seller</Button>
        </Flex>
    }
    </>
  )
}
