'use client'

import { useQuery } from '@tanstack/react-query'
import TripsPage from '@/app/trips/TripsPage.jsx'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function HomePage() {
    
    return (
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
    )
    
}
