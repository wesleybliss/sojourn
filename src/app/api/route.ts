import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import pkg from '@/../packageon'

export async function GET() {
    
    return NextResponseon({
        success: true,
        data: {
            ok: true,
            version: pkg.version,
            timestamp: dayjs().format(),
        },
        message: `Trip Planner ${dayjs().format()}`,
    })
    
}
