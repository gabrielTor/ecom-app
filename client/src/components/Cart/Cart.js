import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Heading, VStack, Text, Flex, Divider, IconButton } from '@chakra-ui/react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import useLocalStorage from '../../Hooks/useLocalStorage'
import {DeleteIcon} from '@chakra-ui/icons'
// import WishList from '../Profile/features/WishList'


function Cart() {

    const [value, setValue] = useLocalStorage('cart')
    const priceValues = value.length ? value.map(({price, amount}) => +price * amount) : null
    const totalPrice = priceValues ? priceValues.reduce((total, price) => total + price) : 0

    const handleDelete = (title) => {
        setValue(prev => prev.filter(item => item.title !== title))
    }

  return (
        <VStack w='100%' justify='center'>
            <Box w={['100%', '95%']} bg={['', 'white']} h={['25em']} 
                m='2.5% 2% 5%' borderRadius='md' boxShadow={['', 'base']} textAlign={value.length ? '' : 'center'}>
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
                            value.map(({title, price, amount})=>(
                                <Flex key={title} w='100%' justify='space-between'>
                                    <Flex>
                                        <Text fontSize='lg'>{amount}</Text>
                                        <IconButton m={['0', '0 20px']} onClick={()=>handleDelete(title)} variant='ghost' size='sm' icon={<DeleteIcon/>}/>
                                        <Text noOfLines={1} m='0.5%'>{title}</Text>
                                    </Flex>
                                    <Flex>
                                        <Text fontSize='lg' m='0.5%'>${amount * price}</Text>
                                    </Flex>
                                </Flex>
                            ))}
                            <Divider/>
                            <Flex justify='space-between' m='1%'>
                                <Heading size='lg'>Total:</Heading>
                                <Heading size='lg'>${totalPrice}</Heading>
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