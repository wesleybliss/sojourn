import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'

export default async function TripPage(/* { params } */) {
    
    // const { tripId } = await params
    
    return (
        
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
        
    )
    
}
