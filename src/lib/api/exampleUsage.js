// Example usage of the Next.js API routes
// This demonstrates how to interact with the new API endpoints

async function exampleUsage() {
    try {
        // Fetch all trips
        console.log('Fetching all trips...')
        const tripsResponse = await fetch('/api/trips')
        const tripsResult = await tripsResponse.json()
        
        console.log('Trips:', tripsResult)
        
        // Fetch trips with segment counts
        console.log('Fetching trips with segment counts...')
        const countsResponse = await fetch('/api/trips?withCounts=true')
        const countsResult = await countsResponse.json()
        
        console.log('Trips with counts:', countsResult)
        
        const tripId = 1 // Replace with actual trip ID
        
        // Fetch a single trip
        console.log(`Fetching trip ${tripId}...`)
        const tripResponse = await fetch(`/api/trips/${tripId}`)
        const tripResult = await tripResponse.json()
        
        console.log('Trip:', tripResult)
        
        // Fetch trip with all details (including segments)
        console.log(`Fetching trip ${tripId} with details...`)
        const tripDetailsResponse = await fetch(`/api/trips/${tripId}?withDetails=true`)
        const tripDetailsResult = await tripDetailsResponse.json()
        
        console.log('Trip with details:', tripDetailsResult)
        
        // Create a new trip
        const newTripData = {
            name: 'My Awesome Trip',
            description: 'A trip to remember',
            startDate: '2024-01-01',
            endDate: '2024-01-07',
            coverImageUrl: 'https://example.com/image.jpg',
        }
        const createResponse = await fetch('/api/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTripData),
        })
        const createResult = await createResponse.json()
        
        console.log('Created trip:', createResult)
        
        // Update a trip
        const updateData = {
            name: 'Updated Trip Name',
            description: 'Updated description',
        }
        const updateResponse = await fetch(`/api/trips/${tripId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updateData),
        })
        const updateResult = await updateResponse.json()
        
        console.log('Updated trip:', updateResult)
        
        // Delete a trip
        console.log(`Deleting trip ${tripId}...`)
        const deleteResponse = await fetch(`/api/trips/${tripId}`, {
            method: 'DELETE',
        })
        const deleteResult = await deleteResponse.json()
        
        console.log('Deleted trip:', deleteResult)
        
        // Run migration
        console.log('Running migration...')
        const migrateResponse = await fetch('/api/migrate', {
            method: 'POST',
        })
        const migrateResult = await migrateResponse.json()
        
        console.log('Migration result:', migrateResult)
        
    } catch (error) {
        console.error('Error in example usage:', error)
    }
}

// Uncomment to run the example
// exampleUsage()
