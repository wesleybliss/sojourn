import { redirect } from 'next/navigation'

import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'
import { ID } from '@repo/shared/types'

export default async function PlanDetail({
    params,
}: {
    params: Promise<{
        tripId: ID
        planId: ID
    }>
}) {
    
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
