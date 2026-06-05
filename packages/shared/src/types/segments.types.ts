import { ID } from '@shared/types/data.types'

export const SegmentStatuses = {
    confirmed: 'confirmed',
    waitlist: 'waitlist',
    actionNeeded: 'actionNeeded',
}

export type SegmentStatus = typeof SegmentStatuses[keyof typeof SegmentStatuses]

export type RecentUpdate = {
    tripId: ID
    tripName: string
    planName: string
    segmentName: string
    updatedAt: Date
    status: SegmentStatus
    dateRange: string
}
