import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Profile from './components/auth0/Profile';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>} />
          <Route path='info' element={<Details/>}/>
          <Route path='profile' element={<Profile/>}/>
        </Route>
      </Routes>
    </ChakraProvider>
  );
}

export default App;
