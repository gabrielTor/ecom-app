import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function useFetch(action, parameter = null) {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(action(parameter))
    }, [dispatch, parameter])
}
