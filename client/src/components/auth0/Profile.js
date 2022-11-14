import { useAuth0 } from "@auth0/auth0-react";
import {Box, Image, Heading, List, ListItem} from '@chakra-ui/react'

export default function Profile() {

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
