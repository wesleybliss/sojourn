import { useWireValue } from '@forminator/react-wire'
import { useEffect, useState } from 'react'

import * as store from '@/store'

const useDarkMode = () => {
    
    const theme = useWireValue(store.theme)
    
    const [isDarkMode, setIsDarkMode] = useState(false)
    
    useEffect(() => {
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        setIsDarkMode(mediaQuery.matches)
        
        const handler = e => setIsDarkMode(e.matches)
        mediaQuery.addEventListener('change', handler)
        
        return () => mediaQuery.removeEventListener('change', handler)
        
    }, [theme])
    
    return isDarkMode
    
}

export default useDarkMode
