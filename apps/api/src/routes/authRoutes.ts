import express from 'express'

import { createUser, getUser } from '@/handlers/auth'
import * as middleware from '@/middleware'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.get('/auth', asyncHandler(getUser))
router.post('/auth', asyncHandler(createUser))

export default router
