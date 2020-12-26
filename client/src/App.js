import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Text, theme } from '@chakra-ui/react';

import { Header } from './components/Header';
import { VerticalTabs } from './components/Tabs';
import { getAllPhysicians } from './context/actions/userActions';
import { axios } from './utils/axios';
import { endpoint } from './utils/config';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${endpoint}user/all`)
      .then(res => {
        if (res.status === 200) {
          setUsers(res?.data?.data);
        }
      })
      .catch(erro => {
        setUsers([]);
      });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Header />
        <VerticalTabs data={users} />
      </Box>
    </ChakraProvider>
  );
}

export default App;
