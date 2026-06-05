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

router.get('/',
    asyncHandler(getPlans),
)

router.post('/',
    asyncHandler(createPlan),
)

router.get('/:planId',
    middleware.authorizePlan,
    asyncHandler(getPlan),
)

router.put('/:planId',
    middleware.authorizePlan,
    asyncHandler(updatePlan),
)

router.post('/:planId/clone',
    middleware.authorizePlan,
    asyncHandler(clonePlan),
)

router.delete('/:planId',
    middleware.authorizePlan,
    asyncHandler(deletePlan),
)


export default router
