import * as rwp from 'react-wire-persisted'

export const APP_NAME = 'Sojourn'
export const APP_SLUG = 'sojourn'

const { key, getPrefixedKeys } = rwp.utils

export const NS = APP_SLUG

//

key('locale')
key('theme')
key('isSidebarExpanded')

key('currentTeamId')

key('trips')
key('currentTrip')

key('placesListViewMode')

key('weatherLastCheckedTimestamp')

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

export const weatherCodeMap: Record<number, string> = {
    0: 'Clear',
    1: 'Mostly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Fog',
    51: 'Drizzle',
    61: 'Rain',
    63: 'Rain',
    71: 'Snow',
    80: 'Showers',
    95: 'Storm',
}
