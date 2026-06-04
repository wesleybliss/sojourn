import { cn, getUpdatePayload, keep, noop,omit } from '@repo/shared/utils'
import { describe, expect, test } from 'vitest'

describe('omit', () => {
    
    test('should omit specified keys from object', () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 }
        const result = omit(obj, ['b', 'd'])
        expect(result).toEqual({ a: 1, c: 3 })
    })
    
    test('should return empty object when all keys are omitted', () => {
        const obj = { a: 1, b: 2 }
        const result = omit(obj, ['a', 'b'])
        expect(result).toEqual({})
    })
    
    test('should return original object when no keys to omit', () => {
        const obj = { a: 1, b: 2 }
        const result = omit(obj, [])
        expect(result).toEqual(obj)
    })
    
})

describe('keep', () => {
    
    test('should keep only specified keys from object', () => {
        const obj = { a: 1, b: 2, c: 3, d: 4 }
        const result = keep(obj, ['b', 'd'])
        expect(result).toEqual({ b: 2, d: 4 })
    })
    
    test('should return empty object when no matching keys', () => {
        const obj: Record<string, number> = { a: 1, b: 2 }
        const result = keep(obj, ['c', 'd'])
        expect(result).toEqual({})
    })
    
    test('should return original object when all keys are kept', () => {
        const obj = { a: 1, b: 2 }
        const result = keep(obj, ['a', 'b'])
        expect(result).toEqual(obj)
    })
    
})

describe('getUpdatePayload', () => {
    
    test('should return payload based on control object', () => {
        const control = { a: 1, b: 2, c: 3 }
        const data = { a: 10, b: 20, c: 30, d: 40 }
        const result = getUpdatePayload(control, data)
        expect(result).toEqual({ a: 10, b: 20, c: 30 })
    })
    
    test('should omit specified keys from payload', () => {
        const control = { a: 1, b: 2, c: 3 }
        const data = { a: 10, b: 20, c: 30, d: 40 }
        const result = getUpdatePayload(control, data, ['b'])
        expect(result).toEqual({ a: 10, c: 30 })
    })
    
})

describe('cn', () => {
    
    test('should merge class names', () => {
        const falseyValue = false
        // This is a basic test - actual behavior depends on tailwind-merge and clsx
        expect(cn('hello', 'world')).toBe('hello world')
        expect(cn('hello', undefined, 'world')).toBe('hello world')
        // noinspection PointlessBooleanExpressionJS
        expect(cn(falseyValue && 'hello', 'world')).toBe('world')
    })
    
})

describe('noop', () => {
    
    test('should do nothing and return undefined', () => {
        expect(noop()).toBeUndefined()
    })
    
})
