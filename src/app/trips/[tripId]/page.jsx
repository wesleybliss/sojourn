
import TripDetailClient from './TripDetailClient'

export default async function TripDetailPage({ params }) {
    
    const { tripId } = await params
    
    return <TripDetailClient tripId={tripId} />
}
