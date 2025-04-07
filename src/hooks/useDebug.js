import { useEffect } from 'react'
import * as store from '@/store'
import * as actions from '@/actions'
import * as constants from '@/constants'

const useDebug = () => {
    
    useEffect(() => {
        
        window.app = {}
        
        window.app.store = store
        window.app.actions = actions
        window.app.constants = constants
        
    }, [])
    
}

export default useDebug
