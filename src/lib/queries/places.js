import { useQuery } from '@tanstack/react-query'
import { placesWithCoverImages } from '@/store'

export const usePlacesQuery = () => useQuery({
    queryKey: ['places'],
    queryFn: async () => {
        
        try {
            
            const res = await fetch('/api/places')
            const { data } = await res.json()
            
            if (data?.length)
                placesWithCoverImages.setValue(data)
            
            return data
            
        } catch (e) {
            
            console.error('queries/places', e)
            throw e
            
        }
        
    },
    keepPreviousData: true,
    retry: 0,
})
