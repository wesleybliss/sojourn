import { sqliteTable, timestamp, int, text } from 'drizzle-orm/sqlite-core'

/*
SQLite Reference:
time: text().default(sql`(CURRENT_TIME)`),
date: text().default(sql`(CURRENT_DATE)`),
timestamp: text().default(sql`(CURRENT_TIMESTAMP)`),
*/

const timestamps = {
    updatedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    // deletedAt: timestamp(),
}

const table = (name, props) => sqliteTable(name, {
    id: int().primaryKey({ autoIncrement: true }),
    ...timestamps,
    ...props,
})

export const users = table('users', {
    id: int().primaryKey({ autoIncrement: true }),
    email: text().notNull(),
    password: text().notNull(),
})

export const teams = table('teams', {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
})

export const trips = table('users', {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    description: text(),
    startDate: text(),
    endDate: text(),
})
