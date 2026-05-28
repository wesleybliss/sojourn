export * from './data'
export * from './database'
export * from './firebase'
export * from './mutations'
export * from './summarizer.d'
export * from './trips'
export * from './ui'
export * from './window.d'

export const Themes = {
    system: 'system',
    light: 'light',
    dark: 'dark' ,
}

export type Theme = typeof Themes[keyof typeof Themes]

export type EventBusPayload = Record<string, unknown>
