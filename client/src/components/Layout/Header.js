import { Image, Box, Flex, Button, Link, Show } from '@chakra-ui/react'
import Searchbar from './features/Searchbar'
import { GiShoppingCart } from 'react-icons/gi'
import img from './assets/PMlogo.png'
import CategMenu from './features/CategMenu';
import ProfileMenu from './features/ProfileMenu'
import HamburgerMenu from './features/HamburgerMenu';

export default function Header() {
  
    return (
        <Flex w='100%' h='90' align='center' bg='#32CD32' justify='space-around'>
            <Show breakpoint='(min-width: 750px)'>
                <Link href='/'>
                    <Image src={img} alt='logo' />
                </Link>
            </Show>
            <Show breakpoint='(min-width: 820px)'>
                <Box w='fit-content'>
                    <CategMenu/>
                </Box>
            </Show>

            <Show breakpoint='(max-width: 750px)'>
                <HamburgerMenu/>
            </Show>

            <Searchbar/>

            <ProfileMenu/>

            <Show breakpoint='(min-width: 750px)'>
                <Link href='/sell' style={{textDecoration: 'none'}}>
                    <Button variant='outline'>+ Sell</Button>
                </Link>

                <Button variant='outline'>
                    <GiShoppingCart size={30}/>
                </Button>
            </Show>
        </Flex>
  )
}
