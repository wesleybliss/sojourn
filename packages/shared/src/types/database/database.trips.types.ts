import * as schemas from '@shared/db/schema'
import { Plan } from '@shared/types/database/database.plans.types'
import { Segment } from '@shared/types/database/database.segments.types'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const tripSelectSchema = createSelectSchema(schemas.trips)
export const tripInsertSchema = createInsertSchema(schemas.trips)
export type Trip = InferSelectModel<typeof schemas.trips> & {
    updatedAt: Date
    createdAt: Date
    plans?: Plan[]
    segments?: Segment[]
}
export type TripSelect = z.infer<typeof tripSelectSchema> & {
    updatedAt: Date
    createdAt: Date
}
export type TripInsert = {
    id?: number
    userId: number
    teamId: number
    name: string
    description?: string | null
    coverImageUrl?: string | null
}
export const createTripRequestSchema = tripInsertSchema.omit({
    teamId: true,
    createdAt: true,
    updatedAt: true,
})
export type CreateTripRequest = z.infer<typeof createTripRequestSchema>

export type RequiredPartialTrip = Partial<Trip> & {
    userId: number
    name: string
}
