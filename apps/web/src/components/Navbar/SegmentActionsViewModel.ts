import { Plan, Segment, Trip } from '@repo/shared/types'
import { getTripSegmentNames } from '@repo/shared/utils'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useCallback } from 'react'
import { toast } from 'sonner'

import { useAddSegment } from '@/lib/queries/trip'

const SegmentActionsViewModel = (
    currentTrip: Trip | null,
    currentPlan: Plan | null,
) => {
    
    // React Query
    const queryClient = useQueryClient()
    const addSegmentMutation = useAddSegment()
    
    const segments = currentPlan?.segments || []
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip || !currentPlan)
            return console.warn('addSegment no trip or plan selected')
        
        // Find the segment with the furthest end date to use as the new segment's start
        let startDate = dayjs()
        
        if (segments?.length) {
            const lastSegment = segments.reduce((latest: Segment, seg: Segment) =>
                dayjs(seg.endDate as Date).isAfter(dayjs(latest.endDate as Date)) ? seg : latest,
            )
            
            startDate = dayjs(lastSegment.endDate as Date)
        }
        
        const newSegment = {
            tripId: currentTrip.id,
            planId: currentPlan.id,
            startDate: startDate.format('YYYY-MM-DD'),
            endDate: startDate.add(1, 'day').format('YYYY-MM-DD'),
            name: 'New Segment',
            color: 'bg-blue-500',
        }
        
        addSegmentMutation.mutate(newSegment, {
            onSuccess: () => {
                toast('Segment added')
            },
        })
        
    }, [currentPlan, segments, addSegmentMutation, currentTrip])
    
    const copySegmentNamesToClipboard = useCallback(async () => {
        
        if (!currentTrip || !currentPlan)
            return console.warn('copySegmentNamesToClipboard no trip or plan selected')
        
        await getTripSegmentNames(currentPlan)
        toast.success('Segment names copied to clipboard')
        
    }, [currentTrip, currentPlan])
    
    return {
        
        // Hooks
        queryClient,
        
        // Methods
        addSegment,
        copySegmentNamesToClipboard,
        
    }
    
}

export default SegmentActionsViewModel
