import {Box, Button, Center} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import First from './First'
import Second from './Second'
import Third from './Third'
import { postProduct } from '../../Redux/productActions'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useAuth0} from '@auth0/auth0-react'
import { loginUser } from '../../Redux/userActions'

export default function Form() {

  const {user} = useAuth0()
  const currentUser = useSelector(state => state.api.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  useEffect(()=>{
    if(user) dispatch(loginUser({email: user.email}))
    if(currentUser) setElements(curr => ({...curr, userId: currentUser._id}))
  },[user, currentUser, dispatch])

  const handleForm = () => {
    dispatch(postProduct(elements))
    navigate('/')
  }

  return (
    <Box w='100%' bg='#EDF2F7'>
      { !page.first && <First setElements={setElements} setPage={setPage}/> }
      { page.first && !page.second && <Second elements={elements} setElements={setElements} setPage={setPage}/> }
      { page.first && page.second && <Third images={elements.image} setElements={setElements}/> }
      {
        page.first && page.second && elements.image.length && (
          <Center>
            <Button onClick={handleForm}>
              Publish
            </Button>
          </Center>
      )}
    </Box>
  )
}
