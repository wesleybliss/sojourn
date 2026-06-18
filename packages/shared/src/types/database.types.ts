import database, { drizzle } from '@shared/db'
import * as schemas from '@shared/db/schema'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { PgTable } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export type BareDatabase = ReturnType<typeof drizzle>
export type Database = typeof database
export type Transaction = Parameters<Parameters<Database['transaction']>[0]>[0]

export type Insert<T extends PgTable> = InferInsertModel<T>
export type Select<T extends PgTable> = InferSelectModel<T>

export const userInsertSchema = createInsertSchema(schemas.users)
export const userSelectSchema = createSelectSchema(schemas.users)
export type User = InferSelectModel<typeof schemas.users>
export type UserSelect = z.infer<typeof userSelectSchema>
export type UserInsert = z.infer<typeof userInsertSchema>

export const teamInsertSchema = createInsertSchema(schemas.teams)
export const teamSelectSchema = createSelectSchema(schemas.teams)
export type Team = InferSelectModel<typeof schemas.teams> & {
    members?: User[]
}
export type TeamSelect = z.infer<typeof teamSelectSchema>
export type TeamInsert = z.infer<typeof teamInsertSchema>

export const userTeamInsertSchema = createInsertSchema(schemas.userTeams)
export const userTeamSelectSchema = createSelectSchema(schemas.userTeams)
export type UserTeam = InferSelectModel<typeof schemas.userTeams>
export type UserTeamSelect = z.infer<typeof userTeamSelectSchema>
export type UserTeamInsert = z.infer<typeof userTeamInsertSchema>

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
    id: true,
    teamId: true,
    createdAt: true,
    updatedAt: true,
})
export type CreateTripRequest =
    z.infer<typeof createTripRequestSchema>

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
export type Place = InferSelectModel<typeof schemas.places> & {
    focus: string | null
    quickTip: string | null
    personalNotes: string | null
    region: string | null
    travelWindow: string | null
    isBookmarked: boolean
    coordsLat?: number | null
    coordsLng?: number | null
}
export type PlaceSelect = z.infer<typeof placeSelectSchema>
export type PlaceInsert = z.infer<typeof placeInsertSchema> & {
    focus?: string | null
    quickTip?: string | null
    personalNotes?: string | null
    region?: string | null
    travelWindow?: string | null
    isBookmarked?: boolean
    coordsLat?: number | null
    coordsLng?: number | null
}

export const geonamesCitySelectSchema = createSelectSchema(schemas.geonamesCities)
export const geonamesCityInsertSchema = createInsertSchema(schemas.geonamesCities)
export type GeonamesCity = InferSelectModel<typeof schemas.geonamesCities> & {
    focus: string | null
    quickTip: string | null
    personalNotes: string | null
    region: string | null
    travelWindow: string | null
    isBookmarked: boolean
    coordsLat?: number | null
    coordsLng?: number | null
}
export type GeonamesCitySelect = z.infer<typeof geonamesCitySelectSchema>
export type GeonamesCityInsert = z.infer<typeof geonamesCityInsertSchema> & {
    focus?: string | null
    quickTip?: string | null
    personalNotes?: string | null
    region?: string | null
    travelWindow?: string | null
    isBookmarked?: boolean
    coordsLat?: number | null
    coordsLng?: number | null
}

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
