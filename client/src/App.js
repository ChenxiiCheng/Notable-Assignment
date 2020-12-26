import React from 'react';
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react';

import { Header } from './components/Header';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Header />
      </Box>
    </ChakraProvider>
  );
}

export default App;
