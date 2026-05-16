
export const requireKeys = (
    source: NodeJS.ProcessEnv | ImportMetaEnv | Record<string, string>,
    ...keys: Array<string>
): Record<string, string> => {
    
    return keys.reduce((acc: Record<string, string>, it: string) => {
        
        const value: string | undefined = source[it]
        
        if (!value?.length)
            throw new Error(`${it} must be set`)
        
        acc[it] = value
        
        return acc
        
    }, {} as Record<string, string>)
    
}

export const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
)
