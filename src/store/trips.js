/* eslint-disable no-unused-vars */
import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from '@/constants'
import TripsRepository from '@/db/repositories/trips'

export const trips = createPersistedWire(keys.trips, [])
export const currentTrip = createPersistedWire(keys.currentTrip, null)

export const tripsRepo = createWire(new TripsRepository())

export const segmentsRepo = createSelector({
    get: ({ get }) => {
        
        const tripId = get(currentTrip)?.id
        
        if (!tripId) return null
        
        return new TripsRepository(tripId)
        
    },
})
