import { ChakraProvider } from '@chakra-ui/react'
import theme from './features/theme'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import Details from './components/Details/Details'
import Profile from './components/Profile/Profile'
import Form from './components/Form/Form'
import Cart from './components/Cart/Cart'
import useSuccessOrError from './Hooks/useSuccessOrError'
import Messages from './components/Messages/Messages'

function App() {

  useSuccessOrError()

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='info/:id' element={<Details/>}/>
          <Route path='profile' element={<Profile/>}/>
          <Route path='shoppingCart' element={<Cart/>}/>
          <Route path='messages' element={<Messages/>}/>
        </Route>
        <Route>
          <Route path='/sell' element={<Form/>}/>
        </Route>
      </Routes>
    </ChakraProvider>
  )
}

export default App
