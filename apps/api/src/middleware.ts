import '@repo/shared/types/express.d'

import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import HttpError from '@repo/shared/errors/HttpError'
import type { AuthorizeOptions } from '@repo/shared/types/express'
import { authenticate } from '@repo/shared/utils/auth'
import { and, eq } from 'drizzle-orm'
import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number().optional(),
    tripId: z.coerce.number().optional(),
    planId: z.coerce.number().optional(),
    segmentId: z.coerce.number().optional(),
})

export const logger = (req: Request, _res: Response, next: NextFunction) => {
    
    console.log(req.method, req.originalUrl)
    next()
    
}

export const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    
    console.error(err)
    
    res.status(500).json({
        error: 'Internal Server Error',
    })
    
}

export const authentication = async (
    req: Request,
    _res: Response,
    next: NextFunction,
): Promise<void> => {
    
    req.auth = await authenticate(req)
    
    next()
    
}

/**
 * Authorizes if a user has access to resources
 * - If only tripId: validates user is a member of this trip
 * - If tripId + planId: validates plan belongs to trip AND user has trip access
 * - If tripId + planId + segmentId: validates a segment belongs to plan/trip AND the user has trip access
 */
export const authorization = (options: AuthorizeOptions) => {
    
    return async (req: Request, _res: Response, next: NextFunction) => {
        try {
            
            // Check authentication first
            if (!req.auth?.user?.id)
                return next(new HttpError(401, 'Unauthorized'))
            
            const userId = req.auth.user.id
            const { teamId, tripId, planId, segmentId } = paramsSchema.parse(req.params)
            
            // Determine what level of authorization is needed
            const needsTripAuth = options.requireTrip ?? (tripId !== null && tripId !== undefined)
            const needsPlanAuth = options.requirePlan ?? (planId !== null && planId !== undefined)
            const needsSegmentAuth = options.requireSegment ?? (segmentId !== null && segmentId !== undefined)
            
            // If no IDs provided, nothing to authorize (allow through)
            if (!needsTripAuth && !needsPlanAuth && !needsSegmentAuth)
                return next()
            
            // Build the authorization query based on what we need
            let hasAccess = false
            
            if (needsSegmentAuth && segmentId && planId && tripId) {
                
                if (!teamId)
                    return next(new HttpError(400, 'Missing teamId'))
                
                // Full chain: validate segment belongs to plan/trip AND user has trip access
                const result = await db
                    .select()
                    .from(schemas.segments)
                    .innerJoin(schemas.trips, eq(schemas.trips.id, schemas.segments.tripId))
                    .innerJoin(schemas.teams, eq(schemas.teams.id, schemas.trips.teamId))
                    .innerJoin(schemas.userTeams, eq(schemas.userTeams.teamId, schemas.teams.id))
                    .where(
                        and(
                            eq(schemas.segments.id, segmentId),
                            eq(schemas.segments.tripId, tripId),
                            eq(schemas.segments.planId, planId),
                            eq(schemas.trips.id, tripId),
                            eq(schemas.teams.id, teamId),
                            eq(schemas.userTeams.userId, userId),
                        ),
                    )
                    .limit(1)
                
                hasAccess = result.length > 0
                
                // Attach validated data for downstream use
                if (hasAccess)
                    req.validatedData = {
                        tripId,
                        planId,
                        segmentId,
                        segment: result[0].segments,
                    }
                
            } else if (needsPlanAuth && planId && tripId) {
                
                if (!teamId)
                    return next(new HttpError(400, 'Missing teamId'))
                
                // Plan + trip: validate plan belongs to trip AND user has trip access
                const result = await db
                    .select()
                    .from(schemas.plans)
                    .innerJoin(schemas.trips, eq(schemas.trips.id, schemas.plans.tripId))
                    .innerJoin(schemas.teams, eq(schemas.teams.id, schemas.trips.teamId))
                    .innerJoin(schemas.userTeams, eq(schemas.userTeams.teamId, schemas.teams.id))
                    .where(
                        and(
                            eq(schemas.plans.id, planId),
                            eq(schemas.plans.tripId, tripId),
                            eq(schemas.trips.id, tripId),
                            eq(schemas.teams.id, teamId),
                            eq(schemas.userTeams.userId, userId),
                        ),
                    )
                    .limit(1)
                
                hasAccess = result.length > 0
                
                if (hasAccess)
                    req.validatedData = {
                        tripId,
                        planId,
                        plan: result[0].plans,
                    }
                
            } else if (needsTripAuth && tripId) {
                
                if (!teamId)
                    return next(new HttpError(400, 'Missing teamId'))
                
                // Just trip: validate user has access to trip
                const result = await db
                    .select()
                    .from(schemas.userTeams)
                    .innerJoin(schemas.trips, eq(schemas.trips.id, tripId))
                    .innerJoin(schemas.teams, eq(schemas.teams.id, schemas.trips.teamId))
                    .innerJoin(schemas.userTeams, eq(schemas.userTeams.teamId, schemas.teams.id))
                    .where(
                        and(
                            eq(schemas.trips.id, tripId),
                            eq(schemas.teams.id, teamId),
                            eq(schemas.userTeams.userId, userId),
                        ),
                    )
                    .limit(1)
                
                hasAccess = result.length > 0
                
                if (hasAccess)
                    req.validatedData = {
                        tripId,
                        trip: result[0].trips,
                    }
                
            } else {
                
                // Invalid combination (e.g., planId without tripId)
                console.warn('Invalid resource hierarchy', {
                    params: req.params,
                    tripId,
                    planId,
                    segmentId,
                })
                return next(new HttpError(400, 'Invalid resource hierarchy'))
                
            }
            
            if (!hasAccess)
                return next(new HttpError(403, 'Access denied to this resource'))
            
            next()
            
        } catch (e) {
            
            if (e instanceof z.ZodError) {
                console.error('Validation error:', { params: req.params }, e.cause, e.stack)
                return next(new HttpError(400, 'Invalid parameter format'))
            }
            
            next(e)
            
        }
        
    }
    
}

// Optional: Pre-configured middleware for common use cases
export const authorizeTrip = authorization({
    requireTrip: true,
})

export const authorizePlan = authorization({
    requireTrip: true,
    requirePlan: true,
})

export const authorizeSegment = authorization({
    requireTrip: true,
    requirePlan: true,
    requireSegment: true,
})
