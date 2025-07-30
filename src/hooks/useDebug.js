import { useEffect } from 'react'
import * as store from '@/store/index.js'
import * as constants from '@/constants.js'

const useDebug = () => {
    
    useEffect(() => {
        
        window.app = {}
        
        window.app.store = store
        // window.app.actions = actions
        window.app.constants = constants
        
    }, [])
    
}

export default useDebug
