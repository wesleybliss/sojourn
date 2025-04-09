import { useState, useMemo, useEffect, useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { tripsRepo } from '@/db/repositories/trips'
import SegmentsRepo from '@/db/repositories/segments'
import { useWireState } from '@forminator/react-wire'
import { useParams } from 'react-router-dom'
import * as store from '@/store'
import { toast } from 'sonner'
import dayjs from 'dayjs'

const useTripViewModel = () => {
    
    const params = useParams()
    const tripId = params.tripId
    
    const [isEditingName, setIsEditingName] = useState(false)
    
    const [currentTrip, setCurrentTrip] = useWireState(store.currentTrip)
    
    const segmentsRepo = useMemo(() => {
        
        if (!currentTrip) return null
        
        return new SegmentsRepo(currentTrip.id)
        
    }, [currentTrip])
    
    const trips = useLiveQuery(() => tripsRepo.getAll())
    const segments = useLiveQuery(() => segmentsRepo?.getAll() || null)
    
    const updateTrip = useCallback(field => async e => {
        
        if (!currentTrip) return
        
        console.log('updateTrip', field, e?.target?.value || e)
        
        await tripsRepo.update(currentTrip.id, {
            [field]: e?.target?.value || e,
        })
        
        toast('Trip updated')
        
    }, [currentTrip])
    
    const addSegment = async () => {
        
        const today = dayjs()
        
        const newSegment = await segmentsRepo.create({
            name: 'New segment',
            description: 'New segment description',
            startDate: today.toDate(),
            endDate: today.add(1, 'week').toDate(),
        })
        
        console.log({ newSegment })
        
        toast('Segment created')
        
    }
    
    const updateSegment = useCallback((id, field) => async e => {
        
        if (!currentTrip) return
        
        console.log('updateSegment', field, e?.target?.value || e)
        
        await segmentsRepo.update(id, {
            [field]: e?.target?.value || e,
        })
        
        toast('Segment updated')
        
    }, [currentTrip])
    
    const deleteSegment = async id => {
        
        console.log('deleteSegment', id)
        
        await segmentsRepo.delete(id)
        
        toast('Segment deleted')
        
    }
    
    useEffect(() => {
        
        if (!trips) return
        
        const trip = trips.find(it => it.id === tripId)
        
        if (!trip)
            window.location.replace('/')
        
        setCurrentTrip(trip)
        
    }, [tripId, trips])
    
    return {
        
        // State
        isEditingName,
        setIsEditingName,
        
        // Global State
        trips,
        currentTrip,
        setCurrentTrip,
        segments,
        
        // Actions
        updateTrip,
        addSegment,
        updateSegment,
        deleteSegment,
        
    }
    
}

export default useTripViewModel
