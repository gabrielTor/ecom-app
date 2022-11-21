import { Box, Flex, Image, Button, Center, Heading } from '@chakra-ui/react'
import Card from './Card'
import Loading from './Loading'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsPage, searchProducts } from '../../Redux/productActions'
import ScrollToTop from './ScrollToTop'
import { useAuth0 } from "@auth0/auth0-react";
import { loginUser } from '../../Redux/userActions'

export default function Home() {
    
    const dispatch = useDispatch()
    const data = useSelector(state => state.api.products)
    const count = useSelector(state => state.api.count)
    const disable = useSelector(state => state.api.disable)
    const [page, setPage] = useState(1)
    const {user, isAuthenticated} = useAuth0()

    useEffect(()=>{
        let search = window.sessionStorage.getItem('searchItem')
        if(search){
            dispatch(searchProducts(search))
            window.sessionStorage.removeItem('searchItem')
        } else {
            dispatch(getProductsPage())
        }
    }, [dispatch])

    useEffect(()=>{
        if(isAuthenticated && user){
            dispatch(loginUser({email: user.email}))
        }
    }, [dispatch, user, isAuthenticated])

    const handleLoad = () => {
        setPage(prev => prev + 1)
        dispatch(getProductsPage(page))
    }

    return (
        <Box h='fit-content' maxW='100%'>
            <Image src='https://http2.mlstatic.com/D_NQ_721257-MLA52405202542_112022-OO.webp' alt='coverImg' w='100%' h='100%'/>
            <Box m='3%'>
                <Heading size='md' marginBottom='2%'>Most Recent</Heading>
                {!data?.length ? <Loading/> :
                <Flex wrap='wrap' justify='space-around'>
                    {
                    data?.map(prod=>(
                        <Card key={prod._id}
                            id={prod._id}
                            title={prod.title}
                            price={prod.price}
                            image={prod.image[0]}/>
                        ))
                    }
                </Flex>
                }
            </Box>
            {
            disable ? null :        
            <Center>
                <Button m='7%' isDisabled={count === data?.length} onClick={handleLoad}>Load More</Button>
            </Center>
            }
            <ScrollToTop/>
        </Box>
    )
}
