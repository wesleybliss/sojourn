import { NextRequest, NextResponse } from 'next/server'
import db from '@repo/shared/db/index'
import * as schemas from '@repo/shared/db/schema'
import { withAuth, isUserTripMember, AuthContext } from '@repo/shared/utils/auth'

const handler = async (request: NextRequest, { auth }: { auth: AuthContext }) => {
    
    try {
        
        const body = await request.json()
        
        const tripId = body.tripId
        const name = body.name?.trim() || ''
        const description = body.description?.trim() || null
        
        if (!tripId)
            return NextResponse.json(
                { success: false, error: 'Param tripId is required' },
                { status: 422 })
        
        if (!name)
            return NextResponse.json(
                { success: false, error: 'Name is required' },
                { status: 422 })
        
        const isMember = await isUserTripMember(auth, tripId)
        
        if (!isMember)
            return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 })
        
        const [createdPlan] = await db
            .insert(schemas.plans)
            .values({
                tripId: parseInt(tripId, 10),
                name,
                description,
            })
            .returning()
        
        return NextResponse.json(
            { success: true, data: createdPlan, message: 'Plan created successfully' },
            { status: 201 })
        
    } catch (e) {
        
        console.error('Error creating plan:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
}

/**
 * POST /api/plans
 * Creates a new plan.
 */
export const POST = withAuth(handler)
