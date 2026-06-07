import { Outlet } from 'react-router'

import ProtectedRoute from '@/components/ProtectedRoute'
import { useTeamsQuery } from '@/lib/queries/teams'

const TeamsLayout = () => {
    
    const {
        data: teams,
        isLoading,
        error,
    } = useTeamsQuery()
    
    console.log('@teams', teams)
    
    return (
        
        <ProtectedRoute>
            <Outlet/>
        </ProtectedRoute>
        
    )
    
}

export default TeamsLayout
