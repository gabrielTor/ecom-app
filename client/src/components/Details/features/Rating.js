import { Text, Flex } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

export default function Rating() {
  return (
    <Flex m='2%' color='gray.300'>
        <StarIcon color='gold'/>
        <StarIcon color='gold'/>
        <StarIcon color='gold'/>
        <StarIcon color='gold'/>
        <StarIcon/>
        <Text ml='1.5%' color='gray.400'
            _before={{ content: '"("' }}
            _after={{ content: '")"' }}>100 reviews</Text>
    </Flex>
  )
}
