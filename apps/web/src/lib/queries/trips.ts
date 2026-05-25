import { fetchJSON } from '@repo/shared/utils/api'
import { useQuery } from '@tanstack/react-query'
import { keepPreviousData } from '@tanstack/react-query'

import * as store from '@/store'

export const useTripsQuery = (opts = {}) => useQuery({
    queryKey: ['trips'],
    queryFn: () => fetchJSON('/api/trips')
        .then(it => {
            store.trips.setValue(it.data)
            return it
        }),
    enabled: true,
    placeholderData: keepPreviousData,
    retry: 3,
    ...opts,
})
