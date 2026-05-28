import ProtectedRoute from '@/components/ProtectedRoute'

import TripsPage from './TripsPage'

export default function TripsRoute() {
    
    return (
        
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
        
    )
    
}
