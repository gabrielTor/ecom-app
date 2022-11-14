import { Box, SimpleGrid, Image, Button, Center, Heading } from '@chakra-ui/react'
import Card from './Card'

export default function Home() {

    const arr = [1,2,3,4,5,6,7,8]

  return (
    <Box h='fit-content' maxW='100%'>
        <Image src='https://http2.mlstatic.com/D_NQ_721257-MLA52405202542_112022-OO.webp' alt='' w='100%' h='100%'/>
        <Box m='3%'>
            <Heading size='md' marginBottom='2%'>Most Recent</Heading>
            <SimpleGrid columns={4} spacing='3%'>
                {arr.map(i=>(
                    <Card key={i}/>
                ))}
            </SimpleGrid>
        </Box>
        <Center>
            <Button m='2%'>Load More</Button>
        </Center>
    </Box>
  )
}
