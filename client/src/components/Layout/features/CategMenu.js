import {Button, Box, SimpleGrid, Heading, Menu, MenuButton, MenuList, Flex} from '@chakra-ui/react'
import { getCategories } from '../../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import {GrFormDown} from 'react-icons/gr'
import {useNavigate, useLocation} from 'react-router-dom'
import useFetch from '../../../Hooks/useFetch'

export default function CategMenu() {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.api.categories)
    const [header, setHeader] = useState('All Categories')
    const [open, setOpen] = useState(true)
    useFetch(getCategories)

    const handleCateg = (category) => {
        setOpen(false)
        if(location.pathname !== '/'){
            if(category === 'all') return navigate('/')
            navigate('/')
            window.sessionStorage.setItem('category', category)
            setTimeout(()=>{setOpen(true)},500)
            return setHeader(category)
        }
        if(category === 'all') return window.location.reload()
        setHeader(category)
        dispatch(getCategories(category))
        setTimeout(()=>{setOpen(true)},500)
    }

  return (
    <>{open ? 
        <Menu>
        <MenuButton as={Button} w='100%' variant='outline'>
            <Flex justify='space-between' direction='row-reverse'><GrFormDown size={20}/>{header}</Flex>
        </MenuButton>
            <MenuList w='fit-contnent' h='fit-content'>
                <Box p='2%'>
                    <Button variant='link' color='black' onClick={()=>handleCateg('all')}>
                        <Heading size='lg'>All Categories</Heading>
                    </Button>
                </Box>
                <SimpleGrid columns={[1, 2, 3, 4]}>
                    {categories?.map(c => (
                        <Box key={c.id} p='3%'>
                            <Button variant='link' color='black' onClick={()=>handleCateg(c.main)}>
                                <Heading size='md'>{c.main}</Heading>
                            </Button>
                            {c.subcategories.map(sub => (
                                <Box key={sub}>
                                    <Button variant='link' onClick={()=>handleCateg(sub)}>{sub}</Button>
                                </Box>
                            ))}
                        </Box>
                        ))}
                </SimpleGrid>
            </MenuList>
        </Menu> :
        <Button isLoading w='100%' variant='outline'>{header}</Button>}
    </>
  )
}