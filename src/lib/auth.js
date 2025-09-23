import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { getToken } from 'next-auth/jwt'
import HttpError from '@/errors/HttpError'
import { NextResponse } from 'next/server'

/**
 * An asynchronous function that authorizes a user based on the provided request object.
 *
 * The function validates the user's token extracted from the request, verifies the token's user ID,
 * and retrieves the corresponding user data from the database. If any step in the authorization
 * process fails, an appropriate HTTP error is thrown.
 *
 * @param {Object} request - The incoming request object containing authentication details.
 * @throws {HttpError} 401 - If the token is missing or invalid.
 * @throws {HttpError} 400 - If the extracted user ID is invalid or not a number.
 * @throws {HttpError} 404 - If the user ID does not correspond to a valid user in the database.
 * @returns {Promise<Object>} Resolves with an object containing the authorized user, token, and user ID.
 */
export const authorize = async request => {
    
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    
    if (!token || !token.sub)
        throw new HttpError(401, 'Unauthorized')
    
    const userId = parseInt(String(token.sub), 10)
    
    if (Number.isNaN(userId))
        throw new HttpError(400, 'Invalid user ID')
    
    const [user] = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.id, userId))
        .limit(1)
    
    if (!user || user?.id !== userId)
        throw new HttpError(404, 'User not found')
    
    return { user, token, userId }
    
}

export const withAuth = handler => async (request, context) => {
    
    try {
        
        const auth = await authorize(request)
        const newContext = { ...context, auth }
        
        if (!request.app)
            request.app = {}
        
        Object.keys(auth).forEach(key => {
            request.app[key] = auth[key]
        })
        
        return await handler(request, newContext)
        
    } catch (e) {
        
        if (e instanceof HttpError)
            return NextResponse.json({ success: false, error: e.message }, { status: e.status })
        
        console.error('Authorization error:', e)
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
        
    }
    
}

export const isUserTripMember = async (auth, tripId) => {
    
    try {
        
        const { userId } = auth
        
        if (!userId || !tripId)
            return false
        
        const rows = await db
            .select()
            .from(schemas.userTrips)
            .where(and(
                eq(schemas.userTrips.userId, parseInt(userId, 10)),
                eq(schemas.userTrips.tripId, parseInt(tripId, 10)),
            ))
        
        return Array.isArray(rows) &&
            rows.length > 0 &&
            rows[0].tripId === parseInt(tripId, 10)
        
    } catch (e) {
        
        console.error('isUserTripMember', e)
        return false
        
    }
    
}
