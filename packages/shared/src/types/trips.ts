import type { Trip } from '@shared/types/database'
import type { Dayjs } from 'dayjs'

export type TripWithSegmentCount = Trip & {
    segmentCount: number
}

export type ShengenData = {
    startDate: Dayjs
    endDate: Dayjs
    isOver: boolean
    totalDays: number
    remainingDays: number
}
