import { useQuery } from '@tanstack/react-query'
import TripsPageClient from './TripsPageClient'

export default async function TripsPage() {
    
    const {
        data: trips,
        error: tripsError,
        isLoading: tripsIsLoading,
    } = useQuery({
        queryKey: ['trips'],
        queryFn: () => fetch('/api/trips'),
        enabled: true,
        retry: 0,
    })
    
    return <TripsPageClient initialTrips={trips} />
}
