import * as rwp from 'react-wire-persisted'

export const APP_NAME = 'Trip Planner'
export const APP_SLUG = 'trip-planner'

const { key, getPrefixedKeys } = rwp.utils

export const NS = 'trip-planner-basic'

//

key('theme')

key('trips')
key('currentTrip')

//

export const themes = ['light', 'dark']

const prefixedKeys = getPrefixedKeys(NS)

export { prefixedKeys as keys }

//

// Globally selected organization has changed
export const EVENT_CREATE_SEGMENT = 'EVENT_CREATE_SEGMENT'

export const EVENTS = [
    EVENT_CREATE_SEGMENT,
]
