import { useState, useCallback, useEffect } from 'react'
import { currentTripId } from '@/store'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'
import { useParams } from 'react-router-dom'
import { postEvent } from '@/lib/eventBus'
import { EVENT_CREATE_SEGMENT } from '@/constants'
import { toast } from 'sonner'

const useTripViewModel = () => {
    
    const params = useParams()
    const tripId = params?.tripId
    
    const [isEditingName, setIsEditingName] = useState(false)
    
    const currentTrip = useLiveQuery(() => tripId ? tripsRepo.getById(tripId) : null, [tripId])
    
    const segments = useLiveQuery(() => tripId ? (
        segmentsRepo.table
            .where('tripId')
            .equals(tripId)
            // .reverse()
            .sortBy('startDate')
    ) : null, [tripId])
    
    const updateTrip = useCallback(field => async e => {
        
        if (!currentTrip) return
        
        console.log('updateTrip', field, e?.target?.value || e)
        
        await tripsRepo.update(currentTrip.id, {
            [field]: e?.target?.value || e,
        })
        
        toast('Trip updated')
        
    }, [currentTrip])
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip) return
        console.log('addSegment trip vm')
        /* const newSegment = await segmentsRepo.createWithNextDate({
            tripId: currentTrip.id,
            name: 'New segment',
            description: 'New segment description',
            color: 'bg-blue-500',
        })
        
        console.log({ newSegment }) */
        
        postEvent(EVENT_CREATE_SEGMENT)
        
        toast('Segment created')
        
    }, [currentTrip, segments])
    
    const updateSegment = useCallback((id, field) => async e => {
        
        if (!currentTrip) return
        
        console.log('updateSegment', field, e?.target?.value || e)
        
        await segmentsRepo.update(id, {
            [field]: e?.target?.value || e,
        })
        
        toast('Segment updated')
        
    }, [currentTrip])
    
    const deleteSegments = useCallback(async ids => {
        
        if (!Array.isArray(ids) || ids.length <= 0)
            throw new Error('Param "ids" must be an array')
        
        console.log('deleteSegments', ids)
        
        await Promise.all(ids.map(it => segmentsRepo.delete(it)))
        
        toast(`Segment${ids.length > 0 ? 's' : ''} deleted`)
        
    }, [])
    
    useEffect(() => {
        
        currentTripId.setValue(tripId)
        
        return () => currentTripId.setValue(null)
        
    }, [tripId])
    
    return {
        
        // State
        isEditingName,
        setIsEditingName,
        
        // Global State
        currentTrip,
        // setCurrentTrip,
        segments,
        
        // Actions
        updateTrip,
        addSegment,
        updateSegment,
        deleteSegments,
        
    }
    
}

export default useTripViewModel
