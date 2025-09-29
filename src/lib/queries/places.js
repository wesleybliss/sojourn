import { useQuery } from '@tanstack/react-query'

export const usePlacesQuery = () => useQuery({
    queryKey: ['places'],
    queryFn: async () => {
        
        try {
            
            const res = await fetch('/api/places')
            const { data } = await res.json()
            
            return data
            
        } catch (e) {
            
            console.error('queries/places', e)
            throw e
            
        }
        
    },
    keepPreviousData: true,
    retry: 0,
})
