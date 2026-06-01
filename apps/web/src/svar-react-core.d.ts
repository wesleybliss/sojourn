declare module '@svar-ui/react-core' {
    import type { FC, ReactNode } from 'react'
    export const Fullscreen: FC<{
        children?: ReactNode
        hotkey?: string
        toggleButton?: (toggle: () => void, isFullScreen: boolean) => ReactNode
    }>
}
