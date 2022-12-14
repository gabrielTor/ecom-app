import {
    Box, Flex,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button, Heading, Center
} from '@chakra-ui/react'
import { getCategories } from '../../../Redux/productActions'
import { useSelector } from 'react-redux'
import usefetch from '../../../Hooks/useFetch'
import Loading from '../../../features/Loading'

export default function First({setElements, setPage}) {

    const categories = useSelector(state => state.api.categories)
    usefetch(getCategories)

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
        {!categories.length ? <Loading/> :
        <Box border='1px' w={['100%', '75%', '60%', '50%']} h='fit-content' m='2%' borderRadius='0.5%'>
            <Accordion allowToggle>
                {categories?.map((c)=>(
                    <AccordionItem key={c.id}>
                        <AccordionButton bg='gray.300' _expanded={{ bg: '#32CD32' }}>
                            {c.main}
                            <AccordionIcon/>
                        </AccordionButton>
                        <AccordionPanel>
                            {c.subcategories.map((sub)=>(
                                <Button key={sub} onClick={()=>handleCategory(c.main,sub)}>{sub}</Button>
                            ))}
                        </AccordionPanel>
                    </AccordionItem>
                    ))}
            </Accordion>
        </Box>}
    </Flex>
    </Box>
  )
}
