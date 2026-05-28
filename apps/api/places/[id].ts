import db from '@repo/shared/db'
import * as schemas from '@repo/shared/db/schema'
import { apiResponseDeprecated } from '@repo/shared/utils/api'
import { withAuthDeprecated } from '@repo/shared/utils/auth'
import { eq } from 'drizzle-orm'

const handler = async (request: Request, context: { auth: any, params: Promise<{ id: string }> }) => {
  if (request.method === 'PUT') {
    const paramsObj = await context.params
    const placeId = parseInt(paramsObj.id, 10)

    try {
      const body = await request.json()

      if (!placeId)
        return apiResponseDeprecated.badRequest(`Invalid place ID: "${placeId}"`)

      const [place] = await db.select()
        .from(schemas.places)
        .where(eq(schemas.places.id, placeId))

      if (!place)
        return apiResponseDeprecated.notFound('Place')

      const [updatedPlace] = await db
        .update(schemas.places)
        .set({
          name: body.name,
          coverImageUrl: body.coverImageUrl,
          focus: body.focus,
          quickTip: body.quickTip,
          personalNotes: body.personalNotes,
          region: body.region,
          travelWindow: body.travelWindow,
          isBookmarked: body.isBookmarked,
        })
        .where(eq(schemas.places.id, placeId))
        .returning()

      if (!updatedPlace)
        return apiResponseDeprecated.notFound('Place')

      return apiResponseDeprecated.ok({
        message: 'Place updated successfully',
        data: updatedPlace,
      })
    } catch (e) {
      console.error('Error updating place:', e)
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
