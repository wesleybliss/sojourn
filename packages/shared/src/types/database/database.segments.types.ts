import * as schemas from '@repo/shared/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

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

export type RequiredPartialSegment = Omit<Partial<Segment>, 'startDate' | 'endDate'> & {
    name: string
    tripId: number
    planId: number
    startDate: Date
    endDate: Date
    color: string
}
