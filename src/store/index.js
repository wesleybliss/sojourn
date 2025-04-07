// eslint-disable-next-line no-unused-vars
import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from '@/constants'

export const theme = createPersistedWire(keys.theme, 'dark')

//

export * from './dialogs'
export * from './trips'
