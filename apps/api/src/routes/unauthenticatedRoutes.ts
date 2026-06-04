import express from 'express'

import { getIndex } from '@/handlers/health'
import { asyncHandler } from '@/handlers/utils'

const router = express.Router()

router.get('/', asyncHandler(getIndex))
router.get('/health', asyncHandler(getIndex))

export default router
