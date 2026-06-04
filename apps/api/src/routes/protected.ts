import express from 'express'

import { createUser, getUser } from '@/handlers/auth'
import * as middleware from '@/middleware'
import { clearAll } from '#handlers/debug/clearAll'
import { uploadBlob } from '#handlers/debug/storage/uploadBlob'
import { createPlace } from '#handlers/places/createPlace'
import { deletePlace } from '#handlers/places/deletePlace'
import { deletePlaces } from '#handlers/places/deletePlaces'
import { getPlace } from '#handlers/places/getPlace'
import { getPlaces } from '#handlers/places/getPlaces'
import { updatePlace } from '#handlers/places/updatePlace'
import { clonePlan } from '#handlers/plans/clonePlan'
import { createPlan } from '#handlers/plans/createPlan'
import { deletePlan } from '#handlers/plans/deletePlan'
import { getPlan } from '#handlers/plans/getPlan'
import { getPlans } from '#handlers/plans/getPlans'
import { updatePlan } from '#handlers/plans/updatePlan'
import { createSegment } from '#handlers/segments/createSegment'
import { deleteSegment } from '#handlers/segments/deleteSegment'
import { deleteSegments } from '#handlers/segments/deleteSegments'
import { getSegments } from '#handlers/segments/getSegments'
import { updateSegment } from '#handlers/segments/updateSegment'
import { backupTrips } from '#handlers/trips/backupTrips'
import { createTrip } from '#handlers/trips/createTrip'
import { deleteTrip } from '#handlers/trips/deleteTrip'
import { getTrip } from '#handlers/trips/getTrip'
import { getTrips } from '#handlers/trips/getTrips'
import { inviteTripMember } from '#handlers/trips/inviteTripMember'
import { restoreTrips } from '#handlers/trips/restoreTrips'
import { updateTrip } from '#handlers/trips/updateTrip'
import { asyncHandler } from '#handlers/utils/asyncHandler'
import { getRandomPhoto } from '#handlers/utils/getRandomPhoto'

const router = express.Router()

router.use(middleware.authentication)

router.get('/auth', asyncHandler(getUser))
router.post('/auth', asyncHandler(createUser))

router.post('/debug/clear-all', asyncHandler(clearAll))
router.post('/debug/storage/blob', asyncHandler(uploadBlob))

router.get('/trips', asyncHandler(getTrips))
router.post('/trips', asyncHandler(createTrip))
router.post('/trips/backup', asyncHandler(backupTrips))
router.post('/trips/restore', asyncHandler(restoreTrips))
router.get('/trips/:tripId', asyncHandler(getTrip))
router.put('/trips/:tripId', asyncHandler(updateTrip))
router.delete('/trips/:tripId', asyncHandler(deleteTrip))  // ADD THIS - likely needed
router.post('/trips/:tripId/invite', asyncHandler(inviteTripMember))

router.get('/trips/:tripId/plans', asyncHandler(getPlans))
router.post('/trips/:tripId/plans', asyncHandler(createPlan))
router.get('/trips/:tripId/plans/:planId', asyncHandler(getPlan))
router.put('/trips/:tripId/plans/:planId', asyncHandler(updatePlan))
router.post('/trips/:tripId/plans/:planId/clone', asyncHandler(clonePlan))
router.delete('/trips/:tripId/plans/:planId', asyncHandler(deletePlan))

router.get('/trips/:tripId/plans/:planId/segments', asyncHandler(getSegments))
router.post('/trips/:tripId/plans/:planId/segments', asyncHandler(createSegment))
router.get('/trips/:tripId/plans/:planId/segments/:segmentId', asyncHandler(getSegments))
router.put('/trips/:tripId/plans/:planId/segments/:segmentId', asyncHandler(updateSegment))
router.delete('/trips/:tripId/plans/:planId/segments', asyncHandler(deleteSegments))
router.delete('/trips/:tripId/plans/:planId/segments/:segmentId', asyncHandler(deleteSegment))

router.get('/places', asyncHandler(getPlaces))
router.post('/places', asyncHandler(createPlace))
router.get('/places/:placeId', asyncHandler(getPlace))
router.put('/places/:placeId', asyncHandler(updatePlace))
router.delete('/places', asyncHandler(deletePlaces))
router.delete('/places/:placeId', asyncHandler(deletePlace))

router.get('/utils/random-photo', asyncHandler(getRandomPhoto))

export default router
