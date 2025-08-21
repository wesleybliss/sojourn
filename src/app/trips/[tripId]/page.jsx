import TripDetail from '@/components/TripDetail'
import ProtectedRoute from '@/components/ProtectedRoute'

export default async function TripPage({ params }) {
    
    const { tripId } = await params
    
    return (
        
        <ProtectedRoute>
            <TripDetail tripId={tripId} />
        </ProtectedRoute>
        
    )
    
}
