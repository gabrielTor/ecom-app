import {
    Heading, Text, Flex, Box,
    UnorderedList, ListItem, Button, 
    NumberInput, NumberInputField, NumberInputStepper,
    NumberDecrementStepper, NumberIncrementStepper,
    } from '@chakra-ui/react'
import ImageSlider from './ImageSlider'
import {MdFavoriteBorder} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductInfo } from '../../Redux/productActions'
import { useEffect, useState } from 'react'
import Loading from '../../features/Loading'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { useAuth0 } from '@auth0/auth0-react'
import { successMessage, getErrors } from '../../Redux/apiSlice'

export default function Details() {

    const params = useParams()
    const dispatch = useDispatch()
    const {user} = useAuth0()
    const [value, setValue] = useLocalStorage('cart')
    const [amount, setAmount] = useState(1)

    const data = useSelector(state => state.api.productInfo)
    useEffect(()=>{
        dispatch(getProductInfo(params.id))
    }, [dispatch, params])

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

  return (
    <>
    {!data.title ? <Loading/> :
        <Flex justify='space-evenly' marginTop='5%' wrap='wrap'>
            <Box w={['fit-content', '45%', '40%']} h='20%' m={['5%', '2%']}>
                <ImageSlider slides={data.image}/>
            </Box>
            <Box w={['fit-content', '45%', '40%']} h='20%' m={['5%', '2%']}>
                <Heading>{data.title}</Heading>

                <Text m='2%'>Rating comming soon</Text>

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
                    <Button m='3%' colorScheme='whatsapp' variant='outline'><MdFavoriteBorder/>Add to Favorites</Button>
                </Flex>

                <Heading as='h3' size='lg' m='2%'>Information about the product:</Heading>
                <UnorderedList pb='5%'>
                    {data.description?.map((des, i) => (
                        <ListItem key={i}>{des}</ListItem>
                    ))}
                </UnorderedList>
            </Box>
        </Flex>
    }
    </>
  )
}
