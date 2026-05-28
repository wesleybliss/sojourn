import placesRepo from '@repo/shared/db/repos/places'
import { getRandomUnsplashImageUrl } from '@repo/shared/utils'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { withAuthDeprecated } from '@repo/shared/utils/auth'

const handler = async (request: Request, context: { auth: any, params: Promise<any> }) => {
  if (request.method === 'GET') {
    try {
      const places = await placesRepo.findAll()
      return apiResponseDeprecated.ok({ data: places })
    } catch (e) {
      console.error('Error getting places:', e)
      return apiResponseDeprecated.internalServerError()
    }
  } else if (request.method === 'POST') {
    try {
      const body = await request.json()
      const {
        name,
        focus,
        quickTip,
        personalNotes,
        region,
        travelWindow,
        isBookmarked = false,
      } = body

      if (!name?.length)
        return apiResponseDeprecated.invalidParams('Param "name" required')

      const coverImageUrl = await getRandomUnsplashImageUrl(name)

      const newPlace = await placesRepo.create({
        name,
        coverImageUrl,
        focus,
        quickTip,
        personalNotes,
        region,
        travelWindow,
        isBookmarked,
      })

      return apiResponseDeprecated.ok({ data: newPlace })
    } catch (e) {
      console.error('Error creating new place:', e)
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
