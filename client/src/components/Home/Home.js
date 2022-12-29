import { Box, Flex, Button, Center, Heading } from '@chakra-ui/react'
import Card from './Card'
import Loading from '../../features/Loading'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getProductsPage, searchProducts } from '../../Redux/productActions'
import ScrollToTop from '../../features/ScrollToTop'
import Slider from '../../features/Slider'
import useFetch from '../../Hooks/useFetch'

export default function Home() {
    
    const dispatch = useDispatch()
    const data = useSelector(state => state.api.products)
    const count = useSelector(state => state.api.count)
    const disable = useSelector(state => state.api.disable)
    const [page, setPage] = useState(1)
    useFetch()

    useEffect(()=>{
        let search = window.sessionStorage.getItem('searchItem')
        let category = window.sessionStorage.getItem('category')
        if(search || category){
            search && dispatch(searchProducts(search))
            category && dispatch(getCategories(category))
            window.sessionStorage.removeItem('searchItem')
            window.sessionStorage.removeItem('category')
        } else {
            dispatch(getProductsPage())
        }
    }, [dispatch])

    const handleLoad = () => {
        setPage(prev => prev + 1)
        dispatch(getProductsPage(page))
    }

    return (
        <Box h='fit-content' maxW='100%'>
            {disable ? null : <Slider/>}
            <Box m='3%'>
                {!disable && <Heading size='md' marginBottom='2%'>Most Recent</Heading>}
                {!data?.length ? <Loading/> :
                <Flex wrap='wrap' justify='space-around'>
                    {data?.map(prod=>(
                        <Card key={prod._id}
                            id={prod._id}
                            title={prod.title}
                            price={prod.price}
                            image={prod.image[0].url}/>
                        ))}
                </Flex>}
            </Box>
            { disable ? null :        
            <Center>
                <Button m='7%' isDisabled={count === data?.length} onClick={handleLoad}>Load More</Button>
            </Center> }
            <ScrollToTop/>
        </Box>
    )
}
