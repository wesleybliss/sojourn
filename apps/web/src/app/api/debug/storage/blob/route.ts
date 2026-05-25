import { Buffer } from 'node:buffer'

import usersRepo from '@repo/shared/db/repos/users'
import { withAuth } from '@repo/shared/utils/auth'
import { putPlaceImageBuffer } from '@repo/shared/utils/storage/vercel-blob'
import { NextRequest, NextResponse } from 'next/server'

export const POST = withAuth(async (request: NextRequest, { auth }) => {
    
    try {
        
        const { userId } = auth
        
        if (!userId)
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 401 })
        
        const user = await usersRepo.findOneById(userId)
        
        if (!user)
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 })
        
        const { name, contentType, base64Data } = await request.json()
        
        if (!base64Data)
            return NextResponse.json(
                { success: false, error: 'Param "base64Data" is required' },
                { status: 422 })
        
        // Remove prefix (if any)
        const matches = base64Data.match(/^data:(.+);base64,(.+)$/)
        const data = matches ? matches[2] : base64Data
        
        // Decode to Buffer
        const buffer = Buffer.from(data, 'base64')
        
        console.log('/debug/storage/blob authenticated user', userId, user.id, user.email)
        console.log('/debug/storage/blob uploading', buffer.length, 'bytes')
        
        const res = await putPlaceImageBuffer(name, contentType, buffer)
        
        return NextResponse.json(
            { success: true, ...res },
            { status: 200 })
        
    } catch (e) {
        
        console.error('Error uploading image to blob storage:', e)
        return NextResponse.json(
            { success: false, error: e instanceof Error ? e.message : 'Unknown error' },
            { status: 500 })
        
    }
    
})
