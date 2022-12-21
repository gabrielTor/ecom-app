import { useState, useEffect } from "react"

const getLocalValue = (key, initValue = []) => {

    if (typeof window === 'undefined') return initValue

    const localValue = JSON.parse(sessionStorage.getItem(key))
    if (localValue) return localValue

    if (initValue instanceof Function) return initValue()

    return initValue
}

const useSessionStorage = (key, initValue) => {
    const [value, setValue] = useState(() => {
        return getLocalValue(key, initValue)
    })

    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}

export default useSessionStorage 