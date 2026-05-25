import { useState, useMemo, useEffect, Dispatch, SetStateAction } from 'react'
import { throttledQueue, seconds } from 'throttled-queue'
import { usePlacesQuery } from '@/lib/queries/places'
import { abortableFetch } from '@repo/shared/utils'
import { PendingFetchRequest, Place, Segment } from '@repo/shared/types'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

const throttle = throttledQueue({
    maxPerInterval: 3,
    interval: seconds(2),
})

export type TThrottledPlacePhotos = {
    // State
    progressMax: number
    setProgressMax: Dispatch<SetStateAction<number>>
    progressValue: number
    setProgressValue: Dispatch<SetStateAction<number>>
    
    // Queries
    places: Place[]
    placesError: unknown
    placesLoading: boolean
    placesRefetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Place[], Error>>
    
    // Memos
    progressPercent: number
}

const useThrottledPlacePhotos = (
    segments: Segment[],
): TThrottledPlacePhotos => {
    
    const [progressMax, setProgressMax] = useState<number>(0)
    const [progressValue, setProgressValue] = useState(0)
    
    const {
        data: places,
        error: placesError,
        isLoading: placesLoading,
        refetch: placesRefetch,
    } = usePlacesQuery()
    
    const progressPercent = useMemo(() => (
        progressMax > 0 ? (progressValue / progressMax) * 100 : 0
    ), [progressMax, progressValue])
    
    // @todo
    // - fetch places
    // - compare places with segment names
    // - get array of all segments missing place images
    // - throttle image fetches for those places, creating them via /api/places post
    // - return a list so we can match segs to places w/images by name
    
    useEffect(() => {
        
        if (!segments?.length || !places?.length)
            return
        
        const placeNames = places.map((it: Place) => it.name)
        const segmentNames = segments.map(it => it.name)
        const missingPlaces = segmentNames
            .filter(it => {
                console.log(it, (placeNames.includes(it) ? '✓' : 'x'))
                return !placeNames.includes(it)
            })
        
        console.log('throttle pic, missing', missingPlaces.length, 'of', segmentNames.length)
        
        if (!missingPlaces.length)
            return
        
        const requests: PendingFetchRequest[] = []
        
        setProgressMax(missingPlaces.length)
        setProgressValue(0)
        
        const promises = missingPlaces.map(name => throttle(() => {
            
            // return fetch('https://api.github.com/search/users?q=shaunpersad');
            
            const request = abortableFetch('/api/places', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                }),
            })
            
            const index = requests.push(request) - 1
            
            request.promise
                .then(it => {
                    requests.splice(index, 1)
                    setProgressValue(v => v + 1)
                    return it
                })
                .catch(e => {
                    console.error('useThrottledPlacePhotos fetch error', e)
                    setProgressValue(v => v + 1)
                })
            
            return request.promise
            
        }))
        
        Promise.all(promises).then(() => {
            setProgressMax(0)
            setProgressValue(0)
        })
        
        return () => {
            requests.forEach(it => it.abort)
        }
        
    }, [segments, places])
    
    return {
        
        // State
        progressMax,
        setProgressMax,
        progressValue,
        setProgressValue,
        
        // Queries
        places,
        placesError,
        placesLoading,
        placesRefetch,
        
        // Memos
        progressPercent,
        
    }
    
}

export default useThrottledPlacePhotos
