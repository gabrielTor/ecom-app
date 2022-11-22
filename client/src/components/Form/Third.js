import {Box, FormLabel, Input, Heading, Center, Flex, Image} from '@chakra-ui/react'
import axios from 'axios'

export default function Third({setElements, images}) {

  const upload = async(file) => {
    const formData = new FormData()
      formData.append('file', file)
      formData.append('tags', 'codeinfuse, medium, gist')
      formData.append('upload_preset', 'ml_default')
      formData.append('api_key', 143579616281141)
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
        <Box w='50%'>
          <FormLabel>
            <Input type='file' w='100%' onChange={handleChange} />
          </FormLabel>
          <Flex wrap='wrap'>
           {images?.map(img => (
            <Image key={img.cloudId} src={img.url} alt='uploaded' h='4rem' border={"2px"} borderColor={"gray.200"} m='2%'/>
           ))}
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}
