'use client'

import TripsPage from './TripsPage.jsx'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function TripsRoute() {
    
    return (
        
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
        
    )
    
}
