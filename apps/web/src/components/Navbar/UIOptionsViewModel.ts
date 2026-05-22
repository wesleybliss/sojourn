import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useWireState } from '@forminator/react-wire'
import * as store from '@/store'
import { useRouter } from 'next/navigation'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

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
    router: AppRouterInstance
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
