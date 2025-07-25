import { getAllTrips } from '@/lib/api/tripQueries.js'
import TripsPageClient from './TripsPageClient'

export default async function TripsPage() {
    const trips = await getAllTrips()
    
    return <TripsPageClient initialTrips={trips} />
}
