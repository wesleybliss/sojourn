import express from 'express'

import * as middleware from '@/middleware'
import { clearAll } from '#handlers/debug/clearAll'
import { uploadBlob } from '#handlers/debug/storage/uploadBlob'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.post('/clear-all', asyncHandler(clearAll))
router.post('/storage/blob', asyncHandler(uploadBlob))

export default router
