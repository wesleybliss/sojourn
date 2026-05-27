import { ApiResult, Place } from '@repo/shared/types'
import { UpdatePlaceBody } from '@repo/shared/types/mutations'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'

import { placesWithCoverImages } from '@/store'

type ShufflePlaceCoverPhotoBody = {
    topic: string
}

type ExtendedUpdatePlaceBody = UpdatePlaceBody & {
    name?: string | null
    coverImageUrl?: string | null
    focus?: string | null
    quickTip?: string | null
    personalNotes?: string | null
    region?: string | null
    travelWindow?: string | null
    isBookmarked?: boolean
}

type CreatePlaceBody = {
    name: string
    focus?: string
    quickTip?: string
    personalNotes?: string
    region?: string
    travelWindow?: string
    isBookmarked?: boolean
}

export const usePlacesQuery = () => useQuery({
    queryKey: ['places'],
    queryFn: async () => {
        
        try {
            
            const result = await fetchJSON<Place[]>('/api/places')
            
            if (result?.data?.length)
                placesWithCoverImages.setValue(result.data)
            
            return result.data
            
        } catch (e) {
            
            console.error('queries/places', e)
            throw e
            
        }
        
    },
    placeholderData: keepPreviousData,
    retry: 0,
})

export const useUpdatePlace = (): UseMutationResult<
    ApiResult<Place | null>,
    Error,
    ExtendedUpdatePlaceBody,
    unknown
> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ id, ...placeData }: ExtendedUpdatePlaceBody) => {
            if (!id)
                throw new Error('useUpdatePlace: id is required')
            
            return fetchJSON(`/api/places/${id}`, {
                method: 'PUT',
                body: JSON.stringify(placeData),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] })
        },
    })
    
}

export const useCreatePlace = (): UseMutationResult<
    ApiResult<Place | null>,
    Error,
    CreatePlaceBody,
    unknown
> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (placeData: CreatePlaceBody) => {
            return fetchJSON('/api/places', {
                method: 'POST',
                body: JSON.stringify(placeData),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] })
        },
    })
    
}

export const useShufflePlaceCoverPhoto = (): UseMutationResult<
    ApiResult<string | null>,
    Error,
    ShufflePlaceCoverPhotoBody,
    unknown
> => {
    
    return useMutation({
        mutationFn: async ({ topic }: ShufflePlaceCoverPhotoBody) => {
            console.log('useShufflePlaceCoverPhoto.mutate', { topic })
            return fetchJSON<string | null>('/api/utils/random-photo', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
        },
        onSuccess: (result: ApiResult<string | null>) => {
            console.log('useShufflePlaceCoverPhoto', result)
        },
    })
    
}
