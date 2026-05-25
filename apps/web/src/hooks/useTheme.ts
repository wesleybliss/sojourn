import { useWireValue } from '@forminator/react-wire'
import { themes } from '@repo/shared/constants'
import { useEffect } from 'react'

import * as store from '@/store/index'

const useTheme = () => {
    
    const theme = useWireValue(store.theme)
    
    const applyTheme = () => {
        
        themes.forEach(it => {
            
            
            if (document.documentElement.classList.contains(it))
                
                document.documentElement.classList.remove(it)
        })
        
        
        document.documentElement.classList.add(theme)
        
    }
    
    useEffect(applyTheme, [theme])
    
}

export default useTheme
