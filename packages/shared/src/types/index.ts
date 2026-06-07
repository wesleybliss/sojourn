export * from './teams'
export * from '@shared/types/data.types'
export * from '@shared/types/database.types'
export * from '@shared/types/firebase.types'
export * from '@shared/types/mutations.types'
export * from '@shared/types/segments.types'
export type * from '@shared/types/summarizer.d'
export * from '@shared/types/trips.types'
export * from '@shared/types/ui.types'
export type * from '@shared/types/window.d'

export const Themes = {
    system: 'system',
    light: 'light',
    dark: 'dark' ,
}

export type Theme = typeof Themes[keyof typeof Themes]

export type EventBusPayload = Record<string, unknown>
