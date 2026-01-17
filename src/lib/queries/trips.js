import { useQuery } from '@tanstack/react-query'
import * as store from '@/store'
import { fetchJSON } from '@/lib/api'

export const useTripsQuery = (opts = {}) => useQuery({
    queryKey: ['trips'],
    queryFn: () => fetchJSON('/api/trips')
        .then(it => {
            store.trips.setValue(it.data)
            return it
        }),
    enabled: true,
    keepPreviousData: true,
    retry: 3,
    ...opts,
})
