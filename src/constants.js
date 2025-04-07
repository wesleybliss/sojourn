import * as rwp from 'react-wire-persisted'

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
