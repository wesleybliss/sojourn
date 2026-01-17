import db from '@/db/index'
import * as schemas from '@/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { adminAuth } from '@/lib/firebase/admin'
import HttpError from '@/errors/HttpError'
import { NextResponse } from 'next/server'

/**
 * Extracts and verifies Firebase ID token from request Authorization header.
 *
 * @param {Object} request - The incoming request object
 * @returns {Promise<Object>} Decoded Firebase token
 * @throws {HttpError} 401 - If token is missing or invalid
 */
const verifyFirebaseToken = async request => {
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new HttpError(401, 'Missing or invalid authorization header')
    
    const idToken = authHeader.substring(7)
    
    try {
        const decodedToken = await adminAuth.verifyIdToken(idToken)
        
        return decodedToken
    } catch (error) {
        console.error('Firebase token verification failed:', error)
        throw new HttpError(401, 'Invalid or expired token')
    }
}

/**
 * Gets or creates a user based on Firebase authentication.
 *
 * - If firebaseUid exists in DB, returns that user
 * - If not, attempts to link by email (claim legacy account)
 * - If no match, creates new user
 * - Handles enabled flag for beta access control
 *
 * @param {Object} firebaseUser - Decoded Firebase token containing uid, email, name, picture
 * @returns {Promise<Object>} Database user record
 * @throws {HttpError} For validation or conflict errors
 */
const getOrCreateUser = async firebaseUser => {
    const { uid: firebaseUid, email, name, picture } = firebaseUser
    
    if (!email)
        throw new HttpError(400, 'Email not provided by authentication provider. Please contact support.')
    
    const normalizedEmail = email.toLowerCase().trim()
    
    // 1. Try to find user by firebaseUid
    const [existingByUid] = await db
        .select()
        .from(schemas.users)
        .where(eq(schemas.users.firebaseUid, firebaseUid))
        .limit(1)
    
    if (existingByUid)
        return existingByUid
    
    // 2. Try to find by email (legacy account linking)
    const [existingByEmail] = await db
        .select()
        .from(schemas.users)
        .where(sql`lower(${schemas.users.email}) = ${normalizedEmail}`)
        .limit(1)
    
    if (existingByEmail) {
        // Email match found - check if already claimed by different Firebase user
        if (existingByEmail.firebaseUid && existingByEmail.firebaseUid !== firebaseUid) {
            throw new HttpError(409, 'This email is associated with a different account. Please contact support.')
        }
        
        // Claim this legacy account by setting firebaseUid
        const [updated] = await db
            .update(schemas.users)
            .set({
                firebaseUid,
                name: name || existingByEmail.name,
                photoUrl: picture || existingByEmail.photoUrl,
            })
            .where(eq(schemas.users.id, existingByEmail.id))
            .returning()
        
        return updated
    }
    
    // 3. Create new user (enabled=false by default, will need invite code)
    const [newUser] = await db
        .insert(schemas.users)
        .values({
            email: normalizedEmail,
            firebaseUid,
            name: name || null,
            photoUrl: picture || null,
            enabled: false,
        })
        .returning()
    
    return newUser
}

/**
 * Authorizes a user based on Firebase ID token from request.
 *
 * Verifies Firebase token, gets or creates user in database, and returns auth context.
 *
 * @param {Object} request - The incoming request object containing Authorization header
 * @throws {HttpError} 401 - If the token is missing or invalid
 * @throws {HttpError} 400 - If email is missing or other validation fails
 * @throws {HttpError} 409 - If email conflict detected
 * @returns {Promise<Object>} Resolves with { user, firebaseToken, userId }
 */
export const authorize = async request => {
    
    const firebaseToken = await verifyFirebaseToken(request)
    
    const user = await getOrCreateUser(firebaseToken)
    
    return { user, firebaseToken, userId: user.id }
    
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
