import database from '@shared/db'
import * as schemas from '@shared/db/schema'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { SQLiteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema,createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export type Database = typeof database

export type Insert<T extends SQLiteTable> = InferInsertModel<T>
export type Select<T extends SQLiteTable> = InferSelectModel<T>
export const userInsertSchema = createInsertSchema(schemas.users)
export type User = InferSelectModel<typeof schemas.users>
export const userSelectSchema = createSelectSchema(schemas.users)
export type UserSelect = z.infer<typeof userSelectSchema>
export type UserInsert = z.infer<typeof userInsertSchema>

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
    userId: number
    name: string
    description?: string | null
    coverImageUrl?: string | null
    id?: number
}
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

export const segmentSelectSchema = createSelectSchema(schemas.segments)
export const segmentInsertSchema = createInsertSchema(schemas.segments)
export type Segment = InferSelectModel<typeof schemas.segments> & {
    startDate: Date
    endDate: Date
}
export type SegmentSelect = z.infer<typeof segmentSelectSchema> & {
    startDate: Date
    endDate: Date
    updatedAt: Date
    createdAt: Date
}
export type SegmentInsert = {
    name: string
    tripId: number
    planId: number
    startDate: Date | number | string
    endDate: Date | number | string
    color: string
    description?: string | null
    coordsLat?: number | null
    coordsLng?: number | null
    flightBooked?: boolean
    stayBooked?: boolean
    isShengenRegion?: boolean
    id?: number
}

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

export type RequiredPartialSegment = Omit<Partial<Segment>, 'startDate' | 'endDate'> & {
    name: string
    tripId: number
    planId: number
    startDate: Date
    endDate: Date
    color: string
}
