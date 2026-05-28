import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'

export default function PlanDetail() {
    return (
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
    )
}
