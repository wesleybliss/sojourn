import Dexie from 'dexie'

const db = new Dexie('trip-planner-basic')

// Primary key and indexed props
const table = (...columns) => [
    '++id',
    'createdAt',
    'updatedAt',
    ...columns,
].join(', ')

const schema = {
    trips: table(
        'name',
        'description',
        'startDate',
        'endDate',
    ),
    segments: table(
        'tripId',
        'name',
        'description',
        'startDate',
        'endDate',
        'location',
    ),
}

// console.log('dexie schema', schema)

db.version(1).stores(schema)

export default db
