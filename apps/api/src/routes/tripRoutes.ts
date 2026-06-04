import express from 'express'

import * as middleware from '@/middleware'
import { backupTrips } from '#handlers/trips/backupTrips'
import { createTrip } from '#handlers/trips/createTrip'
import { deleteTrip } from '#handlers/trips/deleteTrip'
import { getTrip } from '#handlers/trips/getTrip'
import { getTrips } from '#handlers/trips/getTrips'
import { inviteTripMember } from '#handlers/trips/inviteTripMember'
import { restoreTrips } from '#handlers/trips/restoreTrips'
import { updateTrip } from '#handlers/trips/updateTrip'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)
router.use(middleware.authorization)

router.get('/trips', asyncHandler(getTrips))
router.post('/trips', asyncHandler(createTrip))
router.post('/trips/backup', asyncHandler(backupTrips))
router.post('/trips/restore', asyncHandler(restoreTrips))
router.get('/trips/:tripId', asyncHandler(getTrip))
router.put('/trips/:tripId', asyncHandler(updateTrip))
router.delete('/trips/:tripId', asyncHandler(deleteTrip))
router.post('/trips/:tripId/invite', asyncHandler(inviteTripMember))

export default router
