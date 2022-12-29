import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    IconButton, Link, Button
} from '@chakra-ui/react'
import {GiHamburgerMenu} from 'react-icons/gi'


export default function HamburgerMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <IconButton variant='ghost' onClick={onOpen} icon={<GiHamburgerMenu size={30}/>}/>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg='#32CD32'>
                <DrawerCloseButton />
                <Link href='/'>
                    <DrawerHeader borderBottomWidth='1px'>Home</DrawerHeader>
                </Link>
                <DrawerBody bg='gray.100'>
                    <Link href='/sell'>
                        <Button w='100%' variant='outline' mb='5%'>Sell something</Button>
                    </Link>
                    <Link href='/shoppingCart'>
                        <Button w='100%' variant='outline' mb='5%'>Shopping Cart</Button>
                    </Link>
                    <Link href='/messages'>
                        <Button w='100%' variant='outline' mb='5%'>Messages</Button>
                    </Link>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}
