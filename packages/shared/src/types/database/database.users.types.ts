import * as schemas from '@shared/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const userInsertSchema = createInsertSchema(schemas.users)
export const userSelectSchema = createSelectSchema(schemas.users)
export type User = InferSelectModel<typeof schemas.users>
export type UserSelect = z.infer<typeof userSelectSchema>
export type UserInsert = z.infer<typeof userInsertSchema>
