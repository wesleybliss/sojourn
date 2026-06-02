import { describe, expect, test } from '@jest/globals'

// @todo fix imports & move this to shared
const withBaseUrl = (url: string, overrideBaseUrl?: string | null) => {
    
    const baseUrl = overrideBaseUrl === undefined
        ? 'defaultBaseUrl'
        : overrideBaseUrl
    
    if (baseUrl?.length)
        return `${baseUrl}${url}`
    
    return url
    
}

describe('temp', () => {
    
    test('withBaseUrl', () => {
        
        const inputs: Array<[string, string | null | undefined, string]> = [
            ['/api/trips', null, '/api/trips'],
            ['/api/trips', undefined, 'defaultBaseUrl/api/trips'],
            ['/api/trips', 'https://example.com', 'https://example.com/api/trips'],
        ]
        
        for (const [url, base, expected] of inputs) {
            
            const result = withBaseUrl(url, base)
            
            expect(result).toBe(expected)
            
        }
        
    })
    
})
