import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { geocode } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { isUserTripMember } from '@repo/shared/utils/auth'
import type { Request, Response } from 'express'

export const createSegment = async (
    req: Request,
    res: Response,
): Promise<void> => {
    
    try {
        
        const {
            tripId,
            planId,
            startDate,
            endDate,
            name,
            color,
            coordsLat,
            coordsLng,
        } = req.body
        
        if (!tripId)
            return apiResponse.invalidParams(res, 'Param tripId is required')
        
        if (!planId)
            return apiResponse.invalidParams(res, 'Param planId is required')
        
        if (!name?.length)
            return apiResponse.invalidParams(res, 'Param name is required')
        
        if (!startDate?.length)
            return apiResponse.invalidParams(res, 'Param startDate is required')
        
        if (!endDate?.length)
            return apiResponse.invalidParams(res, 'Param endDate is required')
        
        const isMember = await isUserTripMember(req.auth, tripId)
        
        if (!isMember)
            return apiResponse.forbidden(res)
        
        let latitude: number | null = null
        let longitude: number | null = null
        
        // If coordinates are provided in the request, use them
        if (coordsLat !== null && coordsLat !== undefined &&
            coordsLng !== null && coordsLng !== undefined) {
            const latNum = Number(coordsLat)
            const lngNum = Number(coordsLng)
            if (!isNaN(latNum) && !isNaN(lngNum)) {
                latitude = latNum
                longitude = lngNum
            } else {
                console.warn('Invalid coordinates provided:', coordsLat, coordsLng)
            }
        }
        // If coordinates are not valid, attempt to geocode the segment name
        if (latitude === null || longitude === null) {
            // Otherwise, attempt to geocode the segment name
            try {
                const geoResult = await geocode(name)
                if (geoResult) {
                    latitude = geoResult.lat
                    longitude = geoResult.lng
                }
            } catch (geoError) {
                console.warn('Geocoding failed for segment name:', name, geoError)
                // Leave latitude and longitude as null
            }
        }
        
        const [createdSegment] = await db
            .insert(schemas.segments)
            .values({
                tripId,
                planId,
                startDate,
                endDate,
                name,
                color,
                coordsLat: latitude,
                coordsLng: longitude,
            })
            .returning()
        
        return apiResponse.ok(res, {
            message: 'Segment created successfully',
            data: createdSegment,
        })
        
    } catch (e) {
        
        console.error('Error creating segment:', e)
        return apiResponse.internalServerError(res)
        
    }
    
}
