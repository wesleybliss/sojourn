
export type ID = number

export type ItemWithId = Record<string, unknown> & { id: ID }

export type ItemWithName = ItemWithId & { name: string }

export type GanttChartItemPrimitive = ItemWithName & { color?: string }

export type SegmentGanttChart = GanttChartItemPrimitive & {
    startDate: Date
    endDate: Date
    totalDays: number
}

export type Coords = {
    lat: number
    lng: number
}

export type PendingFetchRequest = {
    promise: Promise<Response>
    abort: () => void
}

export interface ApiResult<T> {
    data?: T | null
    error?: string | null
    count?: number
    message?: string | undefined
}

export const SegmentStatusLabels = {
    Completed: 'Completed',
    Confirmed: 'Confirmed',
    Partial: 'Partial',
    Planning: 'Planning',
}

export type SegmentStatusLabel = typeof SegmentStatusLabels[keyof typeof SegmentStatusLabels]

export type WeatherSummary = {
    temperature: number
    label: string
}
