import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

export default function Logout() {

    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Button onClick={() => logout()}>
                Sign Out
            </Button>
        )
    )
}
