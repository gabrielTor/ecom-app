import {
    Box,
    Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    Heading,
    Center,
  } from '@chakra-ui/react'
import { getCategories } from '../../Redux/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function First({setElements, setPage}) {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.api.categories)

    useEffect(()=>{
        dispatch(getCategories())
    },[dispatch])

    const handleCategory = (main, sub) => {
        setElements(curr => ({...curr, category: {mainCategory: main, subCategory: sub}}))
        setPage(curr => ({...curr, first: true}))
    }

  return (
    <Box>
    <Center padding='2%'>
        <Heading>Choose a Category</Heading>
    </Center>
    <Flex justify='center' pb='20%'>
        <Box border='1px' w='50%' h='fit-content' m='2%'>
            <Accordion allowToggle>
                {
                    categories?.map((c,i)=>(
                        <AccordionItem key={i}>
                            <AccordionButton _expanded={{ bg: '#32CD32' }}>
                                {c.main}
                                <AccordionIcon/>
                            </AccordionButton>
                            <AccordionPanel>
                                {c.subcategories.map((sub,id)=>(
                                    <Button key={id} onClick={()=>handleCategory(c.main,sub)}>{sub}</Button>
                                ))}
                            </AccordionPanel>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </Box>
    </Flex>
    </Box>
  )
}
