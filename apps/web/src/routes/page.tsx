import ProtectedRoute from '@/components/ProtectedRoute'
import TripsPage from '@/routes/trips/TripsPage'

export default function HomePage() {
    
    return (
        <ProtectedRoute>
            <TripsPage />
        </ProtectedRoute>
    )
    
}
