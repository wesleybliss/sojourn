import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import type { ID, TeamWithMembers } from '@repo/shared/types'
import { apiResponse } from '@repo/shared/utils/api'
import { eq, inArray } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const querySchema = z.object({
    withMembers: z.coerce.boolean().optional(),
})

export const getTeams = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const { withMembers } = querySchema.parse(req.query)
        
        if (withMembers) {
            
            const teams: TeamWithMembers[] = await db
                .select({
                    id: schemas.teams.id,
                    createdAt: schemas.teams.createdAt,
                    updatedAt: schemas.teams.updatedAt,
                    name: schemas.teams.name,
                    description: schemas.teams.description,
                    memberId: schemas.users.id,
                    memberName: schemas.users.name,
                    memberEmail: schemas.users.email,
                    memberPhotoUrl: schemas.users.photoUrl,
                })
                .from(schemas.teams)
                .innerJoin(schemas.userTeams, eq(schemas.userTeams.teamId, schemas.teams.id))
                .innerJoin(schemas.users, eq(schemas.users.id, schemas.userTeams.userId))
                .where(
                    inArray(
                        schemas.teams.id,
                        db
                            .select({ id: schemas.userTeams.teamId })
                            .from(schemas.userTeams)
                            .where(eq(schemas.userTeams.userId, req.auth.userId)),
                    ),
                )
            
            const grouped = teams.reduce((acc, row) => {
                
                if (!acc[row.id])
                    acc[row.id] = {
                        id: row.id,
                        createdAt: row.createdAt,
                        updatedAt: row.updatedAt,
                        name: row.name,
                        description: row.description,
                        members: [],
                    } as TeamWithMembers
                
                acc[row.id].members.push({
                    id: row.memberId,
                    name: row.memberName,
                    email: row.memberEmail,
                    photoUrl: row.memberPhotoUrl,
                })
                
                return acc
                
            }, {} as Record<ID, TeamWithMembers>)
            
            return apiResponse.ok(res, Object.values(grouped))
            
        }
        
        const teams = await db
            .select({
                id: schemas.teams.id,
                name: schemas.teams.name,
                description: schemas.teams.description,
            })
            .from(schemas.teams)
            .innerJoin(schemas.userTeams, eq(schemas.userTeams.teamId, schemas.teams.id))
            .where(eq(schemas.userTeams.userId, req.auth.userId))
        
        return apiResponse.ok(res, teams)
        
    } catch (e) {
        
        console.error('Error getting teams:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
