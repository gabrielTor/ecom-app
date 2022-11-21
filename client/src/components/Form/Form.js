import {Box, Button} from '@chakra-ui/react'
import { useState } from 'react'
import First from './First'
import Second from './Second'
import Third from './Third'

export default function Form() {

  const [elements, setElements] = useState({
    title: '',
    price: '',
    image: [],
    category: {
      mainCategory: '',
      subCategory: ''
    },
    stock: 1,
    description: [],
    userId: '',
    used: false
  })
  const [page, setPage] = useState({
    first: false,
    second: false,
    third: false
  })

  return (
    <Box w='100%' bg='#EDF2F7'>
      { !page.first && <First setElements={setElements} setPage={setPage}/> }
      { page.first && !page.second && <Second elements={elements} setElements={setElements} setPage={setPage}/> }
      { page.first && page.second && <Third/> }
      {
        page.first && page.second && page.third (
          <Button>
            Publish
          </Button>
      )}
      
    </Box>
  )
}
