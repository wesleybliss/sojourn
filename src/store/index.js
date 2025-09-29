import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from '@/constants'
import { calculateTotalDays } from '@/lib/utils'

export const theme = createPersistedWire(keys.theme, 'light')

export const trips = createWire([])
export const currentTripId = createWire(null)
export const currentTrip = createSelector({
    get: ({ get }) => get(trips)?.find(it => it.id === get(currentTripId)) || null,
})

export const currentPlans = createSelector({
    get: ({ get }) => get(currentTrip)?.plans || [],
})
export const currentPlanId = createWire(null)
export const currentPlan = createSelector({
    get: ({ get }) => get(currentPlans)?.find(it => it.id === get(currentPlanId)) || null,
})

export const currentSegments = createSelector({
    get: ({ get }) => get(currentPlan)?.segments || [],
})

//

export const placesWithCoverImages = createWire([])
export const placeNamesToCoverImagesMap = createSelector({
    get: ({ get }) => get(placesWithCoverImages)?.reduce((acc, it) => ({
        ...acc,
        [it.name]: it.coverImageUrl,
    }), {}),
})

//

export const importTripStatus = createWire(null)
export const importTripProgressMax = createWire(null)
export const importTripProgressValue = createWire(null)

export const showMap = createWire(false)

export const isTripEditMode = createWire(false)

//

export const shengenData = createSelector({
    get: ({ get }) => {
        
        const shengenSegments = get(currentSegments)
            ?.filter(it => it.isShengenRegion)
        
        if (!shengenSegments.length)
            return null
        
        const { startDate, endDate, totalDays } = calculateTotalDays(
            shengenSegments[0].startDate,
            shengenSegments[shengenSegments.length - 1].endDate)
        
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
