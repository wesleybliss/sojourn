import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/trips/TripView'

export default function TripPage() {
    return (
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
    )
}
