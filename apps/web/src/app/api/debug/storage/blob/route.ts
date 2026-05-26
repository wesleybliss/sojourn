import { Buffer } from 'node:buffer'

import usersRepo from '@repo/shared/db/repos/users'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'
import { putPlaceImageBuffer } from '@repo/shared/utils/storage/vercel-blob'
import { NextRequest } from 'next/server'

export const POST = withAuth(async (request: NextRequest, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        if (!userId)
            return apiResponse.unauthorized()
        
        const user = await usersRepo.findOneById(userId)
        
        if (!user)
            return apiResponse.notFound('User not found')
        
        const { name, contentType, base64Data } = await request.json()
        
        if (!base64Data)
            return apiResponse.invalidParams('Param "base64Data" is required')
        
        // Remove prefix (if any)
        const matches = base64Data.match(/^data:(.+);base64,(.+)$/)
        const data = matches ? matches[2] : base64Data
        
        // Decode to Buffer
        const buffer = Buffer.from(data, 'base64')
        
        console.log('/debug/storage/blob authenticated user', userId, user.id, user.email)
        console.log('/debug/storage/blob uploading', buffer.length, 'bytes')
        
        const res = await putPlaceImageBuffer(name, contentType, buffer)
        
        return apiResponse.ok({ data: res })
        
    } catch (e) {
        
        console.error('Error uploading image to blob storage:', e)
        return apiResponse.internalServerError()
        
    }
    
})
