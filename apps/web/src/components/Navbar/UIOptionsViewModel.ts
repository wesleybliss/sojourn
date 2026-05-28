import { useWireState } from '@forminator/react-wire'
import { Dispatch, SetStateAction,useCallback, useState } from 'react'

import { RouterLike, useRouter } from '@/lib/router'
import * as store from '@/store'

export type TUIOptionsViewModel = {
    // State
    cascadeEnabled: boolean
    setCascadeEnabled: Dispatch<SetStateAction<boolean>>
    toggleCascadeEnabled: () => void
    
    // Global State
    showMap: boolean
    setShowMap: Dispatch<SetStateAction<boolean>>
    toggleShowMap: () => void
    
    // Hooks
    router: RouterLike
}

const UIOptionsViewModel = (): TUIOptionsViewModel => {
    
    const router = useRouter()
    
    const [cascadeEnabled, setCascadeEnabled] = useState(false)
    
    const [showMap, setShowMap] = useWireState(store.showMap)
    
    const toggleCascadeEnabled = useCallback(
        () => setCascadeEnabled(!cascadeEnabled),
        [setCascadeEnabled, cascadeEnabled])
    
    const toggleShowMap = useCallback(
        () => setShowMap(!showMap),
        [setShowMap, showMap])
    
    return {
        
        // State
        cascadeEnabled,
        setCascadeEnabled,
        toggleCascadeEnabled,
        
        // Global State
        showMap,
        setShowMap,
        toggleShowMap,
        
        // Hooks
        router,
        
    }
    
}

export default UIOptionsViewModel
