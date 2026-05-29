import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import HttpError from '@repo/shared/errors/HttpError'
import type { ID } from '@repo/shared/types/data'
import type { UserSelect } from '@repo/shared/types/database'
import { setCorsHeaders } from '@repo/shared/utils/api'
import { adminAuth } from '@repo/shared/utils/firebase/admin'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { and, eq, sql } from 'drizzle-orm'
import type { DecodedIdToken } from 'firebase-admin/auth'

/** @deprecated use verifyFirebaseToken instead */
const verifyFirebaseTokenDeprecated = async (request: Request): Promise<DecodedIdToken> => {
    const authHeader = request.headers.get('Authorization')
    
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
 * Extracts and verifies Firebase ID token from request Authorization header.
 *
 * @param request - The incoming request object
 * @returns Decoded Firebase token
 * @throws HttpError 401 - If token is missing or invalid
 */
const verifyFirebaseToken = async (request: VercelRequest): Promise<DecodedIdToken> => {
    
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
 * - If not, attempts to link by email (claim legacy account)
 * - If no match, creates new user
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

/** @deprecated Use authorize instead */
export const authorizeDeprecated = async (
    request: Request,
): Promise<{ user: UserSelect; firebaseToken: DecodedIdToken; userId: ID }> => {
    
    const firebaseToken = await verifyFirebaseTokenDeprecated(request)
    
    const user = await getOrCreateUser(firebaseToken)
    
    return { user, firebaseToken, userId: user.id }
    
}

/**
 * Authorizes a user based on Firebase ID token from request.
 * Verifies Firebase token, gets or creates user in the database, and returns auth context.
 */
export const authorize = async (
    request: VercelRequest,
): Promise<{ user: UserSelect; firebaseToken: DecodedIdToken; userId: ID }> => {
    
    const firebaseToken = await verifyFirebaseToken(request)
    
    const user = await getOrCreateUser(firebaseToken)
    
    return { user, firebaseToken, userId: user.id }
    
}

export type AuthContext = {
    user: UserSelect
    firebaseToken: DecodedIdToken
    userId: ID
}

/** @deprecated Use AuthHandlerContext instead */
export type AuthHandlerContextDeprecated<T = Record<string, never>> = {
    auth: AuthContext
    params: Promise<T>
}

export type AuthHandlerContext = {
    auth: AuthContext
}

/** @deprecated Use withAuth instead */
export const withAuthDeprecated = <T = Record<string, never>>(
    handler: (_req: Request, _context: AuthHandlerContextDeprecated<T>) => Promise<Response>,
) => async (request: Request, context: Partial<AuthHandlerContextDeprecated<T>> = {}) => {
    
    try {
        
        const auth = await authorizeDeprecated(request)
        const newContext: AuthHandlerContextDeprecated<T> = {
            ...context,
            auth,
            params: context.params ?? Promise.resolve({} as T),
        }
        
        return await handler(request, newContext)
        
    } catch (e) {
        
        if (e instanceof HttpError)
            return new Response(
                JSON.stringify({ success: false, error: (e as HttpError).message }),
                { status: (e as HttpError).status, headers: { 'Content-Type': 'application/json' } },
            )
        
        console.error('Authorization error:', e)
        return new Response(
            JSON.stringify({ success: false, error: 'Internal Server Error' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } },
        )
        
    }
    
}

export const withCors = (
    handler: (
        req: VercelRequest,
        res: VercelResponse,
    ) => Promise<VercelResponse>,
): (req: VercelRequest, res: VercelResponse) => Promise<VercelResponse> => {
    
    return async (req: VercelRequest, res: VercelResponse) => {
        
        const isCorsHandled = setCorsHeaders(req, res)
        
        if (isCorsHandled)
            return isCorsHandled
        
        return handler(req, res)
        
    }
    
}

export const withAuth = (
    handler: (
        req: VercelRequest,
        res: VercelResponse,
        context: AuthContext,
    ) => VercelResponse | Promise<VercelResponse>,
): (req: VercelRequest, res: VercelResponse) => Promise<VercelResponse> => {
    
    return withCors(async (req: VercelRequest, res: VercelResponse) => {
        
        try {
            
            const auth = await authorize(req)
            
            return await handler(req, res, auth)
            
        } catch (e) {
            
            console.error('Authorization error:', e)
            
            if (e instanceof HttpError)
                return res.status(e.status).json({ error: (e as HttpError).message })
            
            return res.status(500).json({ error: 'Internal Server Error' })
            
        }
        
    })
    
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
