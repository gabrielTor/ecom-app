import {
    Popover, PopoverTrigger, PopoverContent, PopoverArrow,
    Avatar, IconButton, Box, Spinner, Link
} from '@chakra-ui/react'
import { useAuth0 } from "@auth0/auth0-react"
import Login from '../../auth0/Login'
import Logout from '../../auth0/Logout'
import style from '../styles/profileMenu.module.css'

export default function ProfileMenu() {

  const { isLoading, isAuthenticated, user } = useAuth0();

  return (
    <Popover>
        <PopoverTrigger>
        {
          isLoading ? <Spinner/> :
          <IconButton size='xl' borderRadius='50%' icon={<Avatar name={user?.name} src={user?.picture} />} />
        }
        </PopoverTrigger>
        <PopoverContent w={['6rem', '7em']} border='none'>
            <PopoverArrow/>
            {
              !isAuthenticated ?
              <Login/> :
              <>
              <Link href='/profile'><Box className={style.btn}>Profile</Box></Link>
              <Link><Box className={style.btn}>Orders</Box></Link>
              <Link href='/profile'><Box className={style.btn}>Favorites</Box></Link>
              <Logout/>
            </>
            }
        </PopoverContent>
    </Popover>
  )
}
