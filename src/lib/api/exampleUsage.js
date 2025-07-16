// Example usage of the server functions with actual database queries
import {
    getTrips,
    getTrip,
    getTripDetails,
    createTrip,
    updateTrip,
    deleteTrip,
    getTripsWithCounts,
} from './serverFunctions.js'

async function exampleUsage() {
    try {
        // Fetch all trips
        console.log('Fetching all trips...')
        const tripsResult = await getTrips()
        
        console.log('Trips:', tripsResult)
        
        const tripId = 1 // Replace with actual trip ID
        
        // Fetch a single trip
        console.log(`Fetching trip ${tripId}...`)
        const tripResult = await getTrip(tripId)
        
        console.log('Trip:', tripResult)
        
        // Fetch trip with all details (including segments)
        console.log(`Fetching trip ${tripId} with details...`)
        const tripDetailsResult = await getTripDetails(tripId)
        
        console.log('Trip with details:', tripDetailsResult)
        
        // Create a new trip
        const newTripData = {
            name: 'My Awesome Trip',
            description: 'A trip to remember',
            startDate: '2024-01-01',
            endDate: '2024-01-07',
            coverImageUrl: 'https://example.com/image.jpg',
        }
        const createResult = await createTrip(newTripData)
        
        console.log('Created trip:', createResult)
        
        // Update a trip
        const updateData = {
            name: 'Updated Trip Name',
            description: 'Updated description',
        }
        const updateResult = await updateTrip(tripId, updateData)
        
        console.log('Updated trip:', updateResult)
        
        // Delete a trip
        console.log(`Deleting trip ${tripId}...`)
        const deleteResult = await deleteTrip(tripId)
        
        console.log('Deleted trip:', deleteResult)
        
        // Fetch trips with segment counts
        console.log('Fetching trips with segment counts...')
        const countsResult = await getTripsWithCounts()
        
        console.log('Trips with counts:', countsResult)
    } catch (error) {
        console.error('Error in example usage:', error)
    }
}

// Uncomment to run the example
// exampleUsage()
