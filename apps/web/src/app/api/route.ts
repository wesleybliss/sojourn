import * as fs from 'node:fs'
import * as path from 'node:path'

import { apiResponse } from '@repo/shared/utils/api'
import dayjs from 'dayjs'

const packageUri = path.join(process.cwd(), 'package.json')

export async function GET() {
    
    const pkg = JSON.parse(fs.readFileSync(packageUri, 'utf-8'))
    
    return apiResponse.ok({
        message: `Trip Planner ${dayjs().format()}`,
        data: {
            ok: true,
            version: pkg.version,
            timestamp: dayjs().format(),
        },
    })
    
}
