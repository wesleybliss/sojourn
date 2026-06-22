import database, { drizzle } from '@shared/db'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'

export type BareDatabase = ReturnType<typeof drizzle>
export type Database = typeof database
export type Transaction = Parameters<Parameters<Database['transaction']>[0]>[0]

export type Insert<T extends PgTable> = InferInsertModel<T>
export type Select<T extends PgTable> = InferSelectModel<T>

export * from './database/database.geonamesCities.types'
export * from './database/database.places.types'
export * from './database/database.plans.types'
export * from './database/database.segments.types'
export * from './database/database.teams.types'
export * from './database/database.trips.types'
export * from './database/database.users.types'
export * from './database/database.userTeams.types'
