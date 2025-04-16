import * as store from '@/store'
import tripsRepo from '@/db/repositories/trips'
import segmentsRepo from '@/db/repositories/segments'
import {
    generateSlug,
    createSyntheticDownload,
    getRandomUnsplashImageUrl,
} from '@/lib/utils'
import dayjs from 'dayjs'

export const backupTrip = async trip => {
    
    const segments = await segmentsRepo.table
        .where('tripId')
        .equals(trip.id)
        .sortBy('startDate')
    
    const data = {
        type: 'single',
        trip,
        segments,
    }
    
    const date = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const jsonData = JSON.stringify(data, null, 4)
    const fileType = 'application/json'
    const fileName = `${generateSlug(trip.name)}-${date}.json`
    
    createSyntheticDownload(jsonData, fileType, fileName)
    
}

export const backupAllTrips = async () => {
    
    const trips = await tripsRepo.getAll()
    const segments = await segmentsRepo.getAll()
    
    const data = {
        type: 'multiple',
        trips,
        segments,
    }
    
    const date = dayjs().format('YYYY-MM-DD_HH-mm-ss')
    const jsonData = JSON.stringify(data, null, 4)
    const fileType = 'application/json'
    const fileName = `trips-${date}.json`
    
    createSyntheticDownload(jsonData, fileType, fileName)
    
}

export const restoreTrip = async (data, overwrite = false) => {
    
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

export const restoreAllTrips = async (data, overwrite = false) => {
    
    if (data.type !== 'multiple')
        throw new Error('Invalid backup type')
    
    const existingTrips = await Promise.all(data.trips.map(it => tripsRepo.getById(it.id)))
    const existingSegments = await Promise.all(data.segments.map(it => segmentsRepo.getById(it.id)))
    
    if ((existingTrips.length || existingSegments.length) && !overwrite)
        throw new Error('Some trips or segments already exist')
    
    const promises = data.trips.map(trip => {
        
        const segments = data.segments.filter(seg => seg.tripId === trip.id)
        
        return restoreTrip({
            type: 'single',
            trip,
            segments,
        }, overwrite)
        
    })
    
    await Promise.all(promises)
    
}
