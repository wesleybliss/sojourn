import {
    getAllTrips,
    getTripById,
    getTripWithDetails,
    createTrip,
    updateTrip,
    deleteTrip,
    getTripsWithSegmentCount,
} from './tripQueries.js'

// API route handlers for trips
export const tripRoutes = {
    // GET /api/trips
    getTrips: async (req, res) => {
        try {
            const trips = await getAllTrips()
            
            res.json({
                success: true,
                data: trips,
                count: trips.length,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
    
    // GET /api/trips/with-counts
    getTripsWithCounts: async (req, res) => {
        try {
            const trips = await getTripsWithSegmentCount()
            
            res.json({
                success: true,
                data: trips,
                count: trips.length,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
    
    // GET /api/trips/:id
    getTrip: async (req, res) => {
        try {
            const { id } = req.params
            const trip = await getTripById(parseInt(id, 10))
            
            if (!trip) {
                return res.status(404).json({
                    success: false,
                    error: 'Trip not found',
                })
            }
            
            res.json({
                success: true,
                data: trip,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
    
    // GET /api/trips/:id/details
    getTripDetails: async (req, res) => {
        try {
            const { id } = req.params
            const trip = await getTripWithDetails(parseInt(id, 10))
            
            if (!trip) {
                return res.status(404).json({
                    success: false,
                    error: 'Trip not found',
                })
            }
            
            res.json({
                success: true,
                data: trip,
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
    
    // POST /api/trips
    createTrip: async (req, res) => {
        try {
            const tripData = req.body
            const newTrip = await createTrip(tripData)
            
            res.status(201).json({
                success: true,
                data: newTrip,
                message: 'Trip created successfully',
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
    
    // PUT /api/trips/:id
    updateTrip: async (req, res) => {
        try {
            const { id } = req.params
            const tripData = req.body
            const updatedTrip = await updateTrip(parseInt(id, 10), tripData)
            
            if (!updatedTrip) {
                return res.status(404).json({
                    success: false,
                    error: 'Trip not found',
                })
            }
            
            res.json({
                success: true,
                data: updatedTrip,
                message: 'Trip updated successfully',
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
    
    // DELETE /api/trips/:id
    deleteTrip: async (req, res) => {
        try {
            const { id } = req.params
            
            await deleteTrip(parseInt(id, 10))
            
            res.json({
                success: true,
                message: 'Trip deleted successfully',
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            })
        }
    },
}

// Utility to create Express router (if using Express)
export const createTripRouter = () => {
    // This would typically integrate with Express
    // For now, return the route handlers
    return tripRoutes
}
