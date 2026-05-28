import { Buffer } from 'node:buffer'

import usersRepo from '@repo/shared/db/repos/users'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { withAuthDeprecated } from '@repo/shared/utils/auth'
import { putPlaceImageBuffer } from '@repo/shared/utils/storage/vercel-blob'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'POST') {
    try {
      const { userId } = context.auth
      
      if (!userId)
        return apiResponseDeprecated.unauthorized()
      
      const user = await usersRepo.findOneById(userId)
      
      if (!user)
        return apiResponseDeprecated.notFound('User not found')
      
      const { name, contentType, base64Data } = await request.json()
      
      if (!base64Data)
        return apiResponseDeprecated.invalidParams('Param "base64Data" is required')
      
      // Remove prefix (if any)
      const matches = base64Data.match(/^data:(.+);base64,(.+)$/)
      const data = matches ? matches[2] : base64Data
      
      // Decode to Buffer
      const buffer = Buffer.from(data, 'base64')
      
      console.log('/debug/storage/blob authenticated user', userId, user.id, user.email)
      console.log('/debug/storage/blob uploading', buffer.length, 'bytes')
      
      const res = await putPlaceImageBuffer(name, contentType, buffer)
      
      return apiResponseDeprecated.ok({ data: res })
      
    } catch (e) {
      console.error('Error uploading image to blob storage:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default withAuthDeprecated(handler)
