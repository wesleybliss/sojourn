import { useQuery } from '@tanstack/react-query'
import * as store from '@/store'

export const useTripsQuery = (opts = {}) => useQuery({
    queryKey: ['trips'],
    queryFn: () => fetch('/api/trips')
        .then(it => it.json())
        .then(it => {
            store.trips.setValue(it.data)
            return it
        }),
    enabled: true,
    keepPreviousData: true,
    retry: 3,
    ...opts,
})
