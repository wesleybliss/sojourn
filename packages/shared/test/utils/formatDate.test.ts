import { describe, expect, test, beforeEach, afterEach } from 'vitest'
import { formatDate } from '@repo/shared/utils'
import dayjs from 'dayjs'

const originalEnv = process.env.TZ

describe('formatDate', () => {
    
    beforeEach(() => {
        process.env.TZ = 'UTC'
    })
    
    afterEach(() => {
        process.env.TZ = originalEnv
    })
    
    test('should format date with default format', () => {
        const date = new Date('2023-01-01')
        const result = formatDate(date)
        const expected = dayjs(date).format('ddd MMM D, YYYY')
        expect(result).toBe(expected)
    })
    
    test('should format date with custom format', () => {
        const date = new Date('2023-01-01')
        const result = formatDate(date, 'YYYY-MM-DD')
        expect(result).toBe('2023-01-01')
    })
    
    test('should use current date when no date provided', () => {
        const result = formatDate()
        const expected = dayjs().format('ddd MMM D, YYYY')
        expect(result).toBe(expected)
    })
    
    test('should handle invalid date gracefully', () => {
        // Invalid date should still produce a formatted string (dayjs handles this)
        const result = formatDate(new Date('invalid'))
        // Just check that it returns a string
        expect(typeof result).toBe('string')
    })
    
})
