import { Image, Box, Flex, Spacer, Button, Link } from '@chakra-ui/react'
import Searchbar from './features/Searchbar'
import { GiShoppingCart } from 'react-icons/gi'
import img from './assets/PMlogo.png'
import CategMenu from './features/CategMenu';
import ProfileMenu from './features/ProfileMenu'

export default function Header() {
  
    return (
        <Flex w='100%' h='90' align='center' bg='#32CD32'>
            <Spacer/>

            <Link href='/'>
                <Image src={img} alt='logo' />
            </Link>

            <Spacer/>

            <Box w='fit-content'>
                <CategMenu/>
            </Box>

            <Spacer/>

            <Searchbar/>

            <Spacer/>
            
            <ProfileMenu/>

            <Spacer/>
            
            <Link href='/sell' style={{textDecoration: 'none'}}>
                <Button variant='outline'>+ Sell</Button>
            </Link>

            <Spacer/>

            <Button variant='outline'>
                <GiShoppingCart size={30}/>
            </Button>

            <Spacer/>
        </Flex>
  )
}
