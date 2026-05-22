'use client'

import TripsPage from '@/app/trips/TripsPagex'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function HomePage() {
    
    return (
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
    )
    
}
