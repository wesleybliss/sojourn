import { createTablePostgres, lower, postgresOptsCascadeAll, timestampPostgres } from '@repo/shared/db/utils'
import { bigint, boolean, index, integer, primaryKey, real, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const users = createTablePostgres('users', {
    email: text('email').notNull(),
    firebaseUid: text('firebaseUid'), // Firebase UID for Google authentication
    enabled: boolean('enabled').default(false), // Beta access control
    name: text('name'), // User display name from Firebase
    photoUrl: text('photoUrl'), // User photo URL from Firebase
}, table => [
    uniqueIndex('emailUniqueIndex').on(lower(table.email)),
    uniqueIndex('firebaseUidUniqueIndex').on(table.firebaseUid),
])

export const teams = createTablePostgres('teams', {
    name: text('name').notNull(),
    description: text('description'),
})

export const userTeams = createTablePostgres('userTeams', {
    id: false,
    userId: integer('userId').notNull().references(() => users.id, postgresOptsCascadeAll),
    teamId: integer('teamId').notNull().references(() => teams.id, postgresOptsCascadeAll),
}, table => [
    primaryKey({ columns: [table.userId, table.teamId] }),
])

export const trips = createTablePostgres('trips', {
    teamId: integer('teamId').notNull().references(() => teams.id, postgresOptsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
    coverImageUrl: text('coverImageUrl'),
})

export const plans = createTablePostgres('plans', {
    tripId: integer('tripId').notNull().references(() => trips.id, postgresOptsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
})

export const segments = createTablePostgres('segments', {
    tripId: integer('tripId').notNull().references(() => trips.id, postgresOptsCascadeAll),
    planId: integer('planId').notNull().references(() => plans.id, postgresOptsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
    startDate: timestampPostgres('startDate').notNull(),
    endDate: timestampPostgres('endDate').notNull(),
    coordsLat: real('coordsLat'),
    coordsLng: real('coordsLng'),
    color: text('color').notNull(),
    flightBooked: boolean('flightBooked').default(false).notNull(),
    stayBooked: boolean('stayBooked').default(false).notNull(),
    isShengenRegion: boolean('isShengenRegion').default(false).notNull(),
})

// Read-only source of cities data
// When adding a place, some info is copied to the `places` table
export const geonamesCities = createTablePostgres('geonamesCities', {
    name: varchar('name', { length: 200 }),
    asciiName: varchar('asciiName', { length: 200 }),
    alternateNames: text('alternateNames'),
    latitude: real('latitude'),
    longitude: real('longitude'),
    featureClass: varchar('featureClass', { length: 1 }),
    featureCode: varchar('featureCode', { length: 10 }),
    countryCode: varchar('countryCode', { length: 2 }),
    /*cc2: text('cc2', { length: 200 }),
    admin1Code: text('admin1Code', { length: 20 }),
    admin2Code: text('admin2Code', { length: 80 }),
    admin3Code: text('admin3Code', { length: 20 }),
    admin4Code: text('admin4Code', { length: 20 }),*/
    population: bigint('population', { mode: 'number' }),
    /*elevation: integer('elevation'),
    dem: integer('dem'),*/
    timezone: varchar('timezone', { length: 40 }),
    /*modificationDate: text('modificationDate'),*/
}, table => [
    // Regular indexes for SQLite
    index('idx_geonames_name').on(table.name),
    index('idx_geonames_ascii_name').on(table.asciiName),
    index('idx_geonames_country_code').on(table.countryCode),
    index('idx_geonames_population').on(table.population),
    
    // Keep for reference: alternate names exceed btree size, so don't use this
    // index('idx_geonames_alternate_names').on(table.alternateNames),
    
    // Composite index for common query patterns
    index('idx_country_population').on(table.countryCode, table.population),
])

// @todo higher level "org" to keep places under
// When adding a place, some info is copied from the `geonamesCities` table
// Aside from that, the user can also create arbitrary named places
export const places = createTablePostgres('places', {
    teamId: integer('teamId').references(() => teams.id, postgresOptsCascadeAll),
    geonamesCityId: integer('geonamesCityId').references(() => geonamesCities.id, postgresOptsCascadeAll),
    name: text('name').notNull(),
    coverImageUrl: text('coverImageUrl'),
    focus: text('focus'),
    quickTip: text('quickTip'),
    personalNotes: text('personalNotes'),
    region: text('region'),
    travelWindow: text('travelWindow'),
    isBookmarked: boolean('isBookmarked').default(false).notNull(),
    coordsLat: real('coordsLat'),
    coordsLng: real('coordsLng'),
}, table => [
    uniqueIndex('places_teamId_geonamesCityId_idx').on(table.teamId, table.geonamesCityId),
])

/*
SQLite Reference:
time: text('time').default(sql`(CURRENT_TIME)`),
date: text('date').default(sql`(CURRENT_DATE)`),
timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
*/
