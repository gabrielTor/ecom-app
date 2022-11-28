import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    IconButton,
    Link,
    Button
} from '@chakra-ui/react'
import {GiHamburgerMenu} from 'react-icons/gi'
import CategMenu from './CategMenu'


export default function HamburgerMenu() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
        <IconButton variant='ghost' onClick={onOpen} icon={<GiHamburgerMenu size={30}/>}/>
        <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent bg='#32CD32'>
                <Link href='/'>
                    <DrawerHeader borderBottomWidth='1px'>Home</DrawerHeader>
                </Link>
                <DrawerBody bg='gray.100'>
                    <Button w='100%' variant='outline' mb='5%'>
                        <Link href='/sell'>Sell something</Link>
                    </Button>
                    <Button w='100%' variant='outline' mb='5%'>
                        Shopping Cart
                    </Button>
                    <Button w='100%' variant='outline' mb='5%'>
                        Messages
                    </Button>
                    <CategMenu/>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}
