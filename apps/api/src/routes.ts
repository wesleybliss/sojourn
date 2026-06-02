import type { NextFunction, Request, Response } from 'express'
import express from 'express'

import { createUser } from '#handlers/auth/createUser'
import { getUser } from '#handlers/auth/getUser'
import { clearAll } from '#handlers/debug/clearAll'
import { uploadBlob } from '#handlers/debug/storage/uploadBlob'
import { createPlace } from '#handlers/places/createPlace'
import { getPlace } from '#handlers/places/getPlace'
import { getPlaces } from '#handlers/places/getPlaces'
import { updatePlace } from '#handlers/places/updatePlace'
import { clonePlan } from '#handlers/plans/clonePlan'
import { deletePlan } from '#handlers/plans/deletePlan'
import { getPlan } from '#handlers/plans/getPlan'
import { updatePlan } from '#handlers/plans/updatePlan'
import { createSegment } from '#handlers/segments/createSegment'
import { deleteSegment } from '#handlers/segments/deleteSegment'
import { getSegments } from '#handlers/segments/getSegments'
import { updateSegment } from '#handlers/segments/updateSegment'
import { backupTrips } from '#handlers/trips/backupTrips'
import { getTrip } from '#handlers/trips/getTrip'
import { getTrips } from '#handlers/trips/getTrips'
import { inviteTripMember } from '#handlers/trips/inviteTripMember'
import { restoreTrips } from '#handlers/trips/restoreTrips'
import { getRandomPhoto } from '#handlers/utils/getRandomPhoto'

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
    
}

const router = express.Router()

router.get('/auth', asyncHandler(getUser))
router.post('/auth', asyncHandler(createUser))

router.post('/debug/clear-all', asyncHandler(clearAll))
router.post('/debug/storage/blob', asyncHandler(uploadBlob))

router.get('/trips', asyncHandler(getTrips))
router.post('/trips/backup', asyncHandler(backupTrips))
router.post('/trips/restore', asyncHandler(restoreTrips))
router.post('/trips/:tripId/invite', asyncHandler(inviteTripMember))
router.get('/trips/:tripId', asyncHandler(getTrip))

router.get('/plans/:planId', asyncHandler(getPlan))
router.put('/plans/:planId', asyncHandler(updatePlan))
router.post('/plans/:planId/clone', asyncHandler(clonePlan))
router.delete('/plans/:planId', asyncHandler(deletePlan))

router.get('/segments', asyncHandler(getSegments))
router.post('/segments', asyncHandler(createSegment))
router.put('/segments/:segmentId', asyncHandler(updateSegment))
router.delete('/segments', asyncHandler(deleteSegment)) // @todo bad url

router.get('/places', asyncHandler(getPlaces))
router.get('/places/:placeId', asyncHandler(getPlace))
router.post('/places', asyncHandler(createPlace))
router.put('/places/:placeId', asyncHandler(updatePlace))

router.get('/utils/random-photo', asyncHandler(getRandomPhoto))

export default router
