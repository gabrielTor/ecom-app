import { Flex, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useState } from 'react'
import { SearchIcon } from '@chakra-ui/icons'

export default function Searchbar() {
  
    const [search, setSearch] = useState('')
    // const dispatch = useDispatch()

    const handleOnSearch = (event) => {
        setSearch(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        // dispatch(action(search))
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