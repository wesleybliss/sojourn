import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { withAuthDeprecated } from '@repo/shared/utils/auth'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'POST') {
    const body = await request.json()
    const { topic } = body

    try {
      const url = await getRandomUnsplashImageUrl(topic)
      return apiResponseDeprecated.ok({ data: url })
    } catch (e) {
      console.error(`Error getting random photo with topic ${topic}:`, e)
      return apiResponseDeprecated.internalServerError()
    }
  } else {
    return new Response(
      JSON.stringify({ success: false, error: 'Method Not Allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export default withAuthDeprecated(handler)
