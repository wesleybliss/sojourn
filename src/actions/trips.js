import { trips } from '@/store/trips'
import { addItemArray, updateItemArray, removeItemArray } from '@/lib/storeUtils'
import { nanoid } from 'nanoid'

export const createTrip = trip => {
    
    const data = {
        id: nanoid(),
        ...trip,
    }
    
    addItemArray(trips, data)
    
    return data
    
}

export const updateTrip = trip =>
    updateItemArray(trips, trip)

export const deleteTrip = trip =>
    removeItemArray(trips, trip)

export const deleteTripById = tripId =>
    removeItemArray(trips, { id: tripId })

//

export const addSegment = (tripId, segment) => {
    
    const trip = trips.getValue().find(it => it.id === tripId)
    
    if (!trip)
        throw new Error('Trip not found')
    
    const data = {
        id: nanoid(),
        ...segment,
    }
    
    trip.segments = trip.segments || []
    
    trip.segments.push(data)
    
    updateTrip(trip)
    
}

export const updateSegment = (tripId, segment) => {
    
    const trip = trips.getValue().find(it => it.id === tripId)
    
    if (!trip)
        throw new Error('Trip not found')
    
    const index = trip.segments.findIndex(it => it.id === segment.id)
    
    if (index === -1)
        throw new Error('Segment not found')
    
    trip.segments[index] = {
        ...trip.segments[index],
        ...segment,
    }
    
    updateTrip(trip)
    
}

export const deleteSegment = (tripId, segment) => {
    
    const trip = trips.getValue().find(it => it.id === tripId)
    
    if (!trip)
        throw new Error('Trip not found')
    
    const index = trip.segments.findIndex(it => it.id === segment.id)
    
    if (index === -1)
        throw new Error('Segment not found')
    
    trip.segments.splice(index, 1)
    
    updateTrip(trip)
    
}
