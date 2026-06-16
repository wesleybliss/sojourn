import { createWire } from '@forminator/react-wire'
import { ID } from '@repo/shared/types'

export const updateTeamDialogId = createWire<ID | null>(null)
export const inviteTeamMemberDialogTeamId = createWire<ID | null>(null)

export const createTripDialogOpen = createWire(false)
export const deleteTripDialogId = createWire<ID | null>(null)

export const createPlaceDialogOpen = createWire<boolean>(false)
export const deletePlacesDialogOpen = createWire<boolean>(false)
