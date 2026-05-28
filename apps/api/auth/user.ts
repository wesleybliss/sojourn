import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import HttpError from '@repo/shared/errors/HttpError'
import { User } from '@repo/shared/types'
import { apiResponse } from '@repo/shared/utils/api'
import { authorize } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'

export default async function handler(request) {
  const { method } = request;

  if (method === 'GET') {
    try {
      const { user } = await authorize(request)
      return apiResponse.ok<{ user: Partial<User>, needsInviteCode: boolean }>({
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            photoUrl: user.photoUrl,
            enabled: user.enabled,
          },
          needsInviteCode: !user.enabled,
        },
      })
    } catch (e: unknown) {
      if (e instanceof HttpError)
        return apiResponse.fail((e as Error).message, e.status)

      console.error('Error in GET /api/auth/user:', e)
      return apiResponse.internalServerError()
    }
  } else if (method === 'POST') {
    try {
      const { user } = await authorize(request)
      const body = await request.json()
      const { inviteCode } = body

      if (!inviteCode)
        throw new HttpError(400, 'Invite code is required')

      const correctCode = process.env.INVITE_CODE

      if (!correctCode)
        throw new HttpError(500, 'Invite code system not configured')

      if (inviteCode !== correctCode)
        throw new HttpError(400, 'Invalid invite code')

      if (user.enabled)
        return apiResponse.ok<{ user: Partial<User>, needsInviteCode: boolean }>({
          message: 'User already enabled',
          data: {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              photoUrl: user.photoUrl,
              enabled: user.enabled,
            },
            needsInviteCode: false,
          },
        })

      // Enable the user
      const [updatedUser] = await db
        .update(schemas.users)
        .set({ enabled: true })
        .where(eq(schemas.users.id, user.id))
        .returning()

      return apiResponse.ok<{ user: Partial<User>, needsInviteCode: boolean }>({
        message: 'Account enabled successfully',
        data: {
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            name: updatedUser.name,
            photoUrl: updatedUser.photoUrl,
            enabled: updatedUser.enabled,
          },
          needsInviteCode: false,
        },
      })
    } catch (e: unknown) {
      if (e instanceof HttpError)
        return apiResponse.fail((e as Error).message, e.status)

      console.error('Error in POST /api/auth/user:', e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response('Method Not Allowed', { status: 405 })
  }
}