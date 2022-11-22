import { ChakraProvider, theme, useToast } from '@chakra-ui/react';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Profile from './components/auth0/Profile';
import Form from './components/Form/Form'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function App() {

  const toast = useToast()
  const success = useSelector(state => state.api.success)
  useEffect(()=>{
    if(success){
      toast({
        title: success.message,
        status: 'success'
      })
    }
  },[success, toast])

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
