'use client'

import TripsPage from '@/app/trips/TripsPage.jsx'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function HomePage() {
    
    return (
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
    )
    
}
