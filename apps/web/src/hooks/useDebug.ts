import * as constants from '@repo/shared/constants'
import { useEffect } from 'react'

import * as store from '@/store'

const useDebug = () => {
    
    useEffect(() => {
        
        window.app = {}
        
        window.app.store = store
        // window.app.actions = actions
        window.app.constants = constants
        
    }, [])
    
}

export default useDebug
