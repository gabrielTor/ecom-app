import {
    Heading, Text, Flex, Box,
    UnorderedList, ListItem, Button, 
    NumberInput, NumberInputField, NumberInputStepper,
    NumberDecrementStepper, NumberIncrementStepper,
    Center, Spinner} from '@chakra-ui/react'
import ImageSlider from './ImageSlider'
import {MdFavoriteBorder} from 'react-icons/md'
import { useParams } from 'react-router-dom'
import { useGetProductByIdQuery } from '../../Redux/apiSlice'

export default function Details() {

    const params = useParams()
    const {data, isFetching} = useGetProductByIdQuery(params.id)

  return (
    <>
    { isFetching ?
        <Center>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.500'
                size='xl'
                />
        </Center> :
        <Flex justify='space-evenly' marginTop='5%'>
            <Box w='40%' h='20%'>
                <ImageSlider slides={data.image}/>
            </Box>
            <Box w='40%' h='20%'>
                <Heading>{data.title}</Heading>

                <Text m='2%'>Rating comming soon</Text>

                <Text fontSize='3xl'>${data.price}</Text>

                <Flex direction='column' w='50%'>
                    <Text color='gray.400'
                        _before={{ content: '"("' }}
                        _after={{ content: '")"' }}>
                            Availabe Stock: {data.stock}
                    </Text>
                    <NumberInput defaultValue={1} min={1} max={20} m='3%'>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Button m='3%' colorScheme='whatsapp' variant='solid'>ADD TO CART</Button>
                    <Button m='3%' colorScheme='whatsapp' variant='outline'><MdFavoriteBorder/>Add to Favorites</Button>
                </Flex>

                <Heading as='h3' size='lg' m='2%'>Information about the product:</Heading>
                <UnorderedList>
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
