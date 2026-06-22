import * as schemas from '@shared/db/schema'
import { Segment } from '@shared/types/database/database.segments.types'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const planSelectSchema = createSelectSchema(schemas.plans)
export const planInsertSchema = createInsertSchema(schemas.plans)
export type Plan = InferSelectModel<typeof schemas.plans> & {
    updatedAt: Date
    createdAt: Date
    segments?: Segment[]
}
export type PlanSelect = z.infer<typeof planSelectSchema> & {
    updatedAt: Date
    createdAt: Date
}
export type PlanInsert = {
    name: string
    tripId: number
    description?: string | null
    id?: number
}

export type RequiredPartialPlan = Partial<Plan> & {
    tripId: number
}
