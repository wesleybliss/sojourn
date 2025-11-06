import { useQuery } from '@tanstack/react-query'
import * as store from '@/store'
import tripsRepo from '@/db/repos/trips'

export const useTripsQuery = (opts = {}) => {
    const query = useQuery({
        queryKey: ['trips'],
        queryFn: async () => {
            const trips = await tripsRepo.findAll()
            store.trips.setValue(trips)
            return { data: trips, success: true, count: trips.length }
        },
        enabled: true,
        retry: false,
        ...opts,
    })
    
    return query
}
