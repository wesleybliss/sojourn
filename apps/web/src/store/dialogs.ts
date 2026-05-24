/* eslint-disable no-unused-vars */
import { createWire, createSelector } from '@forminator/react-wire'
import { createPersistedWire } from 'react-wire-persisted'
import { keys } from '@repo/shared/constants'

export const newProjectDialogOpen = createWire<boolean>(false)
export const deleteProjectDialogOpen = createWire<boolean>(false)
