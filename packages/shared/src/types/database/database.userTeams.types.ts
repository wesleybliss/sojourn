import * as schemas from '@repo/shared/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const userTeamInsertSchema = createInsertSchema(schemas.userTeams)
export const userTeamSelectSchema = createSelectSchema(schemas.userTeams)
export type UserTeam = InferSelectModel<typeof schemas.userTeams>
export type UserTeamSelect = z.infer<typeof userTeamSelectSchema>
export type UserTeamInsert = z.infer<typeof userTeamInsertSchema>
