import TripsPage from '@/app/trips/TripsPage'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function HomePage() {
    
    return (
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
    )
    
}
