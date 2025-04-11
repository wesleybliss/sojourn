import { useCallback } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'
import { EVENT_CREATE_SEGMENT } from '@/constants'
import useEventSubscription from '@/hooks/useEventSubscription'
import { toast } from 'sonner'

const useGlobalEvents = () => {
    
    const tripId = useWireValue(store.currentTripId)
    
    const currentTrip = useLiveQuery(() => tripId ? tripsRepo.getById(tripId) : null, [tripId])
    
    const segments = useLiveQuery(() => tripId ? (
        segmentsRepo.table
            .where('tripId')
            .equals(tripId)
            // .reverse()
            .sortBy('startDate')
    ) : null, [tripId])
    
    const addSegment = useCallback(async () => {
        console.log('addSegment')
        if (!currentTrip)
            return console.warn('useGlobalEvents#addSegment: No current trip', { tripId })
        
        const newSegment = await segmentsRepo.createWithNextDate({
            tripId: currentTrip.id,
            name: 'New segment',
            description: 'New segment description',
            color: 'bg-blue-500',
        })
        
        console.log('useGlobalEvents#addSegment:', { newSegment })
        
        toast('Segment created')
        
    }, [currentTrip])
    
    useEventSubscription(EVENT_CREATE_SEGMENT, addSegment)
    
}

export default useGlobalEvents
