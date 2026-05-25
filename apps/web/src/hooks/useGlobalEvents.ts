import { useWireValue } from '@forminator/react-wire'
import { EVENT_CREATE_SEGMENT } from '@repo/shared/constants'
import segmentsRepo from '@repo/shared/db/repos/segments'
import { useCallback } from 'react'
import { toast } from 'sonner'

import useEventSubscription from '@/hooks/useEventSubscription'
import * as store from '@/store'

const useGlobalEvents = () => {
    
    const tripId = useWireValue(store.currentTripId)
    const planId = useWireValue(store.currentPlanId)
    const currentTrip = useWireValue(store.currentTrip)
    const currentPlan = useWireValue(store.currentPlan)
    
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
