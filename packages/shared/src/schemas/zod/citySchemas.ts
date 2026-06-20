import { z } from 'zod'

export const searchQuerySchema = z.object({
    query: z.coerce.string(),
    minimumPopulation: z.coerce.number().optional(),
    countryCode: z.coerce.string().max(2).optional(),
})
