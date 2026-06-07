import express from 'express'

import * as middleware from '@/middleware'
import { createTeam } from '#handlers/teams/createTeam'
import { deleteTeam } from '#handlers/teams/deleteTeam'
import { getTeam } from '#handlers/teams/getTeam'
import { getTeams } from '#handlers/teams/getTeams'
import { updateTeam } from '#handlers/teams/updateTeam'
import { asyncHandler } from '#handlers/utils/asyncHandler'

const router = express.Router()

router.use(middleware.authentication)

router.get('/', asyncHandler(getTeams))
router.post('/', asyncHandler(createTeam))
router.get('/:teamId', asyncHandler(getTeam))
router.put('/:teamId', asyncHandler(updateTeam))
router.delete('/:teamId', asyncHandler(deleteTeam))

export default router
