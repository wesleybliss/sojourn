import * as schemas from '@repo/shared/db/schema'
import { User } from '@repo/shared/types/database/database.users.types'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const teamInsertSchema = createInsertSchema(schemas.teams)
export const teamSelectSchema = createSelectSchema(schemas.teams)
export type Team = InferSelectModel<typeof schemas.teams> & {
    members?: User[]
}
export type TeamSelect = z.infer<typeof teamSelectSchema>
export type TeamInsert = z.infer<typeof teamInsertSchema>
