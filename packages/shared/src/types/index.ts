export * from '@repo/shared/types/data'
export * from '@repo/shared/types/database'
export * from '@repo/shared/types/firebase'
export * from '@repo/shared/types/mutations'
export type * from '@repo/shared/types/summarizer.d'
export * from '@repo/shared/types/trips'
export * from '@repo/shared/types/ui'
export type * from '@repo/shared/types/window.d'

export const Themes = {
    system: 'system',
    light: 'light',
    dark: 'dark' ,
}

export type Theme = typeof Themes[keyof typeof Themes]

export type EventBusPayload = Record<string, unknown>
