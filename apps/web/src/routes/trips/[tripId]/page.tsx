import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'

export default function TripPage() {
    return (
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
    )
}
