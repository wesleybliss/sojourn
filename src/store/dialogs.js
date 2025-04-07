/* eslint-disable no-unused-vars */
import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from '@/constants'

export const newProjectDialogOpen = createWire(false)
export const deleteProjectDialogOpen = createWire(false)
