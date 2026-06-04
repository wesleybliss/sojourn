import express from 'express'

import * as middleware from '@/middleware'
import { asyncHandler } from '#handlers/utils/asyncHandler'
import { getRandomPhoto } from '#handlers/utils/getRandomPhoto'

const router = express.Router()

router.use(middleware.authentication)

router.get('/utils/random-photo', asyncHandler(getRandomPhoto))

export default router
