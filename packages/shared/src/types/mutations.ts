import { ID } from '@shared/types/data'
import { Place } from '@shared/types/database'
import { Plan, PlanInsert, Segment,Trip } from '@shared/types/database'

export type BackupTripsBody = {
    type: 'single' | 'multiple'
    tripId?: number | null
    tripIds?: (number | null)[] | null
}

export type UpdatePlaceBody = Partial<Place> & {
    id: ID
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
