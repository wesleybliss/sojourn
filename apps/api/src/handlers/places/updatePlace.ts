import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import {
    type PlaceNote,
    placeNoteInsertSchema,
    placeNoteUpdateSchema,
    placeUpdateSchema,
} from '@repo/shared/types/database/database.places.types'
import { getUpdatePayload, omit } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { eq } from 'drizzle-orm'
import type { Request, Response } from 'express'
import { z } from 'zod'

const paramsSchema = z.object({
    teamId: z.coerce.number('teamId is required'),
    placeId: z.coerce.number('placeId is required'),
})

const bodySchema = placeUpdateSchema

export const updatePlace = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        console.log('wtf', req.params, req.body)
        const { placeId } = paramsSchema.parse(req.params)
        const body = bodySchema.parse(req.body)
        
        if (!placeId)
            return apiResponse.badRequest(res, `Invalid place ID: "${placeId}"`)
        
        const [record] = await db.select()
            .from(schemas.places)
            .leftJoin(schemas.placeNotes, eq(schemas.places.id, schemas.placeNotes.placeId))
            .where(eq(schemas.places.id, placeId))
            .limit(1)
        
        const { places: place } = record ?? { places: null }
        const { placeNotes } = record ?? { placeNotes: null }
        
        if (!place)
            return apiResponse.notFound(res, 'Place')
        
        const payload = getUpdatePayload(place, body, ['id', 'teamId'])
        
        const { updatedPlace, updatedNotes } = await db.transaction(async tx => {
            
            const [updatedPlace] = await tx
                .update(schemas.places)
                .set(payload)
                .where(eq(schemas.places.id, placeId))
                .returning()
            
            const updatedNotes: PlaceNote[] = []
            
            for (const note of body.notes ?? []) {
                
                if (!note.id) {
                    console.log('inserting new note', note)
                    const [newPlaceNote] = await tx
                        .insert(schemas.placeNotes)
                        .values(placeNoteInsertSchema.parse(omit(note, ['id'])))
                        .returning()
                    
                    updatedNotes.push(newPlaceNote)
                    
                } else {
                    console.log('updating existing note', note)
                    const notePayload = getUpdatePayload(
                        placeNoteUpdateSchema.parse(placeNotes), note, ['placeId'])
                    
                    const [updatedPlaceNote] = await tx
                        .update(schemas.placeNotes)
                        .set(notePayload)
                        .where(eq(schemas.placeNotes.id, note.id))
                        .returning()
                    
                    updatedNotes.push(updatedPlaceNote)
                    
                }
                
            }
            
            return {
                updatedPlace,
                updatedNotes,
            }
            
        })
        
        if (!updatedPlace)
            return apiResponse.notFound(res, 'Place')
        
        return apiResponse.ok(res, {
            ...updatedPlace,
            notes: updatedNotes,
        })
        
    } catch (e) {
        
        console.error('Error updating place:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
