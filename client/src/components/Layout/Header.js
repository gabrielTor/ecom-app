import { Image, Box, Flex, Button, Link, Show, Circle } from '@chakra-ui/react'
import Searchbar from './features/Searchbar'
import { GiShoppingCart } from 'react-icons/gi'
import img from './assets/PMlogo.png'
import CategMenu from './features/CategMenu'
import ProfileMenu from './features/ProfileMenu'
import HamburgerMenu from './features/HamburgerMenu'
import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

export default function Header() {

    const value = useSelector(state => state.api.shoppingCart?.length)
    const { user } = useAuth0()

    return (
        <Flex w='100%' h='90' align='center' bg='#32CD32' justify='space-around'>
            <Show breakpoint='(min-width: 750px)'>
                <Link href='/'>
                    <Image src={img} alt='logo' />
                </Link>
            </Show>
            <Show breakpoint='(min-width: 820px)'>
                <Box w='fit-content'>
                    <CategMenu />
                </Box>
            </Show>

            <Show breakpoint='(max-width: 750px)'>
                <HamburgerMenu />
            </Show>

            <Searchbar />

            <ProfileMenu />

            <Show breakpoint='(min-width: 750px)'>
                <Link href='/sell' style={{ textDecoration: 'none' }}>
                    <Button variant='outline'>+ Sell</Button>
                </Link>
                <Link href='/shoppingCart'>
                    <Button variant='outline'>
                        <GiShoppingCart size={30} />
                        {(!value && user) || !user ? null :
                            <Circle bg='red' position='absolute' top='25px' right='39px' size={26}>{value}</Circle>
                        }
                    </Button>
                </Link>
            </Show>
        </Flex>
    )
}
