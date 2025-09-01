import { useCallback } from 'react'
import { useSubscribe } from '@forminator/react-wire'
import { eventBus as storeEventBus } from '@/lib/eventBus.js'
import { EVENTS } from '@/constants.js'

/**
 * 
 * @param {string} eventName - one of @constants/events
 * @param {function} callback
 * @param {Array<*>} [dependencies] - optional dependencies for the useCallback
 */
const useEventSubscription = (eventName, callback, dependencies = []) => {
    
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
