import { createSelector,createWire } from '@forminator/react-wire'
import { keys } from '@repo/shared/constants'
import { ShengenData, Theme } from '@repo/shared/types'
import { ID } from '@repo/shared/types/data'
import { Place, Plan, Segment, Trip } from '@repo/shared/types/database'
import { calculateTotalDays } from '@repo/shared/utils'
import { createPersistedWire } from 'react-wire-persisted'

export const theme = createPersistedWire<Theme>(keys.theme, 'light')

export const isSidebarExpanded = createPersistedWire<boolean>(keys.isSidebarExpanded, false)

export const trips = createWire<Trip[]>([])
export const currentTripId = createWire<ID | null>(null)
export const currentTrip = createSelector<Trip | null>({
    get: ({ get }) => get(trips)?.find(it => it.id === get(currentTripId)) || null,
})

export const currentPlans = createSelector<Plan[]>({
    get: ({ get }) => get(currentTrip)?.plans || [],
})
export const currentPlanId = createWire<ID | null>(null)
export const currentPlan = createSelector<Plan | null>({
    get: ({ get }) => get(currentPlans)?.find(it => it.id === get(currentPlanId)) || null,
})

export const currentSegments = createSelector<Segment[]>({
    get: ({ get }) => get(currentPlan)?.segments || [],
})

//

export const placesWithCoverImages = createWire<Place[]>([])
export const placeNamesToCoverImagesMap = createSelector<Record<string, { id: ID, url: string }>>({
    get: ({ get }) => get(placesWithCoverImages)?.reduce((acc, it) => ({
        ...acc,
        [it.name]: {
            id: it.id,
            url: it.coverImageUrl,
        },
    }), {}),
})

//

export const importTripStatus = createWire<string | null>(null)
export const importTripProgressMax = createWire<number | null>(null)
export const importTripProgressValue = createWire<number | null>(null)

export const showMap = createWire<boolean>(false)

export const isTripEditMode = createWire<boolean>(false)

export const isGanttChartLocked = createWire<boolean>(true)

//

export const shengenData = createSelector<ShengenData | null>({
    get: ({ get }) => {
        
        const shengenSegments = get(currentSegments)
            ?.filter(it => it.isShengenRegion)
        
        if (!shengenSegments.length)
            return null
        
        const { startDate, endDate, totalDays } = calculateTotalDays(
            shengenSegments[0].startDate as Date,
            shengenSegments[shengenSegments.length - 1].endDate as Date)
        
        const remainingDays = 89 - totalDays
        
        return {
            startDate,
            endDate,
            isOver: remainingDays < 0,
            totalDays,
            remainingDays,
        }
        
    },
})

//

export * from './dialogs'
