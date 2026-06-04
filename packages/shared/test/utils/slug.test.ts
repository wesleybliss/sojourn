import { generateSlug } from '@repo/shared/utils'
import { describe, expect, test } from 'vitest'

describe('generateSlug', () => {
    
    test('should convert a simple title to slug', () => {
        expect(generateSlug('Hello World')).toBe('hello-world')
    })
    
    test('should handle special characters', () => {
        expect(generateSlug('Hello@#$%^&*()World')).toBe('helloworld')
    })
    
    test('should handle multiple spaces', () => {
        expect(generateSlug('Hello   World')).toBe('hello-world')
    })
    
    test('should handle multiple hyphens', () => {
        expect(generateSlug('Hello---World')).toBe('hello-world')
    })
    
    test('should trim leading/trailing hyphens', () => {
        expect(generateSlug('-Hello World-')).toBe('hello-world')
    })
    
    test('should handle mixed case', () => {
        expect(generateSlug('HeLLo WoRLd')).toBe('hello-world')
    })
    
    test('should handle empty string', () => {
        expect(generateSlug('')).toBe('')
    })
    
    test('should handle only special characters', () => {
        expect(generateSlug('@#$%')).toBe('')
    })
    
})
