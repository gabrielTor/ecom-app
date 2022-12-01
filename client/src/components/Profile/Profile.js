import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {VStack, HStack, IconButton, Image, Text, ButtonGroup, Skeleton} from '@chakra-ui/react'
import {EditIcon} from '@chakra-ui/icons'
import {loginUser} from '../../Redux/userActions'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import EditProfile from "./features/EditProfile"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Profile() {

    const { user, isAuthenticated } = useAuth0()
    const [update, setUpdate] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const userInfo = useSelector(state => state.api.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isAuthenticated && user){
            dispatch(loginUser({email: user.email}))
        }
    }, [dispatch, user, isAuthenticated])

    useEffect(()=>{
        if(userInfo){
            if(!userInfo.hasOwnProperty('name')){
                setUpdate(true)
                setDisabled(true)
            }
        }
        setTimeout(()=>{
            setLoaded(true)
        },2000)
    },[userInfo])

    return (
        <HStack>{!userInfo ? null :
            <Skeleton isLoaded={loaded} w='100%'>
                {update ?
                <EditProfile id={userInfo._id} 
                        userName={userInfo?.name} 
                        socialM={userInfo?.socialMedia} 
                        setUpdate={setUpdate}
                        disable={disabled}/>
                :
                <VStack m='7% 0'>
                <Image src={user?.picture} alt={'profilePic'}/>

                {update || <IconButton onClick={()=>setUpdate(true)} icon={<EditIcon/>}/>}

                <Text>{`${userInfo?.name?.first} ${userInfo?.name?.last}`}</Text>
                <Text>{userInfo.name?.dni}</Text>
                <Text>{userInfo.name?.phone}</Text>
                <Text>{userInfo.name?.address}</Text>
                <Text>{userInfo.name?.about}</Text>
                
                <ButtonGroup variant="ghost">
                    <IconButton as="a" href={userInfo?.socialMedia?.LinkedIn} target='_blank' aria-label="LinkedIn" icon={<FaLinkedin/>}/>
                    <IconButton as="a" href={userInfo?.socialMedia?.instagram} target='_blank' aria-label="Instagram" icon={<FaInstagram/>} />
                    <IconButton as="a" href={userInfo?.socialMedia?.facebook} target='_blank' aria-label="Facebook" icon={<FaFacebook/>} />
                    <IconButton as="a" href={userInfo?.socialMedia?.twitter} target='_blank' aria-label="Twitter" icon={<FaTwitter/>} />
                </ButtonGroup>
                </VStack>}
            </Skeleton>}
        </HStack>
    )
}

export default withAuthenticationRequired(Profile)