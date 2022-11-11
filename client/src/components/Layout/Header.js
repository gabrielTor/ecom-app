import { Box, Flex, Select, Spacer } from '@chakra-ui/react'
import Searchbar from './Searchbar'
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

export default function Header() {
  
    return (
        <Flex w='100%' h='70' border='2px' align='center'>
            <Spacer/>
            <Box>Logo</Box>
            <Spacer/>
            <Box w='20%'>
                <Select placeholder='All Categories'></Select>
            </Box>
            <Spacer/>
            <Searchbar/>
            <Spacer/>
            <Box>Login</Box>
            <Spacer/>
            <Box>+ Sell</Box>
            <Spacer/>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Spacer/>
        </Flex>
  )
}
