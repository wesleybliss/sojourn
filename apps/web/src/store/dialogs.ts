
import { createSelector,createWire } from '@forminator/react-wire'
import { keys } from '@repo/shared/constants'
import { createPersistedWire } from 'react-wire-persisted'

export const newProjectDialogOpen = createWire<boolean>(false)
export const deleteProjectDialogOpen = createWire<boolean>(false)
