import { redirect } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import TripDetail from '@/components/TripDetail'

export default async function Plans({ params }) {
    
    const { tripId, planId } = await params
    
    if (!tripId) {
        redirect('/trips')
        return null
    }
    
    return (
        <ProtectedRoute>
            <TripDetail tripId={tripId} planId={planId} />
        </ProtectedRoute>
    )
    
}
