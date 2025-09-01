import { redirect } from 'next/navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import TripDetail from '@/components/TripDetail'

export default async function PlanDetail({ params }) {
    
    const { tripId, planId } = await params
    
    if (!tripId)
        redirect('/trips')
    
    return (
        
        <ProtectedRoute>
            <TripDetail tripId={tripId} planId={planId} />
        </ProtectedRoute>
        
    )
    
}
