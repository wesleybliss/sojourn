import * as fs from 'node:fs'
import * as path from 'node:path'

import dayjs from 'dayjs'
import { NextResponse } from 'next/server'

const packageUri = path.join(process.cwd(), 'package.json')

export async function GET() {
    
    const pkg = JSON.parse(fs.readFileSync(packageUri, 'utf-8'))
    
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
