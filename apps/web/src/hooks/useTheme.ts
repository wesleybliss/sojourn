import { useEffect } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store/index'
import { themes } from '@/constants'

const useTheme = () => {
    
    const theme = useWireValue(store.theme)
    
    const applyTheme = () => {
        
        themes.forEach(it => {
            
            // eslint-disable-next-line no-restricted-globals
            if (document.documentElement.classList.contains(it))
                // eslint-disable-next-line no-restricted-globals
                document.documentElement.classList.remove(it)
        })
        
        // eslint-disable-next-line no-restricted-globals
        document.documentElement.classList.add(theme)
        
    }
    
    useEffect(applyTheme, [theme])
    
}

export default useTheme
