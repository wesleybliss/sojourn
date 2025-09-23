import { useCallback } from 'react'
import { toast } from 'sonner'
import { useAddSegment } from '@/lib/queries/trip'
import { useQueryClient } from '@tanstack/react-query'
import { getTripSegmentNames } from '@/lib/utils'
import dayjs from 'dayjs'

const SegmentActionsViewModel = (currentTrip, currentPlan) => {
    
    // React Query
    const queryClient = useQueryClient()
    const addSegmentMutation = useAddSegment()
    
    const addSegment = useCallback(async () => {
        
        if (!currentTrip || !currentPlan)
            return console.warn('addSegment no trip or plan selected')
        
        const newSegment = {
            tripId: currentTrip.id,
            planId: currentPlan.id,
            startDate: dayjs().format('YYYY-MM-DD'),
            endDate: dayjs().add(1, 'day').format('YYYY-MM-DD'),
            name: 'New Segment',
            color: 'bg-blue-500',
        }
        
        addSegmentMutation.mutate(newSegment, {
            onSuccess: () => {
                toast('Segment added')
                // queryClient.invalidateQueries(['trip', currentTrip.id])
            },
        })
        
    }, [currentPlan, addSegmentMutation, queryClient, currentTrip])
    
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
