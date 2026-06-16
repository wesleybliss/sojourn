import { useWireValue } from '@forminator/react-wire'
import { useEffect } from 'react'
import { Outlet } from 'react-router'

import ProtectedRoute from '@/components/ProtectedRoute'
import * as store from '@/store'

const TeamsProtectedLayout = () => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    
    useEffect(() => {
        
        // This should never happen, but just in case,
        // safeguard this route & children to ensure a team is selected
        const t = setTimeout(() => {
            if (!currentTeamId)
                window.location.replace('/')
        }, 1000)
        
        return () => clearTimeout(t)
        
    }, [currentTeamId])
    
    if (!currentTeamId) return (
        <div>Loading3...</div>
    )
    
    return (
        
        <ProtectedRoute>
            <Outlet />
        </ProtectedRoute>
        
    )
    
}

export default TeamsProtectedLayout
