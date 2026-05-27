import * as rwp from 'react-wire-persisted'

export const APP_NAME = 'Sojourn'
export const APP_SLUG = 'sojourn'

const { key, getPrefixedKeys } = rwp.utils

export const NS = 'sojourn'

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
