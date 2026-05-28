import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponse } from '@repo/shared/utils/api'
import { withAuth } from '@repo/shared/utils/auth'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'POST') {
    const body = await request.json()
    const { topic } = body

    try {
      const url = await getRandomUnsplashImageUrl(topic)
      return apiResponse.ok({ data: url })
    } catch (e) {
      console.error(`Error getting random photo with topic ${topic}:`, e)
      return apiResponse.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default withAuth(handler)