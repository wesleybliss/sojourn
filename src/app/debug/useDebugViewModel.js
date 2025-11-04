import { useState } from 'react'
import { parseFormData } from '@/lib/utils'
import { toBase64 } from '@/lib/storage/vercel-blob'
import { usePlacesQuery } from '@/lib/queries/places'
import { useQueryClient } from '@tanstack/react-query'
import useOnlineStatus from '@/hooks/useOnlineStatus'
import { toast } from 'sonner'

const useDebugViewModel = () => {
    
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [sampleImageBlobUrl, setSampleImageBlobUrl] = useState(null)
    
    const queryClient = useQueryClient()
    const isOnline = useOnlineStatus()
    
    const {
        data: places,
        error: placesError,
        isLoading: placesLoading,
        refetch: placesRefetch,
    } = usePlacesQuery()
    
    //region Places
    
    const createNewPlace = async name => {
        
        try {
            
            const res = await fetch('/api/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                }),
            })
            
            if (!res.ok)
                return console.error('createNewPlace error', res)
            
            const data = await res.json()
            
            console.log('createNewPlace ok', data)
            
            await queryClient.invalidateQueries(['places'])
            
        } catch (e) {
            
            console.error('createNewPlace error', e)
            
        }
        
    }
    
    const handleCreateNewPlaceSubmit = async e => {
        
        try {
            
            e.preventDefault()
            
            const { name } = parseFormData(e, ['name'])
            
            return await createNewPlace(name)
            
        } catch (e) {
            
            console.error('createNewPlace error', e)
            
        }
        
    }
    
    //endregion Places
    
    //region Sample Image Blob
    
    const uploadSampleImageBlob = async e => {
        
        try {
            
            e.preventDefault()
            setSampleImageBlobUrl(null)
            
            if (!isOnline) {
                toast.error('File upload requires an internet connection')
                return
            }
            
            const { file } = parseFormData(e, ['file'])
            
            if (!file)
                return console.error('No file selected')
            
            console.log('uploadSampleImageBlob uploading', file.name, file.type, file)
            
            // const blob = new Blob([file], { type: file.type })
            const base64Data = await toBase64(file)
            
            const res = await fetch('/api/debug/storage/blob', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: file.name,
                    contentType: file.type,
                    base64Data,
                }),
            })
            
            if (!res.ok)
                throw new Error('Failed to upload file', res)
            
            const json = await res.json()
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
            
            const response = await fetch('/api/migrate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            const result = await response.json()
            
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
                error: e.message,
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
