import {
    getAllTrips,
    getTripById,
    getTripWithDetails,
    createTrip as createTripQuery,
    updateTrip as updateTripQuery,
    deleteTrip as deleteTripQuery,
    getTripsWithSegmentCount,
} from './tripQueries.js'

// Server-side functions that can be called from the frontend
// These use the actual database queries instead of mock data

// Get all trips
export const getTrips = async () => {
    try {
        const trips = await getAllTrips()
        
        return {
            success: true,
            data: trips,
            count: trips.length,
        }
    } catch (error) {
        console.error('Server error getting trips:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Get a single trip
export const getTrip = async id => {
    try {
        const trip = await getTripById(parseInt(id, 10))
        
        if (!trip) {
            return {
                success: false,
                error: 'Trip not found',
            }
        }
        
        return {
            success: true,
            data: trip,
        }
    } catch (error) {
        console.error(`Server error getting trip ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Get trip with all details
export const getTripDetails = async id => {
    try {
        const trip = await getTripWithDetails(parseInt(id, 10))
        
        if (!trip) {
            return {
                success: false,
                error: 'Trip not found',
            }
        }
        
        return {
            success: true,
            data: trip,
        }
    } catch (error) {
        console.error(`Server error getting trip details ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Create a new trip
export const createTrip = async tripData => {
    try {
        const newTrip = await createTripQuery({
            name: tripData.name || 'Untitled Trip',
            description: tripData.description || '',
            startDate: tripData.startDate || null,
            endDate: tripData.endDate || null,
            coverImageUrl: tripData.coverImageUrl || null,
        })
        
        return {
            success: true,
            data: newTrip,
            message: 'Trip created successfully',
        }
    } catch (error) {
        console.error('Server error creating trip:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Update a trip
export const updateTrip = async (id, tripData) => {
    try {
        const updatedTrip = await updateTripQuery(parseInt(id, 10), tripData)
        
        if (!updatedTrip) {
            return {
                success: false,
                error: 'Trip not found',
            }
        }
        
        return {
            success: true,
            data: updatedTrip,
            message: 'Trip updated successfully',
        }
    } catch (error) {
        console.error(`Server error updating trip ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Delete a trip
export const deleteTrip = async id => {
    try {
        await deleteTripQuery(parseInt(id, 10))
        return {
            success: true,
            message: 'Trip deleted successfully',
        }
    } catch (error) {
        console.error(`Server error deleting trip ${id}:`, error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Get trips with segment counts
export const getTripsWithCounts = async () => {
    try {
        const trips = await getTripsWithSegmentCount()
        
        return {
            success: true,
            data: trips,
            count: trips.length,
        }
    } catch (error) {
        console.error('Server error getting trips with counts:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

// Export individual functions for direct use
export {
    getAllTrips,
    getTripById,
    getTripWithDetails,
    createTripQuery,
    updateTripQuery,
    deleteTripQuery,
    getTripsWithSegmentCount,
}
