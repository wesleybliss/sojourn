import { relations, sql } from 'drizzle-orm'
import { primaryKey, uniqueIndex, text, integer, real } from 'drizzle-orm/sqlite-core'
import { timestamps, table, lower, optsCascadeAll } from './dbUtils.js'

export const users = table('users', {
    email: text('email').notNull(),
    password: text('password').notNull(),
}, table => [
    uniqueIndex('emailUniqueIndex').on(lower(table.email)),
])

export const trips = table('trips', {
    name: text('name').notNull(),
    description: text('description'),
    startDate: text('startDate'),
    endDate: text('endDate'),
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
    startDate: integer('startDate', { mode: 'timestamp' }).notNull(),
    endDate: integer('endDate', { mode: 'timestamp' }).notNull(),
    coordsLat: real('coordsLat'),
    coordsLng: real('coordsLng'),
    color: text('color').notNull(),
    flightBooked: integer('flightBooked', { mode: 'boolean' }).default(false).notNull(),
    stayBooked: integer('stayBooked', { mode: 'boolean' }).default(false).notNull(),
    isShengenRegion: integer('isShengenRegion', { mode: 'boolean' }).default(false).notNull(),
})

// Relations

export const usersRelations = relations(users, ({ many }) => ({
    trips: many(userTrips, { relationName: 'userTrips' }), // Enables someUser.trips
}))

export const tripsRelations = relations(trips, ({ many }) => ({
    members: many(userTrips, { relationName: 'userTrips' }), // Enables someTrip.members
    plans: many(plans),
    segments: many(segments),
}))

export const userTripsRelations = relations(userTrips, ({ one }) => ({
    user: one(users, {
        fields: [userTrips.userId],
        references: [users.id],
        relationName: 'userTrips',
    }),
    trip: one(trips, {
        fields: [userTrips.tripId],
        references: [trips.id],
        relationName: 'userTrips',
    }),
}))

export const plansRelations = relations(plans, ({ one, many }) => ({
    trip: one(trips, {
        fields: [plans.tripId],
        references: [trips.id],
    }),
    segments: many(segments),
}))

export const segmentsRelations = relations(segments, ({ one }) => ({
    trip: one(trips, {
        fields: [segments.tripId],
        references: [trips.id],
    }),
    plan: one(plans, {
        fields: [segments.planId],
        references: [plans.id],
    }),
}))

//

export const updateTimestampTrigger = tableName => sql`
    CREATE TRIGGER update_${tableName}_timestamp
    AFTER UPDATE ON ${tableName}
    FOR EACH ROW
    BEGIN
      UPDATE ${tableName} SET updatedAt = CURRENT_TIMESTAMP WHERE id = OLD.id;
    END;
`

/*
SQLite Reference:
time: text('time').default(sql`(CURRENT_TIME)`),
date: text('date').default(sql`(CURRENT_DATE)`),
timestamp: text('timestamp').default(sql`(CURRENT_TIMESTAMP)`),
*/
