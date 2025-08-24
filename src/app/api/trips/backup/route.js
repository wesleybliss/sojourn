import { NextResponse } from 'next/server'
import {
    getTripById,
    getTripWithDetails,
    updateTrip as updateTripQuery,
    deleteTrip as deleteTripQuery,
} from '@/db/repos/trips.js'
import Ajv from 'ajv'

export async function POST(request, opts) {
    
    const ajv = new Ajv()
    
}
