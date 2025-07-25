'use server'

import { getTrips } from '@/lib/api/serverFunctions'
import TripsList from '@/components/TripsList'

export default async function HomePage() {
    
    const result = await getTrips()
    
    if (!result.success)
        throw new Error(result.error || 'Failed to load trips')
    
    return <TripsList trips={result.data} />
    
}
