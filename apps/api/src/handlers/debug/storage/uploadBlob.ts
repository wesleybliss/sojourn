import { Buffer } from 'node:buffer'

import usersRepo from '@repo/shared/db/repos/users'
import { apiResponse } from '@repo/shared/utils/api'
import { AuthContext, withAuth } from '@repo/shared/utils/auth'
import { putPlaceImageBuffer } from '@repo/shared/utils/storage/vercel-blob'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export const uploadBlob = withAuth(async (
    req: VercelRequest,
    res: VercelResponse,
    context: AuthContext,
): Promise<VercelResponse> => {
    
    try {
        
        const { userId } = context
        
        if (!userId)
            return apiResponse.unauthorized(res)
        
        const user = await usersRepo.findOneById(userId)
        
        if (!user)
            return apiResponse.notFound(res, 'User not found')
        
        const { name, contentType, base64Data } = req.body
        
        if (!base64Data)
            return apiResponse.invalidParams(res, 'Param "base64Data" is required')
        
        // Remove prefix (if any)
        const matches = base64Data.match(/^data:(.+);base64,(.+)$/)
        const data = matches ? matches[2] : base64Data
        
        // Decode to Buffer
        const buffer = Buffer.from(data, 'base64')
        
        const uploadResult = await putPlaceImageBuffer(name, contentType, buffer)
        
        return apiResponse.ok(res, { data: uploadResult })
        
    } catch (e) {
        
        console.error('Error uploading image to blob storage:', e)
        return apiResponse.internalServerError(res)
        
    }
    
})
