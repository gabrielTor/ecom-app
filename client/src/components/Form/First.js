import { Flex, 
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
Button } from '@chakra-ui/react'
import { getCategories } from '../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function First() {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.api.categories)

    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

  return (
    <Flex justify='center'>
        <Flex wrap='wrap' w='15rem'>
            {
                categories?.map((c,i)=>(
                    <Menu key={i}>
                        <MenuButton as={Button} w='100%'>{c.main}</MenuButton>
                            <MenuList>
                                {
                                    c.subcategories.map((s,idx)=>(<MenuItem key={idx}>{s}</MenuItem>))
                                }
                            </MenuList>
                    </Menu>
                ))
            }
        </Flex>
    </Flex>
  )
}
