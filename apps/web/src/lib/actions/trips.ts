import segmentsRepo from '@repo/shared/db/repos/segments'
import tripsRepo from '@repo/shared/db/repos/trips'
import { ID } from '@repo/shared/types/data'
import { RequiredPartialSegment, RequiredPartialTrip, Segment, Trip } from '@repo/shared/types/database'
import {
    createSyntheticDownload,
    generateSlug,
    getRandomUnsplashImageUrl,
} from '@repo/shared/utils'
import dayjs from 'dayjs'

import * as store from '@/store'

export const backupTrip = async (trip: Trip) => {
    
    const segments = await segmentsRepo.findAllByTripId(trip.id)
    
    const data = {
        type: 'single',
        trip,
        segments,
    }
    
    const date = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const jsonData = JSON.stringify(data, null, 4)
    const fileType = 'application/json'
    const fileName = `${generateSlug(trip.name)}-${date}on`
    
    createSyntheticDownload(jsonData, fileType, fileName)
    
}

export const backupAllTrips = async () => {
    
    const trips = await tripsRepo.findAll()
    const segments = await segmentsRepo.findAll()
    
    const data = {
        type: 'multiple',
        trips,
        segments,
    }
    
    const date = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const jsonData = JSON.stringify(data, null, 4)
    const fileType = 'application/json'
    const fileName = `trips-${date}on`
    
    createSyntheticDownload(jsonData, fileType, fileName)
    
}

// @todo was working but now with Dexie cloud, need to handle IDs
export const restoreTrip1 = async (
    data: {
        type: string,
        trip: Trip,
        segments: Segment[],
    },
    overwrite = false,
) => {
    
    if (data.type !== 'single')
        throw new Error('Invalid backup type')
    
    const { trip, segments } = data
    
    store.importTripStatus.setValue(`Importing Trip: ${trip.name}`)
    store.importTripProgressMax.setValue(segments.length + 1)
    store.importTripProgressValue.setValue(0)
    
    console.log('restoreTrip: restoring trip', trip.name, 'with', segments.length, 'segments')
    
    let shouldDeleteTrip = false
    
    const existingTrip = await tripsRepo.findOneById(trip.id)
    
    if (existingTrip)
        if (!overwrite)
            throw new Error('Trip already exists')
        else
            shouldDeleteTrip = true
    
    const existingSegments: Segment[] = (await Promise.all(segments.map(it => segmentsRepo.findOneById(it.id))))
        .filter((it): it is Segment => Boolean(it?.id))
    
    if (existingSegments.length > 0)
        if (!overwrite)
            throw new Error('Some segments already exist')
    
    if (shouldDeleteTrip)
        await tripsRepo.deleteById(trip.id)
    
    // Extra check, but deleting the trip should have also deleted all related segments
    if (existingSegments.length > 0)
        await Promise.all(existingSegments
            .filter((it: Segment | null) => Boolean(it?.id))
            .map((it: Segment) => segmentsRepo.deleteById(it.id)))
    
    if (!trip.coverImageUrl)
        trip.coverImageUrl = await getRandomUnsplashImageUrl(trip.name)
    
    console.log('actions#restoreTrip creating trip')
    await tripsRepo.create(trip)
    store.importTripProgressValue.setValue(1)
    
    console.log('actions#restoreTrip creating segments')
    await Promise.all(segments.map(async it => {
        await segmentsRepo.create(it)
        store.importTripProgressValue.setValue(
            (store.importTripProgressValue.getValue() || 0) + 1)
    }))
    
}

const findExistingTrip = async (trip: Partial<Trip>): Promise<Trip | null> => {
    
    if (!trip.id && !trip.name) {
        console.warn('findExistingTrip neither ID or name provided')
        return null
    }
    
    if (trip.id) {
        
        const existingTrip = await tripsRepo.findOneById(trip.id)
        
        if (existingTrip)
            return existingTrip
        
    }
    
    return trip.name ? await tripsRepo.findOneByName(trip.name) : null
    
}

export const restoreTrip = async (
    ownerId: ID,
    data: {
        type: string,
        trip: RequiredPartialTrip,
        segments: Partial<Segment>[],
    },
    onConflictAction: string = 'duplicate',
) => {
    
    if (process.env.NODE_ENV)
        return console.warn('need to implement plans restore')
    
    console.log('restoreTrip', { onConflictAction })
    
    if (data.type !== 'single')
        throw new Error('Invalid backup type')
    
    const { trip, segments } = data
    
    const existingTrip = await findExistingTrip(trip)
    const existingSegments = await Promise.all(segments.map(it => {
        return (it.id)
            ? segmentsRepo.findOneById(it.id)
            : Promise.resolve(null)
    }))
    
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
    
    if (existingTrip?.id && overwrite)
        await tripsRepo.deleteById(trip.id!)
    
    // Extra check, but deleting the trip should have also deleted all related segments
    if (existingSegments.length > 0 && overwrite) {
        const segmentDeleteCandidates: Segment[] = existingSegments
            .filter((it): it is Segment => Boolean(it?.id))
        await Promise.all(segmentDeleteCandidates
            .map(it => segmentsRepo.deleteById(it.id)))
    }
    
    if (!trip.coverImageUrl)
        trip.coverImageUrl = await getRandomUnsplashImageUrl(trip.name)
    
    const dbgAllTrips = await tripsRepo.findAll()
    const dbgAllSegments = await segmentsRepo.findAll()
    
    if (overwrite) {
        await Promise.all(dbgAllSegments.map(it => segmentsRepo.deleteById(it.id)))
        await Promise.all(dbgAllTrips.map(it => tripsRepo.deleteById(it.id)))
    }
    
    console.log('actions#restoreTrip creating trip', {
        dbgAllTrips,
        dbgAllSegments,
    })
    
    delete trip.id
    
    const newTrip = await tripsRepo.create({
        ...trip,
        userId: ownerId,
    })
    
    store.importTripProgressValue.setValue(1)
    
    segments.forEach((_, i) => {
        delete segments[i].id
        segments[i].tripId = newTrip.id
        segments[i].name = segments[i].name ?? `Imported segment ${Math.random()}`
    })
    
    console.log('actions#restoreTrip creating segments')
    await Promise.all(segments.map(async it => {
        await segmentsRepo.create(it as RequiredPartialSegment)
        store.importTripProgressValue.setValue(
            (store.importTripProgressValue.getValue() || 0) + 1)
    }))
    
}

export const restoreAllTrips = async (
    ownerId: ID,
    data: {
        type: string,
        trips: RequiredPartialTrip[],
        segments: Partial<Segment>[],
    },
    onConflictAction: string = 'duplicate',
) => {
    
    if (data.type !== 'multiple')
        throw new Error('Invalid backup type')
    
    const promises = data.trips.map(trip => {
        
        const segments = data.segments.filter(seg => seg.tripId === trip.id)
        
        return restoreTrip(ownerId, {
            type: 'single',
            trip,
            segments,
        }, onConflictAction)
        
    })
    
    await Promise.all(promises)
    
}
