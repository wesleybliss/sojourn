import Dexie from 'dexie'
import relationships from 'dexie-relationships'
import dexieCloud from 'dexie-cloud-addon'
import dexieCloudConfig from '../../dexie-cloud.json'

const db = new Dexie('trip-planner-basic', {
    addons: [
        relationships,
        dexieCloud,
    ],
})

// Primary key and indexed props
const table = (...columns) => [
    // '++id',
    '@id',
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

db.cloud.configure({
    databaseUrl: dexieCloudConfig.dbUrl,
    requireAuth: true,
})

export default db
