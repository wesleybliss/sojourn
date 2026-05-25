import { redirect } from 'next/navigation'

import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'

export default async function PlanDetail({ params }) {
    
    const { tripId, planId } = await params
    
    if (!tripId)
        redirect('/trips')
    
    if (!planId)
        redirect(`/trips/${tripId}`)
    
    return (
        
        <ProtectedRoute>
            <TripView />
        </ProtectedRoute>
        
    )
    
}
