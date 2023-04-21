import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useAuth0 } from "@auth0/auth0-react";
import { loginUser } from '../Redux/userActions'
/* eslint-disable */

export default function useFetch(action, parameter = null, auth) {

    const dispatch = useDispatch()
    const { user, isAuthenticated } = useAuth0()

    useEffect(() => {
        if (!action) return
        dispatch(action(parameter))
    }, [dispatch, parameter])

    useEffect(() => {
        if (isAuthenticated && user && auth) {
            dispatch(loginUser(user.email))
        }
    }, [dispatch, user, isAuthenticated])
}
