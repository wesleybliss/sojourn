import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { parseFormData } from '@repo/shared/utils'
import { toBase64 } from '@repo/shared/utils/storage/vercel-blob'
import { usePlacesQuery } from '@/lib/queries/places'
import { QueryObserverResult, RefetchOptions, useQueryClient } from '@tanstack/react-query'
import { fetchJSON } from '@repo/shared/utils/api'
import { Place } from '@repo/shared/types'

export type TDebugViewModel = {
    // State
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    result: Record<string, unknown> | null
    setResult: Dispatch<SetStateAction<Record<string, unknown> | null>>
    sampleImageBlobUrl: string | null
    setSampleImageBlobUrl: Dispatch<SetStateAction<string | null>>
    
    // Methods
    createNewPlace: (name: string) => Promise<void>
    handleCreateNewPlaceSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>
    uploadSampleImageBlob: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => Promise<void>
    migrateTripsToPlans: () => Promise<void>
    
    // Queries
    places: Place[]
    placesError: Error | null
    placesLoading: boolean
    placesRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<any, Error>>
}

const useDebugViewModel = (): TDebugViewModel => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [result, setResult] = useState<Record<string, unknown> | null>(null)
    const [sampleImageBlobUrl, setSampleImageBlobUrl] = useState<string | null>(null)
    
    const queryClient = useQueryClient()
    
    const {
        data: places,
        error: placesError,
        isLoading: placesLoading,
        refetch: placesRefetch,
    } = usePlacesQuery()
    
    //region Places
    
    const createNewPlace = async (name: string) => {
        
        try {
            
            const data = await fetchJSON('/api/places', {
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
            
            const json = await fetchJSON('/api/debug/storage/blob', {
                method: 'POST',
                body: JSON.stringify({
                    name: file.name,
                    contentType: file.type,
                    base64Data,
                }),
            })
            
            const { url } = json
            
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
            
            const result = await fetchJSON('/api/migrate', {
                method: 'POST',
            })
            
            setResult(result)
            
            if (result.success) {
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
    
    return {
        
        // State
        isLoading,
        setIsLoading,
        result,
        setResult,
        sampleImageBlobUrl,
        setSampleImageBlobUrl,
        
        // Methods
        createNewPlace,
        handleCreateNewPlaceSubmit,
        uploadSampleImageBlob,
        migrateTripsToPlans,
        
        // Queries
        places,
        placesError,
        placesLoading,
        placesRefetch,
        
    }
    
}

export default useDebugViewModel
