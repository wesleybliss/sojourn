import * as store from '@/store'
import db, { tableFields } from '@/db'
import tripsRepo from '@/db/repositories/trips'
import plansRepo from '@/db/repositories/plans'
import segmentsRepo from '@/db/repositories/segments'
import {
    generateSlug,
    createSyntheticDownload,
    getRandomUnsplashImageUrl,
} from '@/lib/utils'
import { cloneRecord } from '@/db/dbUtils'
import dayjs from 'dayjs'
import { toast } from 'sonner'

export const incrementImportProgress = (amount = 1) => {
    
    store.importTripProgressValue.setValue(
        store.importTripProgressValue.getValue() + amount)
    
}

export const backupTrip = async trip => {
    
    const plans = await plansRepo.table
        .where('tripId')
        .equals(trip.id)
        .sortBy('startDate')
    
    await Promise.all(plans.map(async (it, i) => {
        plans[i].segments = await segmentsRepo.table
            .where('tripId')
            .equals(trip.id)
            .sortBy('updatedAt')
    }))
    
    const data = {
        type: 'single',
        ...trip,
        plans,
    }
    
    const date = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const jsonData = JSON.stringify(data, null, 4)
    const fileType = 'application/json'
    const fileName = `${generateSlug(trip.name)}-${date}.json`
    
    createSyntheticDownload(jsonData, fileType, fileName)
    
}

export const backupAllTrips = async () => {
    
    const trips = await tripsRepo.getAll()
    
    await Promise.all(trips.map(async (trip, i) => {
        
        trips[i].plans = await plansRepo.table
            .where('tripId')
            .equals(trip.id)
            .sortBy('updatedAt')
        
        await Promise.all(trips[i].plans.map(async (it, j) => {
            trips[i].plans[j].segments = await segmentsRepo.table
                .where('tripId')
                .equals(trip.id)
                .sortBy('updatedAt')
        }))
        
    }))
    
    const data = {
        type: 'multiple',
        trips,
    }
    
    const date = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const jsonData = JSON.stringify(data, null, 4)
    const fileType = 'application/json'
    const fileName = `trips-${date}.json`
    
    createSyntheticDownload(jsonData, fileType, fileName)
    
}

// @todo was working but now with Dexie cloud, need to handle IDs
export const restoreTrip1 = async (data, overwrite = false) => {
    
    if (data.type !== 'single')
        throw new Error('Invalid backup type')
    
    const { trip, segments } = data
    
    store.importTripStatus.setValue(`Importing Trip: ${trip.name}`)
    store.importTripProgressMax.setValue(segments.length + 1)
    store.importTripProgressValue.setValue(0)
    
    console.log('restoreTrip: restoring trip', trip.name, 'with', segments.length, 'segments')
    
    let shouldDeleteTrip = false
    
    const existingTrip = await tripsRepo.getById(trip.id)
    
    if (existingTrip)
        if (!overwrite)
            throw new Error('Trip already exists')
        else
            shouldDeleteTrip = true
    
    const existingSegments = await Promise.all(segments.map(it => segmentsRepo.getById(it.id)))
    
    if (existingSegments.length > 0)
        if (!overwrite)
            throw new Error('Some segments already exist')
    
    if (shouldDeleteTrip)
        await tripsRepo.delete(trip.id)
    
    // Extra check, but deleting the trip should have also deleted all related segments
    if (existingSegments.length > 0)
        await Promise.all(existingSegments
            .filter(it => Boolean(it?.id))
            .map(it => segmentsRepo.delete(it.id)))
    
    if (!trip.coverImageUrl)
        trip.coverImageUrl = await getRandomUnsplashImageUrl(trip.name)
    
    console.log('actions#restoreTrip creating trip')
    await tripsRepo.create(trip)
    store.importTripProgressValue.setValue(1)
    
    console.log('actions#restoreTrip creating segments')
    await Promise.all(segments.map(async it => {
        await segmentsRepo.create(it)
        store.importTripProgressValue.setValue(
            store.importTripProgressValue.getValue() + 1)
    }))
    
}

