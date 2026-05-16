import { type NextRequest, NextResponse } from 'next/server'
import { authorize } from '@/lib/auth'
import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq } from 'drizzle-orm'
import HttpError from '@/errors/HttpError'

/**
 * GET /api/auth/user
 *
 * Returns current user data and whether they need to provide an invite code.
 * Called by AuthProvider to fetch user state after Firebase auth.
 */
export async function GET(request: NextRequest) {
    try {
        const { user } = await authorize(request)
        
        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                photoUrl: user.photoUrl,
                enabled: user.enabled,
            },
            needsInviteCode: !user.enabled,
        })
    } catch (e: unknown) {
        if (e instanceof HttpError) {
            return NextResponse.json(
                { success: false, error: (e as Error).message },
                { status: e.status },
            )
        }
        
        console.error('Error in GET /api/auth/user:', e)
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}

/**
 * POST /api/auth/user
 *
 * Handles invite code submission for beta access control.
 * Body: { inviteCode: string }
 *
 * If code is correct and user is not yet enabled, sets enabled=true.
 */
export async function POST(request: NextRequest) {
    try {
        const { user } = await authorize(request)
        
        const body = await request.json()
        const { inviteCode } = body
        
        if (!inviteCode) {
            throw new HttpError(400, 'Invite code is required')
        }
        
        // Check if invite code matches
        const correctCode = process.env.INVITE_CODE
        
        if (!correctCode) {
            throw new HttpError(500, 'Invite code system not configured')
        }
        
        if (inviteCode !== correctCode) {
            throw new HttpError(400, 'Invalid invite code')
        }
        
        // User already enabled - no action needed
        if (user.enabled) {
            return NextResponse.json({
                success: true,
                message: 'User already enabled',
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    photoUrl: user.photoUrl,
                    enabled: user.enabled,
                },
                needsInviteCode: false,
            })
        }
        
        // Enable the user
        const [updatedUser] = await db
            .update(schemas.users)
            .set({ enabled: true })
            .where(eq(schemas.users.id, user.id))
            .returning()
        
        return NextResponse.json({
            success: true,
            message: 'Account enabled successfully',
            user: {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                photoUrl: updatedUser.photoUrl,
                enabled: updatedUser.enabled,
            },
            needsInviteCode: false,
        })
    } catch (e: unknown) {
        if (e instanceof HttpError) {
            return NextResponse.json(
                { success: false, error: (e as Error).message },
                { status: e.status },
            )
        }
        
        console.error('Error in POST /api/auth/user:', e)
        return NextResponse.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 },
        )
    }
}
