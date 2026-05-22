import { redirect } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'

export default async function Plans({ params }) {
    
    const { tripId } = await params
    
    if (!tripId) {
        redirect('/trips')
        return null
    }
    
    return (
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
    )
    
}
