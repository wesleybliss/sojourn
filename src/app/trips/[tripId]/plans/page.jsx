import { redirect } from 'next/navigation'
import TripDetail from '@/components/TripDetail/TripDetail.jsx'

export default async function Plans({ params }) {
    
    const { tripId, planId } = await params
    
    if (!tripId) {
        redirect('/trips')
        return null
    }
    
    return <TripDetail tripId={tripId} planId={planId} />
    
}