export const restoreTrip2 = async (data, onConflictAction = 'duplicate') => {
    
    // return console.warn('need to implement plans restore')
    
    console.log('restoreTrip', { onConflictAction })
    
    if (data.type !== 'single')
        throw new Error('Invalid backup type')
    
    const { trip, plans, segments } = data
    
    const existingTrip = await tripsRepo.getById(trip.id) || await tripsRepo.getByName(trip.name, true)
    const existingPlans = await Promise.all(plans.map(it => plansRepo.getById(it.id)))
    const existingSegments = await Promise.all(segments.map(it => segmentsRepo.getById(it.id)))
    
    if (existingTrip?.id && onConflictAction === 'duplicate') {
        
        delete trip.id
        delete data.trip.id
        
        trip.name = `${trip.name} (Copy ${dayjs().format('YYYY-MMM-DD')})`
        data.trip.name = trip.name
        
        for (let i = 0; i < segments.length; i++) {
            
            // Auto generated by the database
            delete segments[i].id
            delete data.segments[i].id
            
            // Assigned after new trip is created
            delete segments[i].tripId
            delete data.segments[i].tripId
            
        }
        
    }
    
    // @todo @debug
    const overwrite = onConflictAction === 'overwrite'
    
    store.importTripStatus.setValue(`Importing Trip: ${trip.name}`)
    store.importTripProgressMax.setValue(segments.length + 1)
    store.importTripProgressValue.setValue(0)
    
    console.log('restoreTrip: restoring trip', trip.name, 'with', segments.length, 'segments')
    
    if (existingTrip && overwrite)
        await tripsRepo.delete(trip.id)
    
    // Extra check, but deleting the trip should have also deleted all related segments
    if (existingSegments.length > 0 && overwrite)
        await Promise.all(existingSegments
            .filter(it => Boolean(it?.id))
            .map(it => segmentsRepo.delete(it.id)))
    
    if (!trip.coverImageUrl)
        trip.coverImageUrl = await getRandomUnsplashImageUrl(trip.name)
    
    const dbgAllTrips = await tripsRepo.getAll()
    const dbgAllSegments = await segmentsRepo.getAll()
    
    if (overwrite) {
        await Promise.all(dbgAllSegments.map(it => segmentsRepo.delete(it.id)))
        await Promise.all(dbgAllTrips.map(it => tripsRepo.delete(it.id)))
    }
    
    console.log('actions#restoreTrip creating trip', {
        dbgAllTrips,
        dbgAllSegments,
    })
    
    delete trip.id
    
    const newTripId = await tripsRepo.create(trip)
    
    store.importTripProgressValue.setValue(1)
    
    segments.forEach((_, i) => {
        delete segments[i].id
        segments[i].tripId = newTripId
    })
    
    console.log('actions#restoreTrip creating segments')
    await Promise.all(segments.map(async it => {
        await segmentsRepo.create(it)
        store.importTripProgressValue.setValue(
            store.importTripProgressValue.getValue() + 1)
    }))
    
}

export const restoreTripData = async data => {
    
    // Sanity check
    if (!data.id || !data.name)
        throw new Error('Invalid or corrupt trip; missing ID or name')
    
    const existingTrip = await tripsRepo.getByName(data.name)
    
    // If the trip already exists, change it's name to import it as new
    if (existingTrip?.name === data.name)
        data.name = `${data.name} (Copy ${dayjs().format('YYYY-MMM-DD')})`
    
    data = cloneRecord(data, tableFields.trips)
    
    // console.log('restoreTripData', { data, existingTrip })
    
    const newTripId = await tripsRepo.create(data)
    
    return await tripsRepo.getById(newTripId)
    
}

