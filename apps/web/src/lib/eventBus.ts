import { createSelector, createWire } from '@forminator/react-wire'
import { EventBusPayload } from '@repo/shared/types'

/**
 * Global event bus for raising events that other components can consume.
 *
 * @see useEventSubscription for subscribing to events
 */

/**
 * Internal value of the global event bus.
 * Should not be read directly from outside this file.
 * Use the `postEvent` function to broadcast an event.
 */
const eventBusInternal = createWire<EventBusPayload | null>(null)

export const eventBus = createSelector<EventBusPayload | null>({
    get: ({ get }) => get(eventBusInternal),
})

/**
 * Post a new event to the event bus
 *
 * @param {string} name - must be one of `constants#EVENTS`
 * @param {*} [data] - optional data payload
 */
export const postEvent = (name: string, data: unknown) => {
    
    console.log('eventBus#postEvent', name, data)
    
    eventBusInternal.setValue({ name, data })
    
    // Automatically clear the last event right after,
    // since any consumers will already have a copy of the name & data
    /* setTimeout(() => {
        eventBusInternal.setValue(null)
    }, 100) */
    
}
