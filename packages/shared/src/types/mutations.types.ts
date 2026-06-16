import type { ID } from '@shared/types/data.types'
import type { Place, Team, TripInsert } from '@shared/types/database.types'
import type { Plan, PlanInsert, Segment,Trip } from '@shared/types/database.types'

export type UpdateTeamBody = Partial<Omit<Team, 'createdAt' | 'updatedAt'>> & {
    id: ID
    name: string
    description?: string
}

export type CreateTripBody = Omit<TripInsert, 'userId'>

export type UpdateTripBody = Partial<Trip> & {
    id: ID
}

export type BackupTripsBody = {
    type: 'single' | 'multiple'
    tripId?: number | null
    tripIds?: (number | null)[] | null
}

export type UpdatePlaceBody = Partial<Place> & {
    id: ID
    name?: string | null
    coverImageUrl?: string | null
    focus?: string | null
    quickTip?: string | null
    personalNotes?: string | null
    region?: string | null
    travelWindow?: string | null
    isBookmarked?: boolean
}

export type CreatePlanBody = PlanInsert & {
    tripId: ID
}

export type UpdatePlanBody = Partial<Plan> & {
    tripId: ID
    planId: ID
}

export type ClonePlanBody = {
    tripId: ID
    planId: ID
}

export type UpdateSegmentBody = Partial<Segment> & {
    tripId: ID
    planId: ID
    segmentId: ID
    cascadeEnabled?: boolean
}

export type DeleteSegmentBody = {
    tripId: ID
    planId: ID
    segmentId: ID
}

export type DeleteSegmentsBody = {
    tripId: ID
    planId: ID
    segmentIds: ID[]
}

export type DeletePlanBody = {
    tripId: ID
    planId: ID
}

export type DeletePlacesBody = {
    placeIds: ID[]
}
