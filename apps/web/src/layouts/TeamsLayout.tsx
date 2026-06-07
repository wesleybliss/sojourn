import { Outlet } from 'react-router'

import ProtectedRoute from '@/components/ProtectedRoute'

const TeamsLayout = () => {
    
    return (
        
        <ProtectedRoute>
            <Outlet/>
        </ProtectedRoute>
        
    )
    
}

export default TeamsLayout
