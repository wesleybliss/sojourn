import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { placesWithCoverImages } from '@/store'
import { fetchJSON } from '@/lib/api'

export const usePlacesQuery = () => useQuery({
    queryKey: ['places'],
    queryFn: async () => {
        
        try {
            
            const { data } = await fetchJSON('/api/places')
            
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

export const useUpdatePlace = () => {
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ placeId, ...placeData }) => {
            if (!placeId)
                throw new Error('useUpdatePlace: placeId is required')
            
            return fetchJSON(`/api/places/${placeId}`, {
                method: 'PUT',
                body: JSON.stringify(placeData),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['places'])
        },
    })
}

export const useShufflePlaceCoverPhoto = () => {
    return useMutation({
        mutationFn: async ({ topic }) => {
            console.log('useShufflePlaceCoverPhoto.mutate', { topic })
            return fetchJSON('/api/utils/random-photo', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
        },
        onSuccess: data => {
            console.log('useShufflePlaceCoverPhoto', data)
        },
    })
}
