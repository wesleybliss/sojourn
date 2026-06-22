import * as schemas from '@shared/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const geonamesCitySelectSchema = createSelectSchema(schemas.geonamesCities)
export const geonamesCityInsertSchema = createInsertSchema(schemas.geonamesCities)
export type GeonamesCity = InferSelectModel<typeof schemas.geonamesCities>
export type GeonamesCitySelect = z.infer<typeof geonamesCitySelectSchema>
export type GeonamesCityInsert = z.infer<typeof geonamesCityInsertSchema>
