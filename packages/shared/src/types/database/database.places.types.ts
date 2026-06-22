import * as schemas from '@repo/shared/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod'
import { z } from 'zod'

export const placeNoteSelectSchema = createSelectSchema(schemas.placeNotes)
export const placeNoteInsertSchema = createInsertSchema(schemas.placeNotes)
export const placeNoteUpdateSchema = createUpdateSchema(schemas.placeNotes)
export type PlaceNote = InferSelectModel<typeof schemas.placeNotes>
export type PlaceNoteSelect = z.infer<typeof placeNoteSelectSchema>
export type PlaceNoteInsert = z.infer<typeof placeNoteInsertSchema>
export type PlaceNoteUpdate = z.infer<typeof placeNoteUpdateSchema>

//

export const placeSelectSchema = createSelectSchema(schemas.places)
export const placeInsertSchema = createInsertSchema(schemas.places)
export const placeUpdateSchema = createUpdateSchema(schemas.places).extend({
    notes: z.array(z.union([
        placeNoteInsertSchema.extend({
            id: z.undefined().or(z.null()).optional(),
        }),
        placeNoteUpdateSchema.extend({
            id: z.coerce.number(),
        }),
    ])),
})
export type Place = InferSelectModel<typeof schemas.places> & {
    notes?: InferSelectModel<typeof schemas.placeNotes>[]
}
export type PlaceSelect = z.infer<typeof placeSelectSchema> & {
    notes?: PlaceNote[]
}
export type PlaceInsert = z.infer<typeof placeInsertSchema>
export type PlaceUpdate = z.infer<typeof placeUpdateSchema> & {
    notes?: PlaceNoteInsert[] | PlaceNoteUpdate[]
}
