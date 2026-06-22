import { Place, placeNoteInsertSchema } from '@repo/shared/types'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'

// `createdAt` / `updatedAt` are auto-managed by Postgres via `defaultNow()`
// on the placeNotes table — the client has no business sending them, and the
// server applies the column default when they're absent. We `.omit()` them from
// the form schema so the API payload never carries legacy/stringified dates,
// and the defaultValues initializer below strips them from `currentPlace.notes`
// so form state starts (and stays) clean.
//
// `placeId` is optional in the form because newly added notes don't yet have
// one; the view model injects it when building the API payload.
export const placeNoteFormSchema = placeNoteInsertSchema
    .omit({ createdAt: true, updatedAt: true })
    .extend({
        placeId: placeNoteInsertSchema.shape.placeId.optional(),
    })

export const updatePlaceFormSchema = z.object({
    name: z.string()
        .min(3, 'Name must be at least 3 characters')
        .max(20, 'Name must be at most 32 characters'),
    coverImageUrl: z.string().optional(),
    focus: z.string().optional(),
    notes: z.array(placeNoteFormSchema),
})

export type UpdatePlaceForm = z.infer<typeof updatePlaceFormSchema>

const useUpdatePlaceForm = (
    currentPlace: Place | null,
    onSubmit: (value: UpdatePlaceForm) => Promise<void>,
) => {
    
    return useForm({
        defaultValues: {
            name: currentPlace?.name ?? '',
            coverImageUrl: currentPlace?.coverImageUrl ?? '',
            focus: currentPlace?.focus ?? '',
            // Strip auto-managed `createdAt` / `updatedAt` from notes seeded
            // into form state — the schema doesn't declare them, so keeping
            // them here would only invite drift back into the submit payload.
            notes: (currentPlace?.notes ?? []).map(({ createdAt: _createdAt, updatedAt: _updatedAt, ...rest }) => rest),
        } as UpdatePlaceForm,
        validators: {
            // onChange: updatePlaceFormSchema,
            onChange: ({ value }) => {
                console.log('Validating form value:', value)
                const result = updatePlaceFormSchema.safeParse(value)
                console.log('Zod parse result:', result)
                if (!result.success)
                    console.error('Validation errors:', result.error.issues)

                // TanStack form v1 form-level validators must return `undefined`
                // on success or a ValidationError shape on failure; returning the
                // raw `safeParse` result object here was causing TanStack to treat
                // *every* form as invalid, which is why clicking Update Place did
                // nothing and `onSubmit` was never invoked.
                return result.success ? undefined : result.error.flatten().fieldErrors
            },
            onSubmitAsync: async ({ value }) => {
                console.log('Validating form value:', value)
                const result = updatePlaceFormSchema.safeParse(value)
                console.log('Zod parse result:', result)
                if (!result.success)
                    console.error('Validation errors:', result.error.issues)

                return result.success ? undefined : result.error.flatten().fieldErrors
            },
        },
        // Bypass the internal `state.canSubmit` short-circuit in `_handleSubmit`
        // (form-core FormApi.cjs:508). When the dialog first mounts with
        // `updatePlaceDialogPlace === null`, `defaultValues.name` falls back to
        // `''`, which fails the `name.min(3)` schema rule and leaves
        // `isValid === false` <=> `canSubmit === false`. Without this flag, the
        // submit handler bails before reaching our validators.
        canSubmitWhenInvalid: true,
        onSubmit: async ({ value }) => onSubmit(value),
    })
    
}

export default useUpdatePlaceForm
