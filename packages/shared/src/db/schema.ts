import { lower, optsCascadeAll, table, timestamps, timestampSeconds } from '@repo/shared/db/dbUtils'
import { integer, primaryKey, real,text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const users = table('users', {
    email: text('email').notNull(),
    firebaseUid: text('firebaseUid'), // Firebase UID for Google authentication
    enabled: integer('enabled', { mode: 'boolean' }).default(false), // Beta access control
    name: text('name'), // User display name from Firebase
    photoUrl: text('photoUrl'), // User photo URL from Firebase
}, table => [
    uniqueIndex('emailUniqueIndex').on(lower(table.email)),
    uniqueIndex('firebaseUidUniqueIndex').on(table.firebaseUid),
])

export const trips = table('trips', {
    userId: integer('userId').notNull().references(() => users.id, optsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
    coverImageUrl: text('coverImageUrl'),
})

// Junction table for many-to-many relationship between users and trips
export const userTrips = table('userTrips', {
    id: false,
    userId: integer('userId').notNull().references(() => users.id, optsCascadeAll),
    tripId: integer('tripId').notNull().references(() => trips.id, optsCascadeAll),
    ...timestamps,
}, table => ({
    pk: primaryKey({
        columns: [
            table.userId,
            table.tripId,
        ],
    }),
}))

export const plans = table('plans', {
    tripId: integer('tripId').notNull().references(() => trips.id, optsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
})

export const segments = table('segments', {
    tripId: integer('tripId').notNull().references(() => trips.id, optsCascadeAll),
    planId: integer('planId').notNull().references(() => plans.id, optsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
    startDate: timestampSeconds('startDate').notNull(),
    endDate: timestampSeconds('endDate').notNull(),
    coordsLat: real('coordsLat'),
    coordsLng: real('coordsLng'),
    color: text('color').notNull(),
    flightBooked: integer('flightBooked', { mode: 'boolean' }).default(false).notNull(),
    stayBooked: integer('stayBooked', { mode: 'boolean' }).default(false).notNull(),
    isShengenRegion: integer('isShengenRegion', { mode: 'boolean' }).default(false).notNull(),
})

export const places = table('places', {
    name: text('name').notNull(),
    coverImageUrl: text('coverImageUrl'),
    focus: text('focus'),
    quickTip: text('quickTip'),
    personalNotes: text('personalNotes'),
    region: text('region'),
    travelWindow: text('travelWindow'),
    isBookmarked: integer('isBookmarked', { mode: 'boolean' }).default(false).notNull(),
})

/*
SQLite Reference:
time: text('time').default(sql`(CURRENT_TIME)`),
date: text('date').default(sql`(CURRENT_DATE)`),
timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
*/
