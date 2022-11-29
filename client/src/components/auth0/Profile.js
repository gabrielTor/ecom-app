import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {Box} from '@chakra-ui/react'
import {loginUser} from '../../Redux/userActions'
import {useEffect} from 'react'
import {useDispatch} from 'react-redux'

function Profile() {

    const { user, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()

    useEffect(()=>{
        if(isAuthenticated && user){
            dispatch(loginUser({email: user.email}))
        }
    }, [dispatch, user, isAuthenticated])

    return (
        isAuthenticated && (
            <Box>
                hello
            </Box>
        )
    )
}

export default withAuthenticationRequired(Profile)