import db from '@repo/shared/db/index'
import usersRepo from '@repo/shared/db/repos/users'
import * as schemas from '@repo/shared/db/schema'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { withAuthDeprecated } from '@repo/shared/utils/auth'

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  return withAuthDeprecated(async (_request, { auth }) => {
    try {
      const { userId } = auth

      const user = await usersRepo.findOneById(userId)

      if (!user)
        return apiResponseDeprecated.notFound('User not found')

      console.log('Clearing all database data...')

      // Delete all records from each table (in correct order due to foreign keys)
      await db.delete(schemas.segments)
      console.log('✅ Cleared segments table')

      await db.delete(schemas.plans)
      console.log('✅ Cleared plans table')

      await db.delete(schemas.trips)
      console.log('✅ Cleared trips table')

      return apiResponseDeprecated.okMessage('Database cleared successfully')
    } catch (e) {
      console.error('❌ Error clearing database:', e)
      return apiResponseDeprecated.internalServerError()
    }
  })(request, {})
}
