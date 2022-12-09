import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@chakra-ui/react'

export default function Login() {

    const { loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        !isAuthenticated && (
            <Button _hover={{bg: '#32CD32'}} onClick={() => loginWithRedirect()}>
                Sign In
            </Button>
        )
    )
}
