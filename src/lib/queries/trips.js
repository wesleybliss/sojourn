import { useQuery } from '@tanstack/react-query'

export const useTripsQuery = (opts = {}) => useQuery({
    queryKey: ['trips'],
    queryFn: () => fetch('/api/trips')
        .then(it => it.json()),
    enabled: true,
    retry: 3,
    ...opts,
})
