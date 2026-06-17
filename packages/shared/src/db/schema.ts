import { createTableSQLite, lower, sqliteOptsCascadeAll, timestampSeconds } from '@repo/shared/db/utils'
import { index, integer, primaryKey, real, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const users = createTableSQLite('users', {
    email: text('email').notNull(),
    firebaseUid: text('firebaseUid'), // Firebase UID for Google authentication
    enabled: integer('enabled', { mode: 'boolean' }).default(false), // Beta access control
    name: text('name'), // User display name from Firebase
    photoUrl: text('photoUrl'), // User photo URL from Firebase
}, table => [
    uniqueIndex('emailUniqueIndex').on(lower(table.email)),
    uniqueIndex('firebaseUidUniqueIndex').on(table.firebaseUid),
])

export const teams = createTableSQLite('teams', {
    name: text('name').notNull(),
    description: text('description'),
})

export const userTeams = createTableSQLite('userTeams', {
    id: false,
    userId: integer('userId').notNull().references(() => users.id, sqliteOptsCascadeAll),
    teamId: integer('teamId').notNull().references(() => teams.id, sqliteOptsCascadeAll),
}, table => [
    primaryKey({ columns: [table.userId, table.teamId] }),
])

export const trips = createTableSQLite('trips', {
    teamId: integer('teamId').notNull().references(() => teams.id, sqliteOptsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
    coverImageUrl: text('coverImageUrl'),
})

export const plans = createTableSQLite('plans', {
    tripId: integer('tripId').notNull().references(() => trips.id, sqliteOptsCascadeAll),
    name: text('name').notNull(),
    description: text('description'),
})

export const segments = createTableSQLite('segments', {
    tripId: integer('tripId').notNull().references(() => trips.id, sqliteOptsCascadeAll),
    planId: integer('planId').notNull().references(() => plans.id, sqliteOptsCascadeAll),
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

// Read-only source of cities data
// When adding a place, some info is copied to the `places` table
export const geonamesCities = createTableSQLite('geonamesCities', {
    name: text('name', { length: 200 }),
    asciiName: text('asciiName', { length: 200 }),
    alternateNames: text('alternateNames'),
    latitude: real('latitude'),
    longitude: real('longitude'),
    featureClass: text('featureClass', { length: 1 }),
    featureCode: text('featureCode', { length: 10 }),
    countryCode: text('countryCode', { length: 2 }),
    /*cc2: text('cc2', { length: 200 }),
    admin1Code: text('admin1Code', { length: 20 }),
    admin2Code: text('admin2Code', { length: 80 }),
    admin3Code: text('admin3Code', { length: 20 }),
    admin4Code: text('admin4Code', { length: 20 }),*/
    population: integer('population', { mode: 'number' }),
    /*elevation: integer('elevation'),
    dem: integer('dem'),*/
    timezone: text('timezone', { length: 40 }),
    /*modificationDate: text('modificationDate'),*/
}, table => ({
    // Regular indexes for SQLite
    nameIdx: index('idx_geonames_name').on(table.name),
    asciiNameIdx: index('idx_geonames_ascii_name').on(table.asciiName),
    countryCodeIdx: index('idx_geonames_country_code').on(table.countryCode),
    populationIdx: index('idx_geonames_population').on(table.population),
    
    // SQLite doesn't support GIN indexes, but we can create regular indexes
    // for the columns we'll search on frequently
    alternateNamesIdx: index('idx_geonames_alternate_names').on(table.alternateNames),
    
    // Composite index for common query patterns
    countryPopulationIdx: index('idx_country_population').on(table.countryCode, table.population),
}))

// @todo higher level "org" to keep places under
// When adding a place, some info is copied from the `geonamesCities` table
// Aside from that, the user can also create arbitrary named places
export const places = createTableSQLite('places', {
    geonamesCityId: integer('geonamesCityId').references(() => geonamesCities.id, sqliteOptsCascadeAll),
    name: text('name').notNull(),
    coverImageUrl: text('coverImageUrl'),
    focus: text('focus'),
    quickTip: text('quickTip'),
    personalNotes: text('personalNotes'),
    region: text('region'),
    travelWindow: text('travelWindow'),
    isBookmarked: integer('isBookmarked', { mode: 'boolean' }).default(false).notNull(),
    coordsLat: real('coordsLat'),
    coordsLng: real('coordsLng'),
})

/*
SQLite Reference:
time: text('time').default(sql`(CURRENT_TIME)`),
date: text('date').default(sql`(CURRENT_DATE)`),
timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
*/
