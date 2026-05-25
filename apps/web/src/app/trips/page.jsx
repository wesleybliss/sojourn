'use client'

import ProtectedRoute from '@/components/ProtectedRoute'

import TripsPage from './TripsPagex'

export default function TripsRoute() {
    
    return (
        
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
        
    )
    
}
