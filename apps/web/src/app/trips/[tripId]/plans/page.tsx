import { redirect } from 'next/navigation'

import ProtectedRoute from '@/components/ProtectedRoute'
import TripView from '@/components/TripView'
import { ID } from '@repo/shared/types'

export default async function Plans({
    params,
}: {
    params: Promise<{
        tripId: ID
    }>
}) {
    
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
