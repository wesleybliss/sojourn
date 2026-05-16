import { useCallback } from 'react'
import { useSubscribe } from '@forminator/react-wire'
import { eventBus as storeEventBus } from '@/lib/eventBus'
import { EVENTS } from '@/constants'

const useEventSubscription = (
    eventName: string,
    callback: (data: unknown | null) => unknown | Promise<unknown>,
    dependencies: never[] = [],
) => {
    
    if (!EVENTS.includes(eventName))
        throw new Error(`Invalid event "${eventName}"; must be one of ${EVENTS}`)
    
    return useSubscribe(storeEventBus, useCallback(async payload => {
        
        if (!payload) return
        
        if (payload.name === eventName) {
            
            const result = callback(payload.data)
            
            if (result instanceof Promise)
                await result
            
        }
        
        // eslint-disable-next-line react-compiler/react-compiler
    }, [eventName, callback].concat(dependencies)))
    
}

export default useEventSubscription
