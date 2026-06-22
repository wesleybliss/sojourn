import { ApiResult, DeletePlacesBody, Place, PlaceInsert, PlaceUpdate } from '@repo/shared/types'
import { ID } from '@repo/shared/types/data.types'
import { fetchJSON } from '@repo/shared/utils/api'
import { keepPreviousData, useMutation, UseMutationResult, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuth } from '@/components/providers/AuthProvider'
import { placesWithCoverImages } from '@/store'

export type UpdatePlaceMutationBody = PlaceUpdate & { id: ID }

export type ShufflePlaceCoverPhotoBody = {
    topic: string
}

export const usePlacesQuery = (teamId: ID | null, opts = {}) => {
    
    const { firebaseUser } = useAuth()
    
    return useQuery({
        queryKey: ['places'],
        queryFn: async () => {
            
            try {
                const result = await fetchJSON<Place[]>(`${teamId}/places`)
                
                if (result?.data?.length)
                    placesWithCoverImages.setValue(result.data)
                
                return result.data
                
            } catch (e) {
                
                console.error('queries/places', e)
                throw e
                
            }
            
        },
        enabled: !!firebaseUser,
        placeholderData: keepPreviousData,
        retry: 0,
        ...opts,
    })
    
}

export const useUpdatePlace = (): UseMutationResult<
    ApiResult<Place | null>,
    Error,
    UpdatePlaceMutationBody,
    unknown
> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ id, teamId, ...placeData }: UpdatePlaceMutationBody) => {
            
            if (!id)
                throw new Error('useUpdatePlace: id is required')
            
            if (!teamId)
                throw new Error('useUpdatePlace: teamId is required')
            
            return fetchJSON(`${teamId}/places/${id}`, {
                method: 'PUT',
                body: JSON.stringify(placeData),
            })
            
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] })
        },
    })
    
}

export const useCreatePlace = (teamId: ID | null): UseMutationResult<
    ApiResult<Place | null>,
    Error,
    PlaceInsert,
    unknown
> => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async (placeData: PlaceInsert) => {
            return fetchJSON(`${teamId}/places`, {
                method: 'POST',
                body: JSON.stringify(placeData),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['places'] })
        },
    })
    
}

export const useDeletePlaces = (teamId: ID | null) => {
    
    const queryClient = useQueryClient()
    
    return useMutation({
        mutationFn: async ({ placeIds }: DeletePlacesBody) => {
            return fetchJSON<Place>(`${teamId}/places`, {
                method: 'DELETE',
                body: JSON.stringify({ placeIds }),
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
            return fetchJSON<string | null>('utils/random-photo', {
                method: 'POST',
                body: JSON.stringify({ topic }),
            })
        },
        onSuccess: (result: ApiResult<string | null>) => {
            console.log('useShufflePlaceCoverPhoto', result)
        },
    })
    
}
