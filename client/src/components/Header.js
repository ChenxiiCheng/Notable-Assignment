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
import { MdBookmarkBorder, MdControlPoint } from 'react-icons/md';
import { BsClipboardData, BsBell } from 'react-icons/bs';
// import { useNavigate } from '@reach/router';

import { ColorModeSwitcher } from '../ColorModeSwitcher';
// import { userLogout } from '../lib/user';

const navigationLinks = [
  { id: 1, name: 'LinkedIn', url: 'https://www.chenxii.xyz' },
  { id: 2, name: 'GitHub', url: 'https://www.chenxii.xyz' },
  { id: 3, name: 'Personal Website', url: 'https://www.chenxii.xyz' },
];

// const newFeatureLinkImage = "https://assets.leetcode-cn.com/support/new.svg"

export const Header = () => {
  const navigationBarBg = useColorModeValue('white', '#1A202C');
  const navigationBarColor = useColorModeValue('rgba(38, 38, 38, 1)', 'white');
  const navigationBarBorderBottom = useColorModeValue(
    'rgba(240, 240, 240, 1)',
    '#2D3748'
  );

  //   const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);
  const cancelRef = useRef(null);

  const handleUserLogout = () => {
    // userLogout();
    setAlertOpen(false);
    // navigate('login');
  };

  return (
    <Box
      borderBottom={`1px solid ${navigationBarBorderBottom}`}
      fontSize="sm"
      fontWeight="450"
      color={navigationBarColor}
      bg={navigationBarBg}
      data-testid="navigationBar"
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
        <HStack spacing="30px" data-testid="links">
          {navigationLinks.map(link => (
            <Link
              key={link.id}
              href={link.url}
              isExternal
              _hover={{ textColor: 'rgba(34, 34, 34, 1)', fontWeight: 400 }}
            >
              <Text cursor="pointer">{link.name}</Text>
            </Link>
          ))}
        </HStack>
        <HStack spacing="30px">
          <Button
            size="sm"
            leftIcon={<MdBookmarkBorder />}
            colorScheme="teal"
            variant="outline"
            cursor="pointer"
            data-testid="btn__download"
          >
            TODO
          </Button>
          <Button
            size="sm"
            leftIcon={<MdControlPoint />}
            colorScheme="yellow"
            variant="outline"
            cursor="pointer"
            data-testid="btn__premium"
          >
            TODO
          </Button>
          <Box _hover={{ color: 'blue', stroke: 'blue' }}>
            <BsClipboardData
              size={18}
              cursor="pointer"
              color="rgba(140, 140, 140, 1)"
              data-testid="icon__clipboard"
            />
          </Box>
          <Box _hover={{ color: 'rgba(89, 89, 89, 1)' }}>
            <BsBell
              size={18}
              cursor="pointer"
              color="rgba(140, 140, 140, 1)"
              data-testid="icon__bell"
            />
          </Box>
          {/* <Avatar size="xs" cursor="pointer" data-testid="avatar">
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar> */}
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
              <Avatar size="xs" cursor="pointer" data-testid="avatar">
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => setAlertOpen(true)}>Logout</MenuItem>
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
