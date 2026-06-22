import { useWireState, useWireValue } from '@forminator/react-wire'
import { ApiResult, Place } from '@repo/shared/types'
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
        console.log('updatePlace wtf')
        if (!currentTeamId) console.warn('fuck no team id')
        if (!updatePlaceDialogPlace?.id) console.warn('fuck no updatePlaceDialogPlace')
        
        if (!currentTeamId || !updatePlaceDialogPlace?.id) return
        
        setIsUpdatingPlace(true)
        
        try {
            
            const payload = {
                ...value,
                id: updatePlaceDialogPlace.id,
                teamId: currentTeamId,
                notes: value.notes.map(it => ({
                    ...it,
                    placeId: it.placeId || updatePlaceDialogPlace.id,
                })),
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
