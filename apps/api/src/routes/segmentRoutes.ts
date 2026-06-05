import express from 'express'

import * as middleware from '@/middleware'
import { createSegment } from '#handlers/segments/createSegment'
import { deleteSegment } from '#handlers/segments/deleteSegment'
import { deleteSegments } from '#handlers/segments/deleteSegments'
import { getSegments } from '#handlers/segments/getSegments'
import { updateSegment } from '#handlers/segments/updateSegment'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)
router.use(middleware.authorizePlan)

router.get('/',
    asyncHandler(getSegments),
)

router.post('/',
    asyncHandler(createSegment),
)

router.get('/:segmentId',
    middleware.authorizeSegment,
    asyncHandler(getSegments),
)

router.put('/:segmentId',
    middleware.authorizeSegment,
    asyncHandler(updateSegment),
)

router.delete('/',
    middleware.authorizeSegment,
    asyncHandler(deleteSegments),
)

router.delete('/:segmentId',
    middleware.authorizeSegment,
    asyncHandler(deleteSegment),
)

export default router
