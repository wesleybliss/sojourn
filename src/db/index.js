import Dexie from 'dexie'
import relationships from 'dexie-relationships'
import dexieCloud from 'dexie-cloud-addon'
import dexieCloudConfig from '../../dexie-cloud.json'
import { deriveTableFields } from './dbUtils.js'

const db = new Dexie('trip-planner-basic', {
    addons: [
        relationships,
        dexieCloud,
    ],
})

/*
@     Dexie Cloud ?
++	  Auto-incremented primary key
&	  Unique
*	  Multi-entry index
[A+B] Compound index
*/

// Primary key and indexed props
const table = columns => [
    // '++id',
    '@id',
    'createdAt',
    'updatedAt',
    ...columns,
].join(', ')

export const schemas = {
    trips: [
        '&name',
        'description',
        'startDate',
        'endDate',
    ],
    plans: [
        'tripId -> trips.id',
        'name',
        'description',
    ],
    segments: [
        'tripId -> trips.id',
        'planId -> plans.id',
        'name',
        'description',
        'startDate',
        'endDate',
        'location',
        'coords.lat',
        'coords.lng',
        'color',
        'flightBooked',
        'stayBooked',
    ],
}

const schema = {
    trips: table(schemas.trips),
    plans: table(schemas.plans),
    segments: table(schemas.segments),
}

// console.log('dexie schema', schema)

export const tableFields = deriveTableFields(schemas)

// console.log('tableFields', tableFields)

db.version(1).stores(schema)

db.cloud.configure({
    databaseUrl: dexieCloudConfig.dbUrl,
    requireAuth: true,
})

export default db
