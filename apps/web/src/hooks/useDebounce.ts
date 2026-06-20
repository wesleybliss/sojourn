import { useEffect, useState } from 'react'

const useDebounce = <T>(
    value: T,
    delay: number = 300,
): T => {
    
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    
    useEffect(() => {
        
        const t = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)
        
        return () => clearTimeout(t)
        
    }, [value, delay])
    
    return debouncedValue
    
}

export default useDebounce
