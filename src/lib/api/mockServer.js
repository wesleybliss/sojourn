import { getDummyTrips, getDummyTripById, getDummySegments } from './dummyData'

// Mock API server functions
export const mockApi = {
    // GET /api/trips
    getTrips: async () => {
        console.log('[MOCK API] Fetching all trips...')
        const trips = await getDummyTrips()
        
        return {
            success: true,
            data: trips,
            timestamp: new Date().toISOString(),
        }
    },
    
    // GET /api/trips/:id
    getTrip: async id => {
        console.log(`[MOCK API] Fetching trip ${id}...`)
        const trip = await getDummyTripById(id)
        
        if (!trip) {
            return {
                success: false,
                error: 'Trip not found',
                timestamp: new Date().toISOString(),
            }
        }
        
        return {
            success: true,
            data: trip,
            timestamp: new Date().toISOString(),
        }
    },
    
    // GET /api/trips/:id/segments
    getTripSegments: async tripId => {
        console.log(`[MOCK API] Fetching segments for trip ${tripId}...`)
        const segments = await getDummySegments(tripId)
        
        return {
            success: true,
            data: segments,
            count: segments.length,
            timestamp: new Date().toISOString(),
        }
    },
    
    // POST /api/trips (create new trip)
    createTrip: async tripData => {
        console.log('[MOCK API] Creating new trip...', tripData)
        
        // Simulate server processing
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const newTrip = {
            id: Math.floor(Math.random() * 1000) + 100,
            ...tripData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        
        return {
            success: true,
            data: newTrip,
            message: 'Trip created successfully',
            timestamp: new Date().toISOString(),
        }
    },
    
    // PUT /api/trips/:id (update trip)
    updateTrip: async (id, tripData) => {
        console.log(`[MOCK API] Updating trip ${id}...`, tripData)
        
        // Simulate server processing
        await new Promise(resolve => setTimeout(resolve, 600))
        
        const updatedTrip = {
            id: parseInt(id, 10),
            ...tripData,
            updatedAt: new Date().toISOString(),
        }
        
        return {
            success: true,
            data: updatedTrip,
            message: 'Trip updated successfully',
            timestamp: new Date().toISOString(),
        }
    },
    
    // DELETE /api/trips/:id
    deleteTrip: async id => {
        console.log(`[MOCK API] Deleting trip ${id}...`)
        
        // Simulate server processing
        await new Promise(resolve => setTimeout(resolve, 400))
        
        return {
            success: true,
            message: `Trip ${id} deleted successfully`,
            timestamp: new Date().toISOString(),
        }
    },
}

// Utility function to simulate network delay
export const simulateNetworkDelay = (min = 300, max = 1000) => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min
    
    return new Promise(resolve => setTimeout(resolve, delay))
}
