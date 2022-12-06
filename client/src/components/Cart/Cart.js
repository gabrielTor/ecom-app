import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, VStack, Text, Flex, Divider, IconButton } from '@chakra-ui/react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import useLocalStorage from '../../Hooks/useLocalStorage'
import {DeleteIcon} from '@chakra-ui/icons'
// import WishList from '../Profile/features/WishList'


function Cart() {

    const [value, setValue] = useLocalStorage('cart')
    const priceValues = value.length ? value.map(({price}) => +price) : []
    const totalPrice = priceValues.length ? priceValues.reduce((total, price) => total + price) : null

  return (
        <VStack w='100%' justify='center'>
            <Box w={['100%', '95%']} bg={['', 'white']} h={['25em']} 
                m='2.5% 2% 5%' borderRadius='md' boxShadow={['', 'base']} textAlign='center'>
                <Tabs>
                    <TabList>
                        <Tab p='1% 3%'>Cart</Tab>
                        <Tab p='1% 3%'>Saved</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {
                                value.length ?
                                <>{
                                value.map(({title, price})=>(
                                    <Flex key={title} justify='space-between' w='100%'>
                                        <Text noOfLines={1} m='0.5%'>{title}</Text>
                                        <Flex justify='space-between' w={['auto', '20%']}>
                                            <Text fontSize='lg'>1</Text>
                                            <IconButton variant='ghost' size='sm' icon={<DeleteIcon/>}/>
                                            <Text fontSize='lg' m='0.5%'>${price}</Text>
                                        </Flex>
                                    </Flex>
                                ))}
                                <Divider/>
                                <Flex justify='space-between' m='1%'>
                                    <Heading size='lg'>Total:</Heading>
                                    <Heading size='lg'>${totalPrice || 0}</Heading>
                                </Flex>
                                </>:
                            <Heading size='sm' p={['0', '10em']} m={['50% 0', '0', '0', '0']}>Your Cart seems to be Empty</Heading>
                            }
                        </TabPanel>
                        <TabPanel>
                            {/* <WishList/> */} saved
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </VStack>
    )
}

export default withAuthenticationRequired(Cart)