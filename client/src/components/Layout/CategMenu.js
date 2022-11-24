import {Button, Box, SimpleGrid, Heading, Menu, MenuButton, MenuList, Flex} from '@chakra-ui/react'
import { getCategories } from '../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import {GrFormDown} from 'react-icons/gr'

export default function CategMenu() {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.api.categories)

    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

  return (
    <>
        <Menu>
        <MenuButton as={Button} w='100%' variant='outline'>
            <Flex justify='space-between' direction='row-reverse'><GrFormDown size={20}/>All Categories</Flex>
        </MenuButton>
            <MenuList w='fit-contnent' h='fit-content'>
                <Box p='2%'>
                    <Button variant='link' color='black'>
                        <Heading size='lg'>All Categories</Heading>
                    </Button>
                </Box>
                <SimpleGrid columns='4'>
                    {categories?.map(c => (
                        <Box key={c.id} p='3%'>
                            <Button variant='link' color='black'><Heading size='md'>{c.main}</Heading></Button>
                            {
                            c.subcategories.map(sub => (
                                <Box key={sub}>
                                    <Button variant='link'>{sub}</Button>
                                </Box>
                            ))
                            }
                        </Box>
                        ))
                    }
                </SimpleGrid>
            </MenuList>
        </Menu>
    </>
  )
}
