import { useWireState, useWireValue } from '@forminator/react-wire'
import { ApiResult, Place, PlaceNoteSelect } from '@repo/shared/types'
import { UseMutationResult } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { toast } from 'sonner'

import useUpdatePlaceForm, { UpdatePlaceForm } from '@/hooks/forms/useUpdatePlaceForm'
import { UpdatePlaceMutationBody, useUpdatePlace } from '@/lib/queries/places'
import * as store from '@/store'

export type TEditPlaceDialogViewModel = {
    // Global State
    currentTeamId: number | null
    updatePlaceDialogPlace: Place | null
    setUpdatePlaceDialogPlace: Dispatch<SetStateAction<Place | null>>
    
    // State
    isUpdatingPlace: boolean
    setIsUpdatingPlace: Dispatch<SetStateAction<boolean>>
    
    // Mutations
    updatePlaceMutation: UseMutationResult<ApiResult<Place | null>, Error, UpdatePlaceMutationBody, unknown>
    
    // Methods
    onCancel: () => void
    updatePlace: (value: UpdatePlaceForm) => Promise<void>
    
    // Forms
    form: ReturnType<typeof useUpdatePlaceForm>
}

const EditPlaceDialogViewModel = (): TEditPlaceDialogViewModel => {
    
    const currentTeamId = useWireValue(store.currentTeamId)
    const [updatePlaceDialogPlace, setUpdatePlaceDialogPlace] = useWireState(store.updatePlaceDialogPlace)
    
    const [isUpdatingPlace, setIsUpdatingPlace] = useState(false)
    
    const updatePlaceMutation = useUpdatePlace()
    
    const onCancel = () => setUpdatePlaceDialogPlace(null)
    
    const updatePlace = useCallback(async (value: UpdatePlaceForm) => {
        
        if (!currentTeamId || !updatePlaceDialogPlace?.id) return
        
        setIsUpdatingPlace(true)
        
        try {
            
            const payload = {
                ...value,
                id: updatePlaceDialogPlace.id,
                teamId: currentTeamId,
                // `placeNoteFormSchema` omits auto-managed `createdAt` / `updatedAt`
                // (Postgres applies them via `defaultNow()` per row, and the API
                // handler lets Drizzle fill them in). The form value carries `id`
                // for existing notes (the API uses it to branch insert vs update)
                // and `placeId` is injected here. The cast below matches because
                // the schema's inferred type is a subset of `PlaceNoteSelect` —
                // missing date fields are the only delta.
                notes: value.notes.map(it => ({
                    ...it,
                    placeId: it.placeId ?? updatePlaceDialogPlace.id,
                })) as PlaceNoteSelect[],
            }
            console.log('@todo update place value', value)
            console.log('@todo update place payload', payload)
            await updatePlaceMutation.mutateAsync(payload)
            
            setUpdatePlaceDialogPlace(null)
            
        } catch (e) {
            
            console.error('Error updating place:', e)
            toast.error('Failed to update place. Please try again.')
            
        }
        
        setIsUpdatingPlace(false)
        
    }, [currentTeamId, updatePlaceMutation, updatePlaceDialogPlace])
    
    const form = useUpdatePlaceForm(updatePlaceDialogPlace, updatePlace)
    
    return {
        
        // Global State
        currentTeamId,
        updatePlaceDialogPlace,
        setUpdatePlaceDialogPlace,
        
        // State
        isUpdatingPlace,
        setIsUpdatingPlace,
        
        // Mutations
        updatePlaceMutation,
        
        // Methods
        onCancel,
        updatePlace,
        
        // Forms
        form,
        
    }
    
}

export default EditPlaceDialogViewModel
