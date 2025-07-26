import { useQuery } from '@tanstack/react-query'
import TripsList from '@/components/TripsList'

export default async function HomePage() {
    
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
    
    return <TripsList trips={trips} />
    
}
