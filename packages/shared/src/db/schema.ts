import { createTablePostgres, lower, postgresOptsCascadeAll, timestampPostgres } from '@repo/shared/db/utils'
import { sql } from 'drizzle-orm'
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
    geonameId: integer('geonameId'),
    name: varchar('name', { length: 200 }).notNull(),
    asciiName: varchar('asciiName', { length: 200 }).notNull(),
    alternateNames: text('alternateNames'),
    latitude: real('latitude').notNull(),
    longitude: real('longitude').notNull(),
    featureClass: varchar('featureClass', { length: 1 }).notNull(),
    featureCode: varchar('featureCode', { length: 10 }),
    countryCode: varchar('countryCode', { length: 2 }),
    /*cc2: text('cc2', { length: 200 }),
    admin1Code: text('admin1Code', { length: 20 }),
    admin2Code: text('admin2Code', { length: 80 }),
    admin3Code: text('admin3Code', { length: 20 }),
    admin4Code: text('admin4Code', { length: 20 }),*/
    population: bigint('population', { mode: 'number' }).notNull(),
    /*elevation: integer('elevation'),
    dem: integer('dem'),*/
    timezone: varchar('timezone', { length: 40 }),
    /*modificationDate: text('modificationDate'),*/
}, table => [
    // Note: idx_geonames_name / idx_geonames_ascii_name (BTree) were dropped because
    // BTree indexes cannot speed up ILIKE '%term%' searches. The GIN trigram indexes
    // (idx_geonames_name_gin, idx_geonames_ascii_name_gin) created in the
    // postgres-init migration handle that case.
    // Note: idx_geonames_alternate_names (BTree) was dropped for the same reason;
    // the GIN trigram index idx_geonames_alternate_names_gin handles ILIKE.
    index('idx_geonames_country_code').on(table.countryCode),
    index('idx_geonames_population').on(table.population),
    
    // Composite index for common query patterns
    index('idx_country_population').on(table.countryCode, table.population),
    
    // Partial composite index optimized for the searchCitiesGIN query:
    //   WHERE featureClass IN ('A','P') AND countryCode = $1 AND population >= $2
    // Partial because the vast majority of useful cities have featureClass A or P,
    // so this shrinks the index and lets Postgres skip the featureClass filter
    // at runtime. Dropped in favor of BTree with DESC if ORDER BY population DESC
    // becomes a bottleneck at scale.
    index('idx_geonames_search_partial')
        .on(table.countryCode, table.population)
        .where(sql`${table.featureClass} IN ('A', 'P')`),
])

// When adding a place, some info is copied from the `geonamesCities` table
// Aside from that, the user can also create arbitrary named places
export const places = createTablePostgres('places', {
    teamId: integer('teamId').notNull().references(() => teams.id, postgresOptsCascadeAll),
    geonamesCityId: integer('geonamesCityId').notNull().references(() => geonamesCities.id, postgresOptsCascadeAll),
    name: text('name').notNull(),
    coverImageUrl: text('coverImageUrl'),
    focus: text('focus'),
    isBookmarked: boolean('isBookmarked').default(false).notNull(),
}, table => [
    uniqueIndex('places_teamId_geonamesCityId_idx').on(table.teamId, table.geonamesCityId),
])

export const placeNotes = createTablePostgres('placeNotes', {
    placeId: integer('placeId').notNull().references(() => places.id, postgresOptsCascadeAll),
    name: text('name').notNull(),
    content: text('content').notNull(),
}, table => [
    index('placeNotes_placeId_updatedAt_idx').on(table.placeId, table.updatedAt.desc()),
])

/*
SQLite Reference:
time: text('time').default(sql`(CURRENT_TIME)`),
date: text('date').default(sql`(CURRENT_DATE)`),
timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
*/
