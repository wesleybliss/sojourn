import { useQuery } from '@tanstack/react-query'
import * as store from '@/store'
import tripsRepo from '@/db/repos/trips'
import { syncDb } from '@/db/clientDb'
import { useEffect } from 'react'

export const useTripsQuery = (opts = {}) => {
    const query = useQuery({
        queryKey: ['trips'],
        queryFn: async () => {
            // Get user ID from NextAuth session (client-side)
            // For now, we'll need to handle this - might need to pass userId as param
            // or get from session context
            const trips = await tripsRepo.findAll()
            
            store.trips.setValue(trips)
            return { data: trips, success: true, count: trips.length }
        },
        enabled: true,
        retry: 3,
        ...opts,
    })
    
    // Trigger initial sync when query first runs
    useEffect(() => {
        if (query.isSuccess) {
            syncDb().catch(err => console.error('Background sync failed:', err))
        }
    }, [query.isSuccess])
    
    return query
}
