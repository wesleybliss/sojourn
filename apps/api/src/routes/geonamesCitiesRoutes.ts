import express from 'express'

import * as middleware from '@/middleware'
import { searchGeonamesCities } from '#handlers/geonamesCities/searchGeonamesCities'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.get('/search', asyncHandler(searchGeonamesCities))

export default router
