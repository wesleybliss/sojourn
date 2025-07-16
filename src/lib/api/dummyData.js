export const dummyTrips = [
    {
        id: 1,
        name: 'Summer Vacation 2024',
        description: 'Two-week trip to Europe',
        startDate: '2024-07-15',
        endDate: '2024-07-29',
        destination: 'Europe',
        status: 'planned',
    },
    {
        id: 2,
        name: 'Weekend Getaway',
        description: 'Quick trip to the mountains',
        startDate: '2024-08-10',
        endDate: '2024-08-12',
        destination: 'Rocky Mountains',
        status: 'completed',
    },
    {
        id: 3,
        name: 'Business Trip',
        description: 'Conference in San Francisco',
        startDate: '2024-09-05',
        endDate: '2024-09-08',
        destination: 'San Francisco',
        status: 'upcoming',
    },
]

export const dummySegments = [
    {
        id: 1,
        tripId: 1,
        name: 'Paris',
        startDate: '2024-07-15',
        endDate: '2024-07-22',
        location: 'Paris, France',
        type: 'city',
    },
    {
        id: 2,
        name: 'Rome',
        tripId: 1,
        startDate: '2024-07-22',
        endDate: '2024-07-29',
        location: 'Rome, Italy',
        type: 'city',
    },
]

export const getDummyTrips = () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(dummyTrips)
        }, 500)
    })

export const getDummyTripById = id =>
    new Promise(resolve => {
        setTimeout(() => {
            const trip = dummyTrips.find(t => t.id === parseInt(id, 10))
            
            resolve(trip || null)
        }, 300)
    })

export const getDummySegments = tripId =>
    new Promise(resolve => {
        setTimeout(() => {
            const segments = dummySegments.filter(
                s => s.tripId === parseInt(tripId, 10),
            )
            
            resolve(segments)
        }, 300)
    })
