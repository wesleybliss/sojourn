import express from 'express'

import * as middleware from '@/middleware'
import { createPlace } from '#handlers/places/createPlace'
import { deletePlace } from '#handlers/places/deletePlace'
import { deletePlaces } from '#handlers/places/deletePlaces'
import { getPlace } from '#handlers/places/getPlace'
import { getPlaces } from '#handlers/places/getPlaces'
import { updatePlace } from '#handlers/places/updatePlace'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.get('/places', asyncHandler(getPlaces))
router.post('/places', asyncHandler(createPlace))
router.get('/places/:placeId', asyncHandler(getPlace))
router.put('/places/:placeId', asyncHandler(updatePlace))
router.delete('/places', asyncHandler(deletePlaces))
router.delete('/places/:placeId', asyncHandler(deletePlace))

export default router
