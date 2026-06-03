import { describe, expect, test } from 'vitest'
import { weatherCodeMap } from '@repo/shared/constants'

describe('weatherCodeMap', () => {
    test('should be a record mapping numbers to strings', () => {
        expect(typeof weatherCodeMap).toBe('object')
        expect(weatherCodeMap).not.toBeNull()
    })
    
    test('should have correct mapping for clear sky (0)', () => {
        expect(weatherCodeMap[0]).toBe('Clear')
    })
    
    test('should have correct mapping for mostly clear (1)', () => {
        expect(weatherCodeMap[1]).toBe('Mostly clear')
    })
    
    test('should have correct mapping for partly cloudy (2)', () => {
        expect(weatherCodeMap[2]).toBe('Partly cloudy')
    })
    
    test('should have correct mapping for overcast (3)', () => {
        expect(weatherCodeMap[3]).toBe('Overcast')
    })
    
    test('should have correct mapping for fog (45 and 48)', () => {
        expect(weatherCodeMap[45]).toBe('Fog')
        expect(weatherCodeMap[48]).toBe('Fog')
    })
    
    test('should have correct mapping for drizzle (51)', () => {
        expect(weatherCodeMap[51]).toBe('Drizzle')
    })
    
    test('should have correct mapping for rain (61, 63)', () => {
        expect(weatherCodeMap[61]).toBe('Rain')
        expect(weatherCodeMap[63]).toBe('Rain')
    })
    
    test('should have correct mapping for snow (71)', () => {
        expect(weatherCodeMap[71]).toBe('Snow')
    })
    
    test('should have correct mapping for showers (80)', () => {
        expect(weatherCodeMap[80]).toBe('Showers')
    })
    
    test('should have correct mapping for storm (95)', () => {
        expect(weatherCodeMap[95]).toBe('Storm')
    })
    
    test('should return undefined for unknown codes', () => {
        expect(weatherCodeMap[999]).toBeUndefined()
        expect(weatherCodeMap[-1]).toBeUndefined()
    })
    
    test('should have expected number of entries', () => {
        const entries = Object.keys(weatherCodeMap)
        expect(entries).toHaveLength(12) // 0,1,2,3,45,48,51,61,63,71,80,95
    })
})
