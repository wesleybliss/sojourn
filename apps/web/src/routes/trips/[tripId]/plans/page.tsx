import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'

export default function Plans() {
    return (
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
    )
}
