import { z } from 'zod'
import { createSelectSchema, createInsertSchema } from 'drizzle-orm/zod'
import * as schemas from '@/db/schema'
import { InferSelectModel } from 'drizzle-orm'

export const userSelectSchema = createSelectSchema(schemas.users)
export const userInsertSchema = createInsertSchema(schemas.users)
export type User = InferSelectModel<typeof schemas.users>
export type UserSelect = z.infer<typeof userSelectSchema>
export type UserInsert = z.infer<typeof userInsertSchema>

export const tripSelectSchema = createSelectSchema(schemas.trips)
export const tripInsertSchema = createInsertSchema(schemas.trips)
export type Trip = InferSelectModel<typeof schemas.trips> & {
    plans?: Plan[]
    segments?: Segment[]
}
export type TripSelect = z.infer<typeof tripSelectSchema>
export type TripInsert = z.infer<typeof tripInsertSchema>
export const createTripRequestSchema = tripInsertSchema.omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
})
export type CreateTripRequest =
    z.infer<typeof createTripRequestSchema>

export const userTripSelectSchema = createSelectSchema(schemas.userTrips)
export const userTripInsertSchema = createInsertSchema(schemas.userTrips)

export const planSelectSchema = createSelectSchema(schemas.plans)
export const planInsertSchema = createInsertSchema(schemas.plans)
export type Plan = InferSelectModel<typeof schemas.plans> & {
    segments?: Segment[]
}
export type PlanSelect = z.infer<typeof planSelectSchema>
export type PlanInsert = z.infer<typeof planInsertSchema>

export const segmentSelectSchema = createSelectSchema(schemas.segments)
export const segmentInsertSchema = createInsertSchema(schemas.segments)
export type Segment = InferSelectModel<typeof schemas.segments>
export type SegmentSelect = z.infer<typeof segmentSelectSchema>
export type SegmentInsert = z.infer<typeof segmentInsertSchema>

export const placeSelectSchema = createSelectSchema(schemas.places)
export const placeInsertSchema = createInsertSchema(schemas.places)
export type Place = InferSelectModel<typeof schemas.places>
export type PlaceSelect = z.infer<typeof placeSelectSchema>
export type PlaceInsert = z.infer<typeof placeInsertSchema>

// Helper types
export type RequiredPartialTrip = Partial<Trip> & {
    userId: number
    name: string
}

export type RequiredPartialPlan = Partial<Plan> & {
    tripId: number
}

export type RequiredPartialSegment = Partial<Segment> & {
    name: string
    tripId: number
    planId: number
    startDate: unknown
    endDate: unknown
    color: string
}
