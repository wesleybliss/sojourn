import { getTripWithDetails } from '@/lib/api/tripQueries.js'
import TripDetailClient from './TripDetailClient'

export default async function TripDetailPage({ params }) {
    
    const tripId = await params.tripId
    const trip = await getTripWithDetails(parseInt(tripId, 10))
    
    if (!trip) {
        throw new Error('Trip not found')
    }
    
    return <TripDetailClient initialTrip={trip} />
}
