import { useState, useMemo, useCallback, useEffect } from 'react'
import { currentTripId } from '@/store'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '@/db'
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'
import { useParams } from 'react-router-dom'
import { postEvent } from '@/lib/eventBus'
import { EVENT_CREATE_SEGMENT } from '@/constants'
import * as actions from '@/actions'
import dayjs from 'dayjs'
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
        
        const value = e?.target?.value ?? e // Use nullish coalescing
        
        console.log('updateTrip', field, value)
        
        await tripsRepo.update(currentTrip.id, {
            [field]: value,
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
        
        if (!currentTrip || !segments) return
        
        const value = e?.target?.value ?? e // Use nullish coalescing
        
        console.log('updateSegment', field, value)
        
        const segmentIndex = segments.findIndex(s => s.id === id)
        
        if (segmentIndex === -1) {
            console.error('Segment not found for update:', id)
            toast.error('Segment not found')
            return
        }
        
        // If the field is not a date, perform a simple update
        if (field !== 'startDate' && field !== 'endDate') {
            
            try {
                await segmentsRepo.update(id, { [field]: value })
                toast('Segment updated')
            } catch (error) {
                console.error('Failed to update segment field:', error)
                toast.error('Failed to update segment')
            }
            
            return
            
        }
        
        // --- Handle Date Updates and Cascade ---
        try {
            
            await db.transaction('rw', db.segments, async () => {
                
                const updates = [] // Array to hold updates for bulkPut
                let currentSegment = segments[segmentIndex]
                let previousEndDate = null
                
                // 1. Calculate changes for the target segment
                let newStartDateStr, newEndDateStr
                const originalDurationDays = dayjs(currentSegment.endDate)
                    .diff(dayjs(currentSegment.startDate), 'day')
                
                if (field === 'startDate') {
                    newStartDateStr = dayjs(value).toISOString()
                    newEndDateStr = dayjs(value).add(originalDurationDays, 'day').toISOString()
                } else { // field === 'endDate'
                    newStartDateStr = dayjs(currentSegment.startDate).toISOString() // Keep original start date
                    newEndDateStr = dayjs(value).toISOString()
                    // Optional: Recalculate duration if endDate is manually changed and you want
                    // subsequent segments to respect *that*
                    // const newDurationDays = dayjs(newEndDateStr).diff(dayjs(newStartDateStr), 'day');
                    // If duration must be preserved, the logic above for startDate change is sufficient.
                    // If end date change *can* alter duration, use newDurationDays below.
                    // For now, we preserve original duration.
                }
                
                updates.push({
                    ...currentSegment,
                    startDate: newStartDateStr,
                    endDate: newEndDateStr,
                })
                
                previousEndDate = dayjs(newEndDateStr) // Use dayjs object for calculations
                
                // 2. Cascade changes to subsequent segments
                for (let i = segmentIndex + 1; i < segments.length; i++) {
                    
                    const nextSegment = segments[i]
                    const durationDays = dayjs(nextSegment.endDate)
                        .diff(dayjs(nextSegment.startDate), 'day') // Preserve original duration
                    
                    const subsequentStartDate = previousEndDate
                    const subsequentEndDate = subsequentStartDate.add(durationDays, 'day')
                    
                    updates.push({
                        ...nextSegment,
                        startDate: subsequentStartDate.toISOString(),
                        endDate: subsequentEndDate.toISOString(),
                    })
                    
                    previousEndDate = subsequentEndDate // Update for the next iteration
                    
                }
                
                // 3. Perform bulk update
                if (updates.length > 0)
                    await segmentsRepo.table.bulkPut(updates)
                
            }) // End transaction
            
            toast('Segment dates updated')
            
        } catch (e) {
            
            console.error('Failed to update segment dates:', e)
            toast.error('Failed to update segment dates')
            
        }
        
    }, [currentTrip])
    
    const deleteSegments = useCallback(async ids => {
        
        if (!Array.isArray(ids) || ids.length <= 0)
            throw new Error('Param "ids" must be an array')
        
        console.log('deleteSegments', ids)
        
        await Promise.all(ids.map(it => segmentsRepo.delete(it)))
        
        toast(`Segment${ids.length > 0 ? 's' : ''} deleted`)
        
    }, [])
    
    const getTotalDaysPerSegment = segment => {
        
        const startDate = new Date(segment.startDate)
        const endDate = new Date(segment.endDate)
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        
        return diffDays
        
    }
    
    const totalDaysPerSegmentByIndex = useMemo(() => segments
        ?.map(it => getTotalDaysPerSegment(it)) || [], [segments])
    
    const getCumulativeDaysPerSegment = useCallback(index => (
        totalDaysPerSegmentByIndex
            .slice(0, index + 1)
            .reduce((acc, it) => acc + it, 0)
    ), [totalDaysPerSegmentByIndex])
    
    const backupTrip = useCallback(async () => {
        
        await actions.backupTrip(currentTrip)
        
    }, [currentTrip, segments])
    
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
        
        // Memos
        totalDaysPerSegmentByIndex,
        
        // Actions
        updateTrip,
        addSegment,
        updateSegment,
        deleteSegments,
        getTotalDaysPerSegment,
        getCumulativeDaysPerSegment,
        backupTrip,
        
    }
    
}

export default useTripViewModel
