import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import HttpError from '@repo/shared/errors/HttpError'
import type { ID } from '@repo/shared/types/data'
import type { UserSelect } from '@repo/shared/types/database'
import { adminAuth } from '@repo/shared/utils/firebase/admin'
import { AuthContext } from '@shared/types/express'
import { and, eq, sql } from 'drizzle-orm'
import type { Request } from 'express'
import type { DecodedIdToken } from 'firebase-admin/auth'

/**
 * Extracts and verifies Firebase ID token from request Authorization header.
 *
 * @param request - The incoming request object
 * @returns Decoded Firebase token
 * @throws HttpError 401 - If token is missing or invalid
 */
const verifyFirebaseToken = async (request: Request): Promise<DecodedIdToken> => {
    
    const authHeader = request.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new HttpError(401, 'Missing or invalid authorization header')
    
    const idToken = authHeader.substring(7)
    
    try {
        // Decoded token
        return await adminAuth.verifyIdToken(idToken)
    } catch (error) {
        console.error('Firebase token verification failed:', error)
        throw new HttpError(401, 'Invalid or expired token')
    }
}

/**
 * Gets or creates a user based on Firebase authentication.
 *
 * - If firebaseUid exists in DB, returns that user
 * - If not, attempts to link by email (claim the legacy account)
 * - If no match, creates a new user
 * - Handles enabled flag for beta access control
 *
 * @param firebaseUser - Decoded Firebase token containing uid, email, name, picture
 * @returns Database user record
 * @throws HttpError For validation or conflict errors
 */
const getOrCreateUser = async (firebaseUser: DecodedIdToken): Promise<UserSelect> => {
    const { uid: firebaseUid, email, name, picture } = firebaseUser
    
    if (!email)
        throw new HttpError(400, 'Email not provided by authentication provider. Please contact support.')
    
    const normalizedEmail = email.toLowerCase().trim()
    
    // 1. Try to find a user by firebaseUid
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
        .where(sql.raw(`lower(${schemas.users.email}) = ${normalizedEmail}`))
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
    
    // 3. Create a new user (enabled=false by default, will need an invitation code)
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
 * Verifies Firebase token, gets or creates user in the database, and returns auth context.
 */
export const authorize = async (
    request: Request,
): Promise<{ user: UserSelect; firebaseToken: DecodedIdToken; userId: ID }> => {
    
    const firebaseToken = await verifyFirebaseToken(request)
    
    const user = await getOrCreateUser(firebaseToken)
    
    return { user, firebaseToken, userId: user.id }
    
}

export const isUserTripMember = async ({ userId }: AuthContext, tripId: ID): Promise<boolean> => {
    try {
        if (!userId || !tripId)
            return false
        
        const rows = await db
            .select()
            .from(schemas.userTrips)
            .where(and(
                eq(schemas.userTrips.userId, userId),
                eq(schemas.userTrips.tripId, tripId),
            ))
        
        return Array.isArray(rows) &&
            rows.length > 0 &&
            rows[0].tripId === tripId
        
    } catch (e) {
        console.error('isUserTripMember', e)
        return false
    }
}
