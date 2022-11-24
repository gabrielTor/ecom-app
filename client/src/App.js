import { ChakraProvider, theme, useToast } from '@chakra-ui/react';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Profile from './components/auth0/Profile';
import Form from './components/Form/Form'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetErrors, resetSuccessM } from './Redux/apiSlice'
import { getProductsPage } from './Redux/productActions'

function App() {

  const dispatch = useDispatch()
  const toast = useToast()
  const success = useSelector(state => state.api.success)
  const error = useSelector(state => state.api.error)
  const products = useSelector(state => state.api.products)

  useEffect(()=>{
    if(success){
      toast({
        title: success.message,
        status: 'success',
        isClosable: true
      })
      dispatch(resetSuccessM())
    }
  },[success, toast, dispatch])
  
  useEffect(()=>{
    if(error){
      if(error.split(' ')[0] === 'Sorry' && !products.length){
        dispatch(getProductsPage())
      }
      toast({
          title: error,
          status: 'error',
          isClosable: true
      })
      dispatch(resetErrors())
    }
},[error, toast, products, dispatch])

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='info/:id' element={<Details/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
        <Route>
          <Route path='/sell' element={<Form/>}/>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
