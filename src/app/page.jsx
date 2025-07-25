import { getAllTrips } from '@/lib/api/tripQueries.js'
import TripsList from '@/components/TripsList'

export default async function HomePage() {
    
    const trips = await getAllTrips()
    
    return <TripsList trips={trips} />
    
}
