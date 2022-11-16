import { Box, SimpleGrid, Image, Button, Center, Heading, Text } from '@chakra-ui/react'
import Card from './Card'
import { useGetProductsQuery } from '../../Redux/apiSlice'

export default function Home() {

    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetProductsQuery()

    if(isLoading) (<Text>Loading...</Text>)

    if(isError) console.log(error)

    if(isSuccess){

        return (
        <Box h='fit-content' maxW='100%'>
            <Image src='https://http2.mlstatic.com/D_NQ_721257-MLA52405202542_112022-OO.webp' alt='' w='100%' h='100%'/>
            <Box m='3%'>
                <Heading size='md' marginBottom='2%'>Most Recent</Heading>
                <SimpleGrid columns={4} spacing='3%'>
                    {data.map(prod=>(
                        <Card key={prod._id}
                            title={prod.title}
                            price={prod.price}
                            image={prod.image[0]}/>
                    ))}
                </SimpleGrid>
            </Box>
            <Center>
                <Button m='2%'>Load More</Button>
            </Center>
        </Box>
        )
    }
}
