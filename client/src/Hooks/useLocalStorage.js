import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../Redux/apiSlice"

const getLocalValue = (key, initValue = []) => {

    if (typeof window === 'undefined') return initValue

    const localValue = JSON.parse(localStorage.getItem(key))
    if (localValue) return localValue

    if (initValue instanceof Function) return initValue()

    return initValue
}

const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue)
    })
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
        if(key === 'cart') dispatch(addToCart(value))
    }, [key, value, dispatch])

    return [value, setValue]
}

export default useLocalStorage 