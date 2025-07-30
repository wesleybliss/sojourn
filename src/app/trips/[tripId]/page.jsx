import TripDetail from '@/components/TripDetail'

export default async function TripDetailPage({ params }) {
    
    const { tripId } = await params
    
    return <TripDetail tripId={tripId} />
    
}
