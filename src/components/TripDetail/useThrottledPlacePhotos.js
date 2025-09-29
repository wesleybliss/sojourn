import { useState, useMemo, useEffect } from 'react'
import { throttledQueue, seconds } from 'throttled-queue'
import { usePlacesQuery } from '@/lib/queries/places'
import { abortableFetch, fakeAbortableFetch } from '@/lib/utils'

const throttle = throttledQueue({
    maxPerInterval: 3,
    interval: seconds(2),
})

const useThrottledPlacePhotos = segments => {
    
    const [progressMax, setProgressMax] = useState(0)
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
        
        const placeNames = places.map(it => it.name)
        const segmentNames = segments.map(it => it.name)
        const missingPlaces = segmentNames
            .filter(it => console.log(it, (placeNames.includes(it) ? '✓' : 'x'))|| !placeNames.includes(it))
        
        console.log('throttle pic, missing', missingPlaces.length, 'of', segmentNames.length)
        
        if (!missingPlaces.length)
            return
        
        const requests = []
        
        setProgressMax(missingPlaces.length)
        setProgressValue(0)
        
        missingPlaces.forEach(name => {
            
            throttle(() => {
                
                // return fetch('https://api.github.com/search/users?q=shaunpersad');
                
                const request = fakeAbortableFetch('/api/places', {
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
                
                return request
                
            })
            
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
