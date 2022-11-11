import { Flex, Input, Button } from '@chakra-ui/react'
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
        // dispatch(getRecipesByName(recName))
        setSearch('')
    }

    return (
        <Flex w='40%'>
            <Input
            type="text"
            placeholder="Search product, brand or more..."
            value={search}
            onChange={(e) => handleOnSearch(e)}
            />
            <Button type="submit" onClick={(e) => handleSubmit(e)}><SearchIcon/></Button>
        </Flex>
    )
}