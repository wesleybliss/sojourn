import { useQuery } from '@tanstack/react-query'

export default tripId => useQuery({
    queryKey: ['trip'],
    queryFn: async () => {
        
        try {
            const res = await fetch(`/api/trips/${tripId}?withDetails=true`)
            const json = await res.json()
            
            return json.data
        } catch (e) {
            console.error('queries/trip', e)
            throw e
        }
        
    },
    enabled: !!tripId,
    retry: 0,
})
