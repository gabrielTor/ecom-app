import {Box, Input, Heading, Center, Flex, Image, Text, CloseButton} from '@chakra-ui/react'
import axios from 'axios'
import img from '../assets/upload-files.jpg'
import { useDispatch } from 'react-redux'
import { deleteCloudImg } from '../../../Redux/productActions'

export default function Third({setElements, images}) {

  const dispatch = useDispatch()
  const upload = async(file) => {
    const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.REACT_APP_PRESET)
      try {
        const resp = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_NAME}/image/upload`, formData)
        const img = { url: resp.data.secure_url, cloudId: resp.data.public_id }
        setElements((curr) => ({...curr, image: [...images, img]}))
      } catch (error) {
        console.error(error)
      } 
  }

  const handleChange = (event) => {
    let file = event.target.files[0]
    if(file){
      upload(file)
    }
  }
  const handleDelete = (id) => {
    let filter = images.filter(img => img.cloudId !== id)
    setElements((curr) => ({...curr, image: [...filter]}))
    dispatch(deleteCloudImg({id: id}))
  }

  return (
    <Box>
      <Center padding='2%'>
        <Heading>Upload Images</Heading>
      </Center>
      <Flex justify='center'>
        <Box w='50%' h='40em'>
          <Image src={img} alt='uploadImg' h='40%' w='50%' position='absolute'/>
          <Center position='relative' mt='3%'>
            <Text>Click here to upload or drag and drop</Text>
          </Center>
          <Input type='file' w='100%' h='20rem' onChange={handleChange} opacity='0' cursor='pointer' />
          <Flex wrap='wrap' mt='10%'>
           {images?.map(img => (
            <Flex key={img.cloudId} w='4rem' h='4rem' justify='flex-end' m='1%'>
              <Image src={img.url} 
                alt='uploaded' w='100%' h='100%' border="2px"
                borderColor="gray.200" />
              <CloseButton size='sm' position='absolute' onClick={()=>handleDelete(img.cloudId)} color='red'/>
            </Flex>
           ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
