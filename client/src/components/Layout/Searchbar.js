import { Flex, Input, InputGroup, InputRightElement, Button, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'
import { searchProducts } from '../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from "react-router-dom";

export default function Searchbar() {
  
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const toast = useToast()
    const error = useSelector(state => state.api.error)

    useEffect(()=>{
        if(error){
            toast({
                title: error,
                status: 'error',
                isClosable: true
            })
        }
    },[error, toast])

    const handleOnSearch = (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if(location.pathname !== '/'){
            navigate('/')
            window.sessionStorage.setItem('searchItem', search)
            return setSearch('')
        }
        dispatch(searchProducts(search))
        setSearch('')
    }

    return (
        <Flex w='40%'>
            <InputGroup>
            <Input
            type="search"
            placeholder="Search product, brand or more..."
            value={search}
            onChange={(e) => handleOnSearch(e)}
            bg='white'
            />
            <InputRightElement children={<Button onClick={handleSubmit}><SearchIcon/></Button>}/>
            </InputGroup>
        </Flex>
    )
}