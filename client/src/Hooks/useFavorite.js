import { useEffect, useState } from 'react'
import {addToFavorites, loginUser} from '../Redux/userActions'
import {useDispatch, useSelector} from 'react-redux'
import { getErrors } from '../Redux/apiSlice'

export default function useFavorite(id, userEmail = null) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.api.user)
    const [inFavor, setInfavor] = useState(false)

    useEffect(()=>{
        if(userEmail) dispatch(loginUser({email: userEmail}))
    },[userEmail, dispatch])
  
    useEffect(()=>{
      if(user?.favorites.includes(id)) setInfavor(true)
    },[user?.favorites, id])
  
    const favor = () => {
      if(!user) dispatch(getErrors('Must login to add to favorites'))
      else {
        dispatch(addToFavorites({ product_id: id, email: user.email }))
        setInfavor(prev => !prev)
      }
    }
    return [inFavor, favor]
}
