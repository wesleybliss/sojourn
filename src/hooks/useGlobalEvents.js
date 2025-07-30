import { useCallback } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store/index.js'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'
import { EVENT_CREATE_SEGMENT } from '@/constants.js'
import useEventSubscription from '@/hooks/useEventSubscription'
import { toast } from 'sonner'
import plansRepo from '@/db/repositories/plans.js'

const useGlobalEvents = () => {
    
    const tripId = useWireValue(store.currentTripId)
    const planId = useWireValue(store.currentPlanId)
    
    const currentTrip = useLiveQuery(() => tripId ? tripsRepo.getById(tripId) : null, [tripId])
    const currentPlan = useLiveQuery(() => planId ? plansRepo.getById(planId) : null, [planId])
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip)
            return console.warn('useGlobalEvents#addSegment: No current trip', { tripId })
        
        if (!currentPlan)
            return console.warn('useGlobalEvents#addSegment: No current plan', { planId })
        
        const newSegment = await segmentsRepo.createWithNextDate({
            tripId: currentTrip.id,
            planId: currentPlan.id,
            name: 'New segment',
            description: 'New segment description',
            color: 'bg-blue-500',
        })
        
        console.log('useGlobalEvents#addSegment:', { newSegment })
        
        toast('Segment created')
        
    }, [tripId, planId, currentTrip, currentPlan])
    
    useEventSubscription(EVENT_CREATE_SEGMENT, addSegment)
    
}

export default useGlobalEvents
