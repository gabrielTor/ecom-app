import { Box, Flex, Image, Button, Center, Heading } from '@chakra-ui/react'
import Card from './Card'
import Loading from './Loading'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsPage } from '../../Redux/apiActions'

export default function Home() {

    const dispatch = useDispatch()
    const data = useSelector(state => state.api.products.products)

    useEffect(()=>{
        dispatch(getProductsPage())
    }, [dispatch])

    const handleLoad = () => {
        
    }

    return (
        <Box h='fit-content' maxW='100%'>
            <Image src='https://http2.mlstatic.com/D_NQ_721257-MLA52405202542_112022-OO.webp' alt='coverImg' w='100%' h='100%'/>
            <Box m='3%'>
                <Heading size='md' marginBottom='2%'>Most Recent</Heading>
                {!data?.length ? <Loading/> :
                <Flex wrap='wrap' justify='space-around'>
                    {data?.map(prod=>(
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
            <Center>
                <Button m='7%' onClick={handleLoad}>Load More</Button>
            </Center>
        </Box>
    )
}
