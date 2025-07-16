import { relations, sql } from 'drizzle-orm'
import {
    sqliteTable,
    primaryKey,
    text,
    integer,
} from 'drizzle-orm/sqlite-core'

// Creates a default timestamp field
const ts = name => integer(name, { mode: 'timestamp' })
    .default(sql`(unixepoch())`).notNull()

const timestamps = {
    updatedAt: ts('updatedAt'),
    createdAt: ts('createdAt'),
    // deletedAt: timestamp(),
}

const table = (name, props) => {
    
    if (!name?.length)
        throw new Error('Table name required')
    
    if (!Object.keys(props).length)
        throw new Error('Table properties required')
    
    const fields = {}
    
    if (props?.id === false)
        delete props.id
    else
        fields.id = integer('id').primaryKey({ autoIncrement: true })
    
    return sqliteTable(name, {
        ...fields,
        ...timestamps,
        ...props,
    })
    
}

export const users = table('users', {
    email: text('email').notNull(),
    password: text('password').notNull(),
})

export const teams = table('teams', {
    name: text('name').notNull(),
})

// Junction table for many-to-many relationship between users and teams
export const userTeams = table('userTeams', {
    id: false,
    userId: integer('userId').notNull().references(() => users.id, { onDelete: 'cascade' }),
    teamId: integer('teamId').notNull().references(() => teams.id, { onDelete: 'cascade' }),
    ...timestamps,
}, table => ({
    pk: primaryKey({
        columns: [
            table.userId,
            table.teamId,
        ],
    }),
}))

export const trips = table('trips', {
    teamId: integer('teamId').notNull().references(() => teams.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    description: text('description'),
    startDate: text('startDate'),
    endDate: text('endDate'),
})

export const plans = table('plans', {
    tripId: integer('tripId').notNull().references(() => trips.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    description: text('description'),
})

//

export const usersRelations = relations(users, ({ many }) => ({
    teams: many(userTeams),
}))

export const teamsRelations = relations(teams, ({ many }) => ({
    trips: many(trips),
    users: many(userTeams),
}))

export const tripsRelations = relations(trips, ({ one }) => ({
    team: one(teams, {
        fields: [trips.teamId],
        references: [teams.id],
    }),
}))

export const userTeamsRelations = relations(userTeams, ({ one }) => ({
    user: one(users, {
        fields: [userTeams.userId],
        references: [users.id],
    }),
    team: one(teams, {
        fields: [userTeams.teamId],
        references: [teams.id],
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
