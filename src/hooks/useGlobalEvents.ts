import { useCallback } from 'react'
import { useWireValue } from '@forminator/react-wire'
import * as store from '@/store'
import { useLiveQuery } from 'dexie-react-hooks'
import tripsRepo from '@/db/repos/trips'
import segmentsRepo from '@/db/repos/segments'
import { EVENT_CREATE_SEGMENT } from '@/constants'
import useEventSubscription from '@/hooks/useEventSubscription'
import { toast } from 'sonner'
import plansRepo from '@/db/repos/plans'

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
