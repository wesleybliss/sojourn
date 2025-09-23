import { useState, useCallback } from 'react'
import { useWireState } from '@forminator/react-wire'
import * as store from '@/store'

const UIOptionsViewModel = () => {
    
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
        
    }
    
}

export default UIOptionsViewModel
