import { Flex, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useRef } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { searchProducts } from '../../../Redux/productActions'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";

export default function Searchbar() {

    const search = useRef('')
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        if (pathname !== '/') {
            navigate('/')
            window.sessionStorage.setItem('searchItem', search.current.value)
        }
        dispatch(searchProducts(search.current.value))
    }

    return (
        <Flex w={['65%', '60%', '40%']}>
            <InputGroup>
                <Input
                    ref={search}
                    type="search"
                    placeholder="Search product, brand or more..."
                    bg='white'
                />
                <InputRightElement children={<Button onClick={handleSubmit}><SearchIcon /></Button>} />
            </InputGroup>
        </Flex>
    )
}