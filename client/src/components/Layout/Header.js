import { Image, Box, Flex, Select, Spacer, Button, Link, Spinner, Avatar } from '@chakra-ui/react'
import Searchbar from './Searchbar'
import { GiShoppingCart } from 'react-icons/gi'
import Login from '../auth0/Login';
import Logout from '../auth0/Logout';
import { useAuth0 } from "@auth0/auth0-react";
import img from './assets/PMlogo.png'

export default function Header() {

    const { isLoading, error, isAuthenticated, user } = useAuth0();
  
    return (
        <Flex w='100%' h='90' align='center' bg='#32CD32'>
            <Spacer/>
            <Link href='/'>
                <Image src={img} alt='logo' />
            </Link>
            <Spacer/>

            <Box w='20%'>
                <Select placeholder='All Categories'></Select>
            </Box>
            <Spacer/>

            <Searchbar/>
            <Spacer/>

            <Box>
            {error && <p>Authentication Error</p>}
            {!error && isLoading && <Spinner/>}
            {!error && !isLoading && 
                !isAuthenticated ?
                <Login/> :
                <Logout/>
                }
            </Box>
            <Spacer/>
            <Link href='profile'>
                <Avatar name={user?.name} src={user?.picture} />
            </Link>
            <Spacer/>
            
            <Spacer/>
            <Link href='/sell' style={{textDecoration: 'none'}}>
                <Button variant='outline'>+ Sell</Button>
            </Link>
            <Spacer/>

            <Button variant='outline'>
                <GiShoppingCart/>
            </Button>
            <Spacer/>

        </Flex>
  )
}
