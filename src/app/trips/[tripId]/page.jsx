'use server'
import { getTripDetails } from '@/lib/api/serverFunctions'
import TripCard from '@/components/TripCard'

export default async function TripDetailPage({ params }) {
    const result = await getTripDetails(params.tripId)
    if (!result.success) {
        throw new Error(result.error || 'Failed to load trip')
    }
    return <TripCard trip={result.data} />
}
