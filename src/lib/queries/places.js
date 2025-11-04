import { useQuery } from '@tanstack/react-query'
import { placesWithCoverImages } from '@/store'
import placesRepo from '@/db/repos/places'

export const usePlacesQuery = () => useQuery({
    queryKey: ['places'],
    queryFn: async () => {
        try {
            const data = await placesRepo.findAll()
            
            if (data?.length)
                placesWithCoverImages.setValue(data)
            
            return data
        } catch (e) {
            console.error('queries/places', e)
            throw e
        }
    },
    retry: 0,
})
