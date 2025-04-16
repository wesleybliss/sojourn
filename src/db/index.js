import Dexie from 'dexie'
import relationships from 'dexie-relationships'

const db = new Dexie('trip-planner-basic', {
    addons: [relationships],
})

// Primary key and indexed props
const table = (...columns) => [
    '++id',
    'createdAt',
    'updatedAt',
    ...columns,
].join(', ')

const schema = {
    trips: table(
        '&name',
        'description',
        'startDate',
        'endDate',
    ),
    segments: table(
        'tripId -> trips.id',
        '&name',
        'description',
        'startDate',
        'endDate',
        'location',
        'coords.lat',
        'coords.lng',
    ),
}

// console.log('dexie schema', schema)

db.version(1).stores(schema)

export default db
