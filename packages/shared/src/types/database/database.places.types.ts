import * as schemas from '@shared/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const placeSelectSchema = createSelectSchema(schemas.places)
export const placeInsertSchema = createInsertSchema(schemas.places)
export type Place = InferSelectModel<typeof schemas.places> & {
    notes?: InferSelectModel<typeof schemas.placeNotes>[]
}
export type PlaceInsert = z.infer<typeof placeInsertSchema>
export type PlaceSelect = z.infer<typeof placeSelectSchema> & {
    notes?: PlaceNote[]
}

//

export const placeNoteSelectSchema = createSelectSchema(schemas.placeNotes)
export const placeNoteInsertSchema = createInsertSchema(schemas.placeNotes)
export type PlaceNote = InferSelectModel<typeof schemas.placeNotes>
export type PlaceNoteInsert = z.infer<typeof placeNoteInsertSchema>
export type PlaceNoteSelect = z.infer<typeof placeNoteSelectSchema>
