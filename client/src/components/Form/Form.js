import {Box, Button, Center, Flex,
Stack, Text, ButtonGroup, IconButton
} from '@chakra-ui/react'
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import First from './steps/First'
import Second from './steps/Second'
import Third from './steps/Third'
import { postProduct } from '../../Redux/productActions'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useAuth0, withAuthenticationRequired} from '@auth0/auth0-react'
import { loginUser } from '../../Redux/userActions'
import {GoArrowLeft} from 'react-icons/go'
import { getErrors } from '../../Redux/apiSlice'

function Form() {

  const {user} = useAuth0()
  const currentUser = useSelector(state => state.api.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [update, setUpdate] = useState(true)
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
    second: false
  })

  useEffect(()=>{
    if(update){
      if(user) dispatch(loginUser({email: user.email}))
      if(currentUser){
        setElements(curr => ({...curr, userId: currentUser._id}))
        setUpdate(false)
      }  
    }
  },[user, currentUser, dispatch, update])

  const handleForm = () => {
    if(elements.image.length > 8){
      return dispatch(getErrors('No more than 8 images'))
    }
    dispatch(postProduct(elements))
    setTimeout(()=>{navigate('/')},600)
  }
  const handleBack = () => {
    if(page.second) return setPage(curr => ({...curr, second: false}))
    else if(page.first) return setPage(curr => ({...curr, first: false}))
    else navigate('/')
  }

  return (
    <Box w='100%' bg='#EDF2F7'>
      <Flex pl='3%' w='100%' h='90' align='center' bg='#32CD32' position='relative'>
        <Button variant='ghost' onClick={handleBack}><GoArrowLeft size={35}/>GO BACK</Button>
      </Flex>
      { !page.first && <First setElements={setElements} setPage={setPage}/> }
      { page.first && !page.second && <Second elements={elements} setElements={setElements} setPage={setPage}/> }
      { page.first && page.second && <Third images={elements.image} setElements={setElements}/> }
      {
        page.first && page.second && elements.image.length && (
          <Center>
            <Button w='50%' bg='#32CD32' mb='3%' onClick={handleForm}>
              Publish
            </Button>
          </Center>
      )}
        <Stack py='8' justify="space-evenly" align="center" bg='gray.300'
          direction={{ base: 'column-reverse', md: 'row' }}>
          <Text fontSize="sm">
            &copy; 2022 Gabriel Torres, Inc. All rights reserved.
          </Text>
          <ButtonGroup variant="ghost">
            <IconButton as="a" href="https://www.linkedin.com/in/dario-gabriel-torres-576a3561" aria-label="LinkedIn" 
              icon={<FaLinkedin fontSize="1.25rem" color='#0077b5' />}/>
            <IconButton as="a" href="https://github.com/gabrielTor" aria-label="GitHub" 
              icon={<FaGithub fontSize="1.25rem" />} />
            <IconButton as="a" href="https://www.facebook.com/nmz4ygabriel" aria-label="Facebook" 
              icon={<FaFacebook fontSize="1.25rem" color='#4267B2' />} />
          </ButtonGroup>
      </Stack>
    </Box>
  )
}

export default withAuthenticationRequired(Form)