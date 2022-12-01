import {
    Input, Stack, Textarea, Button, FormLabel, CloseButton
} from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getErrors } from '../../../Redux/apiSlice'
import { updateUser } from '../../../Redux/userActions'

export default function EditProfile({id, userName, socialM, setUpdate, disable}) {

    const dispatch = useDispatch()
    const [data, setData] = useState({
        first: userName?.first || '',
        last: userName?.last || '',
        dni: userName?.dni || '',
        phone: userName?.phone || '',
        address: userName?.address || '',
        about: userName?.about || '',
        facebook: socialM?.facebook || '',
        instagram: socialM?.instagram || '',
        twitter: socialM?.twitter || '',
        LinkedIn: socialM?.LinkedIn || ''
    })

    const handleChange = (event) => {
        setData((curr)=> ({...curr, [event.target.name]: event.target.value}))
    }
    const handleClick = () => {
        if(/[^a-zA-Z, ]/g.test(data.first) || /[^a-zA-Z, ]/g.test(data.last)){
            dispatch(getErrors('Name must be letters only'))
        }
        else if(!data.first || !data.last){
            dispatch(getErrors('First and Last Name are required'))
        } else {
            dispatch(updateUser({
                id,
                name: {
                    first: data.first,
                    last: data.last,
                    dni: data.dni,
                    phone: data.phone,
                    address: data.address,
                    about: data.about
                },
                socialMedia: {
                    facebook: data.facebook,
                    instagram: data.instagram,
                    twitter: data.twitter,
                    LinkedIn: data.LinkedIn
                }
            }))
            setUpdate(false)
        }
    }

    return (
        <Stack spacing='2%' p={['0 2%', '0 15%', '0 25%']} m='4% 0'>
            <FormLabel display='flex' justifyContent='space-between'>
                Update your Profile Infomation: 
            <CloseButton size='sm' bg='red.500' onClick={()=>setUpdate(false)} disabled={disable}/> 
            </FormLabel>
            <Input type='text'bg='white' name='first'
                defaultValue={data.first} placeholder='First Name'
                onChange={handleChange} isInvalid={/[^a-zA-Z, ]/g.test(data.first)}/>

            <Input type='text'bg='white' name='last'
                defaultValue={data.last} placeholder='Last Name'
                onChange={handleChange} isInvalid={/[^a-zA-Z, ]/g.test(data.last)}/>

            <Input type='number'bg='white' name='dni'
                defaultValue={data.dni} placeholder='DNI' 
                onChange={handleChange}/>

            <Input type='number'bg='white' name='phone'
                defaultValue={data.phone} placeholder='Phone number' 
                onChange={handleChange}/>

            <Input type='text'bg='white' name='address'
                defaultValue={data.address} placeholder='Address' 
                onChange={handleChange}/>


            <Textarea type='text'bg='white' name='about'
                defaultValue={data.about} placeholder='A summary about yourself' 
                onChange={handleChange}/>


            <FormLabel>Share your Social Medias Optional:</FormLabel>
            <Input type='url'bg='white' name='facebook' 
                defaultValue={data.facebook} placeholder='Facebook Link' 
                onChange={handleChange} isInvalid={data.facebook && !/^(ftp|http|https):\/\/[^ "]+$/.test(data.facebook)}/>

            <Input type='url'bg='white' name='instagram' 
                defaultValue={data.instagram} placeholder='Instagram Link' 
                onChange={handleChange} isInvalid={data.instagram && !/^(ftp|http|https):\/\/[^ "]+$/.test(data.instagram)}/>

            <Input type='url'bg='white' name='twitter' 
                defaultValue={data.twitter} placeholder='Twitter Link' 
                onChange={handleChange} isInvalid={data.twitter && !/^(ftp|http|https):\/\/[^ "]+$/.test(data.twitter)}/>

            <Input type='url'bg='white' name='LinkedIn'
                defaultValue={data.LinkedIn} placeholder='LinkedIn Link' 
                onChange={handleChange} isInvalid={data.LinkedIn && !/^(ftp|http|https):\/\/[^ "]+$/.test(data.LinkedIn)}/>

            <Button bg='#32CD32' w='100%' onClick={handleClick}>Update</Button>
        </Stack>
    )
}
