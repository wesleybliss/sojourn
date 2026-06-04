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

router.get('/trips/:tripId/plans/:planId/segments',
    asyncHandler(getSegments),
)

router.post('/trips/:tripId/plans/:planId/segments',
    asyncHandler(createSegment),
)

router.get('/trips/:tripId/plans/:planId/segments/:segmentId',
    middleware.authorizeSegment,
    asyncHandler(getSegments),
)

router.put('/trips/:tripId/plans/:planId/segments/:segmentId',
    middleware.authorizeSegment,
    asyncHandler(updateSegment),
)

router.delete('/trips/:tripId/plans/:planId/segments',
    middleware.authorizeSegment,
    asyncHandler(deleteSegments),
)

router.delete('/trips/:tripId/plans/:planId/segments/:segmentId',
    middleware.authorizeSegment,
    asyncHandler(deleteSegment),
)

export default router
