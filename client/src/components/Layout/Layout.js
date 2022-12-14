import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import {Box} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'

export default function Layout() {

  const {pathname} = useLocation()

  return (
    <Box w='100%' bg='gray.100'>
        <Header/>
        <Outlet/>
        {pathname !== '/messages' ? <Footer/> : null}
    </Box>
  )
}
