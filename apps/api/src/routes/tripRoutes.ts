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

router.get('/',
    asyncHandler(getTrips),
)

router.post('/',
    asyncHandler(createTrip),
)

router.post('/backup',
    asyncHandler(backupTrips),
)

router.post('/restore',
    asyncHandler(restoreTrips),
)

router.get('/:tripId',
    middleware.authorizeTrip,
    asyncHandler(getTrip),
)

router.put('/:tripId',
    middleware.authorizeTrip,
    asyncHandler(updateTrip),
)

router.delete('/:tripId',
    middleware.authorizeTrip,
    asyncHandler(deleteTrip),
)

router.post('/:tripId/invite',
    middleware.authorizeTrip,
    asyncHandler(inviteTripMember),
)

export default router
