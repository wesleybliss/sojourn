import { NextResponse } from 'next/server'
import db from '@/db/index.js'
import { plans } from '@/db/schema.js'
import { eq } from 'drizzle-orm'

/**
 * GET /api/trips/[tripId]/plans
 * Fetches all plans for a specific trip.
 */
export async function GET(request, { params }) {
    try {
        const { tripId } = params
        if (isNaN(parseInt(tripId))) {
            return NextResponse.json({ success: false, error: 'Invalid trip ID' }, { status: 400 })
        }

        const tripPlans = await db.select().from(plans).where(eq(plans.tripId, parseInt(tripId)))

        return NextResponse.json({ success: true, data: tripPlans })
    } catch (error) {
        console.error(`Error fetching plans for trip ${params.tripId}:`, error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}

/**
 * POST /api/trips/[tripId]/plans
 * Creates a new plan for a specific trip.
 */
export async function POST(request, { params }) {
    try {
        const { tripId } = params
        if (isNaN(parseInt(tripId))) {
            return NextResponse.json({ success: false, error: 'Invalid trip ID' }, { status: 400 })
        }

        const planData = await request.json()

        const [newPlan] = await db
            .insert(plans)
            .values({
                tripId: parseInt(tripId),
                name: planData.name || 'Untitled Plan',
                description: planData.description || '',
            })
            .returning()

        return NextResponse.json(
            {
                success: true,
                data: newPlan,
                message: 'Plan created successfully',
            },
            { status: 201 },
        )
    } catch (error) {
        console.error(`Error creating plan for trip ${params.tripId}:`, error)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
    }
}
