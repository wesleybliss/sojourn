import * as fs from 'node:fs'
import * as path from 'node:path'

import { apiResponse } from '@repo/shared/utils/api'
import dayjs from 'dayjs'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'GET') {
    const packageUri = path.join(process.cwd(), 'package.json')
    const pkg = JSON.parse(fs.readFileSync(packageUri, 'utf-8'))
    return apiResponse.ok({
      message: `Sojourn ${dayjs().format()}`,
      data: {
        ok: true,
        version: pkg.version,
        timestamp: dayjs().format(),
      },
    })
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default handler