import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import Header from './components/Layout/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
