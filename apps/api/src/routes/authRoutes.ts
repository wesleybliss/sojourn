import express from 'express'

import { createUser, getUser } from '@/handlers/auth'
import * as middleware from '@/middleware'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.get('/', asyncHandler(getUser))
router.post('/', asyncHandler(createUser))

export default router