export const restorePlanData = async (tripId, data) => {
    
    if (!tripId)
        throw new Error('Invalid tripId')
    
    if (!data.id || !data.tripId || !data.name)
        throw new Error('Invalid or corrupt plan; missing ID or trip ID or name')
    
    data = {
        ...cloneRecord(data, tableFields.plans),
        tripId,
    }
    
    const newPlanId = await plansRepo.create(data)
    
    return await plansRepo.getById(newPlanId)
    
}

export const restoreSegmentData = async (tripId, planId, data) => {
    
    if (!tripId)
        throw new Error('Invalid tripId')
    
    if (!planId)
        throw new Error('Invalid planId')
    
    if (!data.id || !data.tripId || !data.name)
        throw new Error('Invalid or corrupt segment; missing ID or trip ID or name')
    
    data = {
        ...cloneRecord(data, tableFields.segments),
        tripId,
        planId,
    }
    
    const newSegmentId = await segmentsRepo.create(data)
    
    return await segmentsRepo.getById(newSegmentId)
    
}

export const restoreTrip = async data => {
    
    // return console.warn('need to implement plans restore')
    
    console.log('restoreTrip', { data })
    
    if (data.type !== 'single')
        throw new Error('Invalid backup type')
    
    // Add some defaults to we don't need to use null checks
    data.plans = data.plans || []
    data.plans = data.plans.map(it => ({
        ...it,
        segments: it.segments || [],
    }))
    
    store.importTripStatus.setValue(`Importing Trip: ${data.trip.name}`)
    store.importTripProgressMax.setValue(data.plans.length + data.segments.length + 1)
    store.importTripProgressValue.setValue(0)
    
    const trip = await restoreTripData(data.trip)
    const tripName = trip.name === data.trip.name ? trip.name : `${data.trip.name} -> ${trip.name}`
    
    console.log('restoreTrip: restoring trip', tripName, 'with',
        data.plans.length, 'plans,', data.segments.length, 'segments')
    
    if (!trip.coverImageUrl)
        trip.coverImageUrl = await getRandomUnsplashImageUrl(trip.name)
    
    store.importTripProgressValue.setValue(1)
    
    try {
        
        // Create the initial plan, if none exist in the import
        if (!data.plans.length)
            data.plans = [await plansRepo.create({
                tripId: trip.id,
                name: '',
            })]
        
        console.log('actions#restoreTrip creating plans')
        await Promise.all(data.plans.map(async it => {
            
            const plan = await restorePlanData(trip.id, it)
            
            incrementImportProgress()
            
            console.log('actions#restoreTrip creating segments')
            await Promise.all(data.segments.map(async it => {
                await restoreSegmentData(trip.id, plan.id, it)
                incrementImportProgress()
            }))
            
        }))
        
    } catch (e) {
        
        // Delete the newly created trip on failure
        await tripsRepo.delete(trip.id)
        
        throw e
        
    }
    
}

export const restoreAllTrips = async (data, onConflictAction = 'duplicate') => {
    
    if (data.type !== 'multiple')
        throw new Error('Invalid backup type')
    
    const promises = data.trips.map(trip => {
        
        const segments = data.segments.filter(seg => seg.tripId === trip.id)
        
        return restoreTrip({
            type: 'single',
            trip,
            segments,
        }, onConflictAction)
        
    })
    
    await Promise.all(promises)
    
}

export const updateSegmentWithCascade = async (currentTrip, planId, segmentId, field, value) => {
    
    const segments = await segmentsRepo.table
        .where('planId')
        .equals(planId)
        // .reverse()
        .sortBy('startDate')
    
    const segmentIndex = segments.findIndex(s => s.id === segmentId)
    
    if (segmentIndex === -1) {
        console.error('Segment not found for update:', segmentId)
        toast.error('Segment not found')
        return
    }
    
    // If the field is not a date, perform a simple update
    if (field !== 'startDate' && field !== 'endDate') {
        
        try {
            await segmentsRepo.update(segmentId, { [field]: value })
            console.log('updateSegment segment updated', segmentId, 'field', field, 'value', value)
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
    
}
