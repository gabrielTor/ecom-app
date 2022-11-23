import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logOut } from '../../Redux/userActions';

export default function Logout() {

    const dispatch = useDispatch()
    const { logout, isAuthenticated, user } = useAuth0();
    const handleLogout = () => {
        dispatch(logOut({email: user.email}))
        logout()
    }

    return (
        isAuthenticated && (
            <Button onClick={handleLogout}>
                Sign Out
            </Button>
        )
    )
}
