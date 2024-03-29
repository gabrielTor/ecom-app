import axios from 'axios'
import {
    Box, Tabs, TabList, TabPanels, Tab, TabPanel,
    Heading, VStack, Text, Flex, Divider,
    IconButton, Center, Spinner
} from '@chakra-ui/react'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import useLocalStorage from '../../Hooks/useLocalStorage'
import { DeleteIcon } from '@chakra-ui/icons'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react'

initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_KEY)
// import WishList from '../Profile/features/WishList'

function Cart() {
    const [mp, setMp] = useState()
    const [isLoading, setLoading] = useState(true)
    const [value, setValue] = useLocalStorage('cart')
    const priceValues = value.length ? value.map(({ price, amount }) => +price * amount) : null
    const totalPrice = priceValues ? priceValues.reduce((total, price) => total + price) : 0

    const handleDelete = (title) => {
        setValue(prev => prev.filter(item => item.title !== title))
    }
    useEffect(() => {
        const handleMercadoPago = async () => {
            try {
                const res = await axios.post('https://ecom-rest-api.vercel.app/mercado-pago', value)
                setMp(res.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        handleMercadoPago()
    }, [value])

    return (
        <VStack w='100%' justify='center'>
            <Box w={['100%', '95%']} bg={['', 'white']} h={value.length > 5 ? 'fit-content' : '25em'}
                m='2.5% 2% 5%' borderRadius='md' boxShadow={['', 'base']} textAlign={value.length ? '' : 'center'}>
                <Tabs>
                    <TabList>
                        <Tab p='1% 3%'>Cart</Tab>
                        <Tab p='1% 3%'>Saved</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            {value.length ?
                                <>{
                                    value.map(({ title, price, amount }) => (
                                        <Flex key={title} w='100%' justify='space-between'>
                                            <Flex>
                                                <Text fontSize='lg'>{amount}</Text>
                                                <IconButton m={['0', '0 20px']} onClick={() => handleDelete(title)} variant='ghost' size='sm' icon={<DeleteIcon />} />
                                                <Text noOfLines={1} m='0.5%'>{title}</Text>
                                            </Flex>
                                            <Flex>
                                                <Text fontSize='lg' m='0.5%'>${amount * price}</Text>
                                            </Flex>
                                        </Flex>
                                    ))}
                                    <Divider />
                                    <Flex justify='space-between' m='1%'>
                                        <Heading size='lg'>Total:</Heading>
                                        <Heading size='lg'>${totalPrice}</Heading>
                                    </Flex>
                                    <Center mt={['20%', '5%']}>
                                        {/* <Button bg='#32CD32' mt={['20%', '5%']}>Continue</Button> */}
                                        {mp ? <Wallet initialization={{ preferenceId: mp }} /> : null}
                                        {isLoading && <Spinner />}
                                    </Center>
                                </> :
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