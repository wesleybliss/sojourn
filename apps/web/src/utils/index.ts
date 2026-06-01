import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { RefObject } from 'react'

export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs.filter(it => it !== undefined)))
}

export const toggleFullscreen = (
    elementRef: RefObject<HTMLElement>,
): void => {
    
    const isFullscreen = document.fullscreenElement === elementRef.current
    
    if (!isFullscreen && elementRef.current)
        elementRef.current.requestFullscreen()
            .catch(e => console.error('toggleFullScreen', e))
    else if (isFullscreen)
        document.exitFullscreen()
            .catch(e => console.error('toggleFullScreen', e))
    
}
