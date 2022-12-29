import {
    Box, Flex, Center, Heading,
    FormControl, FormLabel, Input,
    FormHelperText,
    RadioGroup, Radio,
    HStack, InputGroup,
    InputLeftElement, InputRightElement,
    Button, UnorderedList, ListItem,
    useToast } from '@chakra-ui/react'
import { useState } from 'react'

export default function Second({elements, setElements, setPage}) {

    const toast = useToast()
    const [value, setValue] = useState('')
    let key = 1
    const handleChange = (event) => {
        setElements((curr)=> ({...curr, [event.target.name]: event.target.value}))
    }
    const handleCheck = (event) => {
        let value = event === 'used'
        setElements((curr)=> ({...curr, used: value}))
    }
    const addDescription = () => {
        if(value){
            setElements((curr)=> ({...curr, description: [...elements.description, value]}))
            setValue('')
        }
    }
    const handldDelete = (value) => {
        let values = elements.description.filter(val => val !== value)
        setElements((curr)=> ({...curr, description: values}))
    }
    const handleNext = () => {
        if(elements.title && elements.price && elements.stock >= 1){
            setPage((curr)=>({...curr, second: true}))
        } else {
            toast({
                title: 'Fill in the required fields',
                description: (!elements.title && 'missing title') || (!elements.price && 'missing price') || (elements.stock < 1 && 'stock cannot be below 1'),
                status: 'error',
                isClosable: true
            })
        }
    }

  return (
    <Box>
    <Center padding='2%'><Heading>Fill out required Infomation</Heading></Center>
    <Flex justify='center' pb='20%'>
        <Box border='1px' w={['100%', '75%', '60%', '50%']} h='fit-content' m='2%' borderRadius='0.5%' p='2%' bg='gray.300'>

            <FormControl isRequired mb='5%'>
                <FormLabel>Title:</FormLabel>
                <Input bg='#EDF2F7' type='text' name='title' placeholder='your title' defaultValue={elements.title} onChange={handleChange}/>
                <FormHelperText>This is the first heading buyers will see before clicking on your product</FormHelperText>
            </FormControl>

            <FormControl isRequired mb='5%'>
                <FormLabel>Price:</FormLabel>
                <InputGroup>
                    <InputLeftElement
                        fontWeight='bold'
                        children='$'/>
                    <Input bg='#EDF2F7' type='number' name={'price'} defaultValue={elements.price} onChange={handleChange}/>
                </InputGroup>
                <FormHelperText>A reasonable price for what you are selling</FormHelperText>
            </FormControl>

            <FormControl mb='5%'>
                <FormLabel>Stock:</FormLabel>
                <Input bg='#EDF2F7' type='number' name={'stock'} defaultValue={elements.stock} onChange={handleChange}/>
                <FormHelperText>The Amount of items you currently have</FormHelperText>
            </FormControl>

            <FormControl as='fieldset' mb='5%'>
                <FormLabel>Condition:</FormLabel>
                <RadioGroup onChange={handleCheck}>
                    <HStack spacing='5%'>
                        <Radio value='new'>New</Radio>
                        <Radio value='used'>Used</Radio>
                    </HStack>
                </RadioGroup>
            </FormControl>

            <FormControl>
                <FormLabel>Description:</FormLabel>
                <InputGroup>
                    <Input bg='#EDF2F7' type='text' placeholder='make sure to click add' value={value} onChange={(e)=>setValue(e.target.value)}/>
                    <InputRightElement children={<Button onClick={addDescription}>Add</Button>}/>
                </InputGroup>
                <FormHelperText>Mention the main characteristics of your item ex: brand, model, age, type.</FormHelperText>
            </FormControl>

            <UnorderedList m='5%'>
                {elements.description?.map((elem)=>(
                    <ListItem key={key++}>{elem}<Button onClick={()=>handldDelete(elem)} color='red'>x</Button></ListItem>
                ))}
            </UnorderedList>
            <Button onClick={handleNext}>Upload Images</Button>
        </Box>
    </Flex>
    </Box>
  )
}