'use client'

import TripsPage from './TripsPagex'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function TripsRoute() {
    
    return (
        
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
        
    )
    
}
