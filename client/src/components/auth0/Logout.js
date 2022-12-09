import { useAuth0 } from '@auth0/auth0-react'
import { Box } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../Redux/userActions'

export default function Logout() {

    const dispatch = useDispatch()
    const { logout, isAuthenticated, user } = useAuth0();
    const handleLogout = () => {
        dispatch(logOut({email: user.email}))
        logout()
    }

    return (
        isAuthenticated && (
            <Box w='100%' p='4%' _hover={{bg: '#32CD32'}} onClick={handleLogout}>
                Sign Out
            </Box>
        )
    )
}
