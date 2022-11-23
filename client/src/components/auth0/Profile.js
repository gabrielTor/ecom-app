import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import {Box, Image, Heading, List, ListItem} from '@chakra-ui/react'

function Profile() {

    const { user, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <Box>
                {user?.picture && <Image src={user.picture} alt={user?.name} />}
                <Heading>{user?.name}</Heading>
                <List>
                    {Object.keys(user).map((objKey, i) => <ListItem key={i}>{objKey}: {user[objKey]} </ListItem>)}
                </List>
            </Box>
        )
    )
}

export default withAuthenticationRequired(Profile)