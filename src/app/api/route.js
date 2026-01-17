import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import pkg from '@/../package.json'

export async function GET() {
    
    return NextResponse.json({
        success: true,
        data: {
            ok: true,
            version: pkg.version,
            timestamp: dayjs().format(),
        },
        message: `Trip Planner ${dayjs().format()}`,
    })
    
}
