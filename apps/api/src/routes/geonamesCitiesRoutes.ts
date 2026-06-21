import express from 'express'

import * as middleware from '@/middleware'
import { getGeonamesCities } from '#handlers/geonamesCities/getGeonamesCities'
import { getGeonamesCity } from '#handlers/geonamesCities/getGeonamesCity'
import { searchGeonamesCities } from '#handlers/geonamesCities/searchGeonamesCities'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.get('/', asyncHandler(getGeonamesCities))
router.get('/:id', asyncHandler(getGeonamesCity))
router.get('/search', asyncHandler(searchGeonamesCities))

export default router
