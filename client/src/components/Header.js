import React, { useState, useRef } from 'react';
import {
  Text,
  Link,
  Button,
  HStack,
  Box,
  Avatar,
  AvatarBadge,
  Image,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { MdBookmarkBorder } from 'react-icons/md';
import { BsClipboardData, BsBell } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { userLogout } from '../utils/user';

const navigationLinks = [
  {
    id: 1,
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/chenxi-cheng-42a564159/',
  },
  { id: 2, name: 'GitHub', url: 'https://github.com/ChenxiiCheng' },
  { id: 3, name: 'Website', url: 'https://www.chenxii.xyz' },
];

export const Header = () => {
  const navigationBarBg = useColorModeValue('white', '#1A202C');
  const navigationBarColor = useColorModeValue(
    'rgba(35, 35, 35, 0.8)',
    'white'
  );
  const navigationBarBorderBottom = useColorModeValue(
    'rgba(240, 240, 240, 1)',
    '#2D3748'
  );
  const TODOButtonTextColor = useColorModeValue('#0073e6', 'white');

  const history = useHistory();
  const [alertOpen, setAlertOpen] = useState(false);
  const cancelRef = useRef(null);

  const handleUserLogout = () => {
    userLogout();
    setAlertOpen(false);
    history.push('/login');
  };

  return (
    <Box
      borderBottom={`1px solid ${navigationBarBorderBottom}`}
      fontSize="sm"
      fontWeight="450"
      color={navigationBarColor}
      bg={navigationBarBg}
    >
      <Box
        d="flex"
        justifyContent="space-between"
        flexWrap="nowrap"
        minW="992px"
        maxW="1200px"
        w="100%"
        mx="auto"
        px="20px"
        py="6px"
        position="relative"
      >
        <HStack spacing="30px">
          {navigationLinks.map(link => (
            <Link
              key={link.id}
              href={link.url}
              isExternal
              _hover={{ textColor: '#0073e6', fontWeight: 500 }}
            >
              <Text cursor="pointer">{link.name}</Text>
            </Link>
          ))}
        </HStack>
        <HStack spacing="34px">
          <Button
            size="sm"
            leftIcon={<MdBookmarkBorder />}
            color={TODOButtonTextColor}
            variant="outline"
            cursor="pointer"
            boxShadow="0 2px 6px 0 rgba(32, 92, 146, 0.25)"
          >
            TODO
          </Button>
          <Box _hover={{ color: 'blue', stroke: 'blue' }}>
            <BsClipboardData
              size={18}
              cursor="pointer"
              color="rgba(140, 140, 140, 1)"
            />
          </Box>
          <Box _hover={{ color: 'rgba(89, 89, 89, 1)' }}>
            <BsBell size={18} cursor="pointer" color="rgba(140, 140, 140, 1)" />
          </Box>
          <Menu>
            <MenuButton
              as={Button}
              p="0"
              h="24px"
              w="40px"
              bg=""
              _hover={{ bg: '' }}
              _active={{ bg: '' }}
              _focus={{ boxShadow: 'none' }}
            >
              <Avatar size="xs" cursor="pointer">
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setAlertOpen(true)}>
                <Text fontWeight="450">Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
          <ColorModeSwitcher />
        </HStack>
        <AlertDialog
          isOpen={alertOpen}
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={() => setAlertOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Logout
              </AlertDialogHeader>

              <AlertDialogBody>Are you sure to logout?</AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  ref={cancelRef}
                  size="sm"
                  onClick={() => setAlertOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={handleUserLogout}
                  ml={4}
                >
                  Logout
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </Box>
  );
};
