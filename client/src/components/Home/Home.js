import { Box, Flex, Image, Button, Center, Heading, Spinner } from '@chakra-ui/react'
import Card from './Card'
import { useGetProductsQuery } from '../../Redux/apiSlice'

export default function Home() {

    const {
        data,
        isLoading,
        // isSuccess,
        isError,
        error
    } = useGetProductsQuery()

    if(isError) console.log(error)

    return (
    <>{isLoading ?
        <Center m='30%'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='green.500'
                size='xl'
            />
        </Center>  :
        <Box h='fit-content' maxW='100%'>
            <Image src='https://http2.mlstatic.com/D_NQ_721257-MLA52405202542_112022-OO.webp' alt='coverImg' w='100%' h='100%'/>
            <Box m='3%'>
                <Heading size='md' marginBottom='2%'>Most Recent</Heading>
                <Flex wrap='wrap' justify='space-around'>
                    {data?.map(prod=>(
                        <Card key={prod._id}
                            title={prod.title}
                            price={prod.price}
                            image={prod.image[0]}/>
                    ))}
                </Flex>
            </Box>
            <Center>
                <Button m='7%'>Load More</Button>
            </Center>
        </Box>
    }
    </>
    )
}
