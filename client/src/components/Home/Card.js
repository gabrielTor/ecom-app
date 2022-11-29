import {Image, Flex, Text, Box, Divider, Button, Link} from '@chakra-ui/react'
import {MdFavoriteBorder, MdFavorite} from 'react-icons/md'
import { useEffect, useState } from 'react'
import {addToFavorites} from '../../Redux/userActions'
import {useDispatch, useSelector} from 'react-redux'
import { getErrors } from '../../Redux/apiSlice'

import React from 'react'

export default function Card(props) {

  const dispatch = useDispatch()
  const user = useSelector(state => state.api.user)
  const [show, setShow] = useState(false)
  const [inFavor, setInfavor] = useState(false)

  useEffect(()=>{
    if(user?.favorites.includes(props.id)) setInfavor(true)
  },[user?.favorites, props.id])

  const favor = () => {
    if(!user) dispatch(getErrors('Must login to add to favorites'))
    else {
      dispatch(addToFavorites({ product_id: props.id, email: user.email }))
      setInfavor(prev => !prev)
    }
  }

  return (
    <Box w='15rem' h='20rem' mt='3%'
      borderRadius='1%' bg='white'
      boxShadow='xl'
      onMouseOver={()=>setShow(true)}
      onMouseLeave={()=>setShow(false)}
      _hover={{
        color: '#32CD32',
        boxShadow: '0px 20px 50px grey',
        }}>
        <Flex direction='row-reverse' justify='center' h='15rem'>
            <Flex ml='10%' mt='2%' position='absolute'>
                <Button variant='inner' onClick={favor}>
                  {inFavor ? <MdFavorite color='red'/> : <MdFavoriteBorder/>}
                </Button>
            </Flex>
            <Link href={`info/${props.id}`}>
            <Image 
                src={props.image}
                alt={'cardimage'}
                maxH='15rem'/>
            </Link>
        </Flex>
        <Divider/>
        <Text m='5%' fontSize='2xl'>${props.price}</Text>
        {
          show ?
        <Flex justify='center' 
          fontSize='90%' 
          fontWeight='bold' 
          position='relative'
          bg='white' pl='2%' pr='2%'>
            <Text noOfLines={2}>{props.title}</Text>
        </Flex> : null
        }
    </Box>
  )
}
