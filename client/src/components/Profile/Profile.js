import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { VStack, Stack, IconButton, Image, Text, ButtonGroup, Skeleton, Button } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditProfile from "./features/EditProfile"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'
import MySellings from "./features/MySellings"
import WishList from "./features/WishList"

function Profile() {

    const { user } = useAuth0()
    const [update, setUpdate] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const userInfo = useSelector(state => state.api.user)
    const userListings = useSelector(state => state.api.userListings)

    useEffect(() => {
        if (userInfo) {
            if (!userInfo.hasOwnProperty('name')) {
                setUpdate(true)
                setDisabled(true)
            }
        }
        setTimeout(() => {
            setLoaded(true)
        }, 2000)
    }, [userInfo])

    return (
        <Stack direction={['column', 'column', 'row']}>{!userInfo ? null :
            <Skeleton isLoaded={loaded} w={update || !userListings ? '100%' : ['100%', '100%', '50%']}>
                {update ?
                    <EditProfile id={userInfo._id}
                        userName={userInfo?.name}
                        socialM={userInfo?.socialMedia}
                        setUpdate={setUpdate}
                        disable={disabled} />
                    :
                    <VStack m='13% 5% 7%' bg='gray.300' borderRadius='2xl'>
                        <Image src={user?.picture} alt={'profilePic'} />

                        <IconButton onClick={() => setUpdate(true)} icon={<EditIcon />} />

                        <Text>{`${userInfo?.name?.first} ${userInfo?.name?.last}`}</Text>
                        <Text>{userInfo.name?.dni}</Text>
                        <Text>{userInfo.name?.phone}</Text>
                        <Text>{userInfo.name?.address}</Text>
                        <Text>{userInfo.name?.about}</Text>
                        <Text>You currently have {userListings?.length} Listings</Text>

                        <ButtonGroup variant="ghost">
                            <IconButton as="a" href={userInfo?.socialMedia?.LinkedIn} target='_blank' aria-label="LinkedIn" icon={<FaLinkedin />} />
                            <IconButton as="a" href={userInfo?.socialMedia?.instagram} target='_blank' aria-label="Instagram" icon={<FaInstagram />} />
                            <IconButton as="a" href={userInfo?.socialMedia?.facebook} target='_blank' aria-label="Facebook" icon={<FaFacebook />} />
                            <IconButton as="a" href={userInfo?.socialMedia?.twitter} target='_blank' aria-label="Twitter" icon={<FaTwitter />} />
                        </ButtonGroup>

                        <Button variant='outline' border='2px' borderColor='blue' bg={wishlist && 'blue.300'} onClick={() => setWishlist(true)}>My Favorites</Button>
                        <Button variant='outline' border='2px' borderColor='green' bg={!wishlist && 'green.300'} onClick={() => setWishlist(false)}>My Listings</Button>

                    </VStack>}

            </Skeleton>}
            {update ? null :
                <Skeleton isLoaded={loaded} w='100%'>
                    {wishlist ?
                        <WishList userFavor={userInfo?.favorites} userEmail={user.email} /> :
                        <MySellings userId={userInfo?._id} />
                    }
                </Skeleton>}
        </Stack>
    )
}

export default withAuthenticationRequired(Profile)