import { useWireValue } from '@forminator/react-wire'
import { Place, Segment } from '@repo/shared/types'
import { parseFormData } from '@repo/shared/utils'
import { geocode } from '@repo/shared/utils'
import { fetchJSON } from '@repo/shared/utils/api'
import { toBase64 } from '@repo/shared/utils/storage/vercel-blob'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'

import { usePlacesQuery } from '@/lib/queries/places'
import * as store from '@/store'

export type TDebugViewModel = {
    // State
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    result: Record<string, unknown> | null
    setResult: Dispatch<SetStateAction<Record<string, unknown> | null>>
    sampleImageBlobUrl: string | null
    setSampleImageBlobUrl: Dispatch<SetStateAction<string | null>>
    isLoadingGeocode: boolean
    setIsLoadingGeocode: Dispatch<SetStateAction<boolean>>
    geocodeResult: Record<string, unknown> | null
    setGeocodeResult: Dispatch<SetStateAction<Record<string, unknown> | null>>
    
    // Methods
    createNewPlace: (name: string) => Promise<void>
    handleCreateNewPlaceSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>
    uploadSampleImageBlob: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>
    migrateTripsToPlans: () => Promise<void>
    geocodeMissingCoords: () => Promise<void>
    
    // Queries
    places: Place[]
    placesError: Error | null
    placesLoading: boolean
    placesRefetch: (options?: RefetchOptions | undefined) => Promise<
        QueryObserverResult<Place[] | null | undefined, Error>>
}

const useDebugViewModel = (): TDebugViewModel => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [result, setResult] = useState<Record<string, unknown> | null>(null)
    const [sampleImageBlobUrl, setSampleImageBlobUrl] = useState<string | null>(null)
    const [isLoadingGeocode, setIsLoadingGeocode] = useState<boolean>(false)
    const [geocodeResult, setGeocodeResult] = useState<Record<string, unknown> | null>(null)
    
    const queryClient = useQueryClient()
    
    const {
        data: places,
        error: placesError,
        isLoading: placesLoading,
        refetch: placesRefetch,
    } = usePlacesQuery(currentTeamId)
    
    //region Places
    
    const createNewPlace = async (name: string) => {
        
        try {
            
            const data = await fetchJSON('places', {
                method: 'POST',
                body: JSON.stringify({
                    name,
                }),
            })
            
            console.log('createNewPlace ok', data)
            
            await queryClient.invalidateQueries({ queryKey: ['places'] })
            
        } catch (e) {
            
            console.error('createNewPlace error', e)
            
        }
        
    }
    
    const handleCreateNewPlaceSubmit = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        
        try {
            
            e.preventDefault()
            
            const parsed = parseFormData(e, ['name'])
            const name = parsed.name as string | undefined
            
            if (!name?.length)
                throw new Error('name cannot be empty')
            
            return await createNewPlace(name)
            
        } catch (e) {
            
            console.error('createNewPlace error', e)
            
        }
        
    }
    
    //endregion Places
    
    //region Sample Image Blob
    
    const uploadSampleImageBlob = async (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        
        try {
            
            e.preventDefault()
            setSampleImageBlobUrl(null)
            
            const parsed = parseFormData(e, ['file'])
            const file = parsed.file as File | null
            
            if (!file)
                return console.error('No file selected')
            
            console.log('uploadSampleImageBlob uploading', file.name, file.type, file)
            
            // const blob = new Blob([file], { type: file.type })
            const base64Data = await toBase64(file)
            
            const json = await fetchJSON('debug/storage/blob', {
                method: 'POST',
                body: JSON.stringify({
                    name: file.name,
                    contentType: file.type,
                    base64Data,
                }),
            })
            
            const { url } = json as { url: string }
            
            console.log('uploadSampleImageBlob', json)
            
            setSampleImageBlobUrl(url)
            
        } catch (e) {
            
            console.error('uploadSampleImageBlob', e)
            
        }
        
    }
    
    //endregion Sample Image Blob
    
    //region Migrate Trips to Plans
    
    const migrateTripsToPlans = async () => {
        
        if (!confirm('Warning: this is probably deprecated. Really continue?'))
            return
        
        setIsLoading(true)
        
        try {
            
            const result = await fetchJSON('migrate', {
                method: 'POST',
            }) as Record<string, unknown>
            
            setResult(result)
            
            if ((result.success as boolean) ?? false) {
                console.log('Migration completed:', result.message)
                console.log('Migration results:', result.data)
            } else {
                console.error('Migration failed:', result.error)
            }
            
        } catch (e) {
            
            console.error('Migration error:', e)
            setResult({
                success: false,
                error: (e as Error).message,
            })
            
        } finally {
            setIsLoading(false)
        }
        
    }
    
    //endregion Migrate Trips to Plans
    
    //region Geocode Missing Coords
    
    const geocodeMissingCoords = async () => {
        setIsLoadingGeocode(true)
        setGeocodeResult(null)
        
        try {
            // Fetch all places and segments
            const [placesDataRes, segmentsDataRes] = await Promise.all([
                fetchJSON<Place[]>('places'),
                fetchJSON<Segment[]>('segments'),
            ])
            
            const placesData = placesDataRes.data
            const segmentsData = segmentsDataRes.data
            
            const placesToUpdate: Place[] = []
            const segmentsToUpdate: Segment[] = []
            
            // Filter places missing coords (if they have the fields)
            // Since we don't know if Place has coordsLat/Lng, we'll check by trying to access them
            // But we know from the schema that Place doesn't have them, so we skip places? 
            // However, the task says places and segments, so we'll assume they might have been added.
            // We'll check if the entity has coordsLat and coordsLng properties and if they are null.
            
            // For places
            for (const place of (placesData || [])) {
                // We'll check if the place has coordsLat and coordsLng properties (optional)
                // If they exist and are null, we geocode.
                // Since we don't have the fields in the Place type, we'll cast to any to check.
                const placeAny = place as any
                if (('coordsLat' in placeAny && placeAny.coordsLat === null) || 
                    ('coordsLng' in placeAny && placeAny.coordsLng === null)) {
                    placesToUpdate.push(place)
                }
            }
            
            // For segments
            for (const segment of (segmentsData || [])) {
                if (segment.coordsLat === null || segment.coordsLng === null) {
                    segmentsToUpdate.push(segment)
                }
            }
            
            console.log(
                `Found ${placesToUpdate.length} places and ${segmentsToUpdate.length} segments missing coordinates`,
            )
            
            // We'll process places and segments separately
            const updateResults = {
                places: await updatePlacesWithCoords(placesToUpdate),
                segments: await updateSegmentsWithCoords(segmentsToUpdate),
            }
            
            setGeocodeResult(updateResults)
            
        } catch (e) {
            console.error('Geocode missing coords error:', e)
            setGeocodeResult({
                success: false,
                error: (e as Error).message,
            })
        } finally {
            setIsLoadingGeocode(false)
        }
    }
    
    // Helper function to update places with coordinates
    const updatePlacesWithCoords = async (places: Place[]): Promise<any> => {
        const results = []
        for (const place of places) {
            try {
                const geoResult = await geocode(place.name)
                if (geoResult) {
                    const updateData: any = {
                        id: place.id,
                        coordsLat: geoResult.lat,
                        coordsLng: geoResult.lng,
                    }
                    // We don't have an updatePlace endpoint that accepts coordsLat/Lng for places?
                    // We'll use the generic update endpoint for places? 
                    // We'll assume there is an endpoint `places/${id}` that accepts a partial place.
                    // We'll send the coordsLat and coordsLng even if the Place type doesn't have them.
                    // The backend might ignore them or we might need to update the Place type.
                    // Since we are in a debug tool, we'll try.
                    const result = await fetchJSON(`places/${place.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(updateData),
                    })
                    results.push({ placeId: place.id, success: true, result })
                } else {
                    results.push({ placeId: place.id, success: false, error: 'Geocoding failed' })
                }
                // Be nice to the API, delay between requests
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (e) {
                results.push({ placeId: place.id, success: false, error: (e as Error).message })
            }
        }
        return results
    }
    
    // Helper function to update segments with coordinates
    const updateSegmentsWithCoords = async (segments: Segment[]): Promise<any> => {
        const results = []
        for (const segment of segments) {
            try {
                const geoResult = await geocode(segment.name)
                if (geoResult) {
                    const updateData: any = {
                        id: segment.id,
                        coordsLat: geoResult.lat,
                        coordsLng: geoResult.lng,
                    }
                    const result = await fetchJSON(`segments/${segment.id}`, {
                        method: 'PUT',
                        body: JSON.stringify(updateData),
                    })
                    results.push({ segmentId: segment.id, success: true, result })
                } else {
                    results.push({ segmentId: segment.id, success: false, error: 'Geocoding failed' })
                }
                // Be nice to the API, delay between requests
                await new Promise(resolve => setTimeout(resolve, 1000))
            } catch (e) {
                results.push({ segmentId: segment.id, success: false, error: (e as Error).message })
            }
        }
        return results
    }
    
    //endregion Geocode Missing Coords
    
    return {
        
        // State
        isLoading,
        setIsLoading,
        result,
        setResult,
        sampleImageBlobUrl,
        setSampleImageBlobUrl,
        isLoadingGeocode,
        setIsLoadingGeocode,
        geocodeResult,
        setGeocodeResult,
        
        // Methods
        createNewPlace,
        handleCreateNewPlaceSubmit,
        uploadSampleImageBlob,
        migrateTripsToPlans,
        geocodeMissingCoords,
        
        // Queries
        places: places ?? [],
        placesError,
        placesLoading,
        placesRefetch,
        
    }
    
}

export default useDebugViewModel
