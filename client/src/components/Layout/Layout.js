import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import {Box} from '@chakra-ui/react'

export default function Layout() {
  return (
    <Box w='100%' bg='gray.100'>
        <Header/>
        <Outlet/>
        <Footer/>
    </Box>
  )
}
