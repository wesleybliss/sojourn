import type { Dayjs } from 'dayjs'

import type { Trip } from '@/types/database'

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
