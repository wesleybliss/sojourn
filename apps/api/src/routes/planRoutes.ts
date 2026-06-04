import express from 'express'

import * as middleware from '@/middleware'
import { clonePlan } from '#handlers/plans/clonePlan'
import { createPlan } from '#handlers/plans/createPlan'
import { deletePlan } from '#handlers/plans/deletePlan'
import { getPlan } from '#handlers/plans/getPlan'
import { getPlans } from '#handlers/plans/getPlans'
import { updatePlan } from '#handlers/plans/updatePlan'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)
router.use(middleware.authorizeTrip)

router.get('/trips/:tripId/plans',
    asyncHandler(getPlans),
)

router.post('/trips/:tripId/plans',
    asyncHandler(createPlan),
)

router.get('/trips/:tripId/plans/:planId',
    middleware.authorizePlan,
    asyncHandler(getPlan),
)

router.put('/trips/:tripId/plans/:planId',
    middleware.authorizePlan,
    asyncHandler(updatePlan),
)

router.post('/trips/:tripId/plans/:planId/clone',
    middleware.authorizePlan,
    asyncHandler(clonePlan),
)

router.delete('/trips/:tripId/plans/:planId',
    middleware.authorizePlan,
    asyncHandler(deletePlan),
)


export default router
