import {Box, Input, Heading, Center, Flex, Image, Text, CloseButton} from '@chakra-ui/react'
import axios from 'axios'
import img from './assets/upload-files.jpg'
import { useDispatch } from 'react-redux'
import { deleteCloudImg } from '../../Redux/productActions'

export default function Third({setElements, images}) {

  const dispatch = useDispatch()
  const upload = async(file) => {
    const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'ml_default')
      try {
        const resp = await axios.post("https://api.cloudinary.com/v1_1/lookhome/image/upload", formData)
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

  return (
    <Box>
      <Center padding='2%'>
        <Heading>Upload Images</Heading>
      </Center>
      <Flex justify='center'>
        <Box w='50%' border='1px' h='40rem' m='2%' borderRadius='0.5%'>
          <Image src={img} alt='uploadImg' h='40%' w='49.80%' position='absolute'/>
          <Center position='relative' mt='3%'>
            <Text>Click here to upload or drag and drop</Text>
          </Center>
          <Input type='file' w='100%' h='20rem' onChange={handleChange} opacity='0' cursor='pointer' />
          <Flex wrap='wrap'>
           {images?.map(img => (
            <Box key={img.cloudId}>
              <Image src={img.url} alt='uploaded' h='6rem' border={"2px"} borderColor={"gray.200"} m='2%'/>
              <CloseButton size='sm' onClick={()=>dispatch(deleteCloudImg({id: img.cloudId}))} color='red'/>
            </Box>
           ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
