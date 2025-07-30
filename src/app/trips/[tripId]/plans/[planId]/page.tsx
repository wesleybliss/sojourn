import { redirect } from 'next/navigation'
import TripDetail from '@/components/TripDetail'

export default async function PlanDetail({ params }) {
    
    const { tripId, planId } = await params
    
    if (!tripId)
        redirect('/trips')
    
    return <TripDetail tripId={tripId} planId={planId} />
    
}
