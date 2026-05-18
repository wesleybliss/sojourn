import { ID } from '@/types/data'
import { useQuery } from '@tanstack/react-query'
import { fetchJSON } from '@/lib/api'
import { updateItemArray } from '@/lib/storeUtils'
import * as store from '@/store'

export type BackupTripsBody = {
    type: 'single' | 'multiple'
    tripId?: number | null
    tripIds?: (number | null)[] | null
}

export type UpdatePlaceBody = {
    placeId: ID
    name?: string
    description?: string
    coverPhoto?: string
}

export type CreatePlanBody = PlanInsert & {
    tripId: ID
}

export type UpdatePlanBody = Partial<Plan> & {
    planId: ID
}

export type ClonePlanBody = {
    planId: ID
}

export type UpdateTripBody = Partial<Trip> & {
    tripId: ID
}

export type UpdateSegmentBody = Partial<Segment> & {
    tripId: ID
    planId: ID
    segmentId: ID
    cascadeEnabled?: boolean
}

export type DeleteSegmentsBody = {
    tripId: ID
    planId: ID
    segmentIds: ID[]
}

export type RenamePlanBody = {
    planId: ID
    name: string
}

export type DeletePlanBody = {
    planId: ID
}
