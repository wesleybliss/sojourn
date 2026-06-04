import { calculateTotalDays } from '@repo/shared/utils'
import dayjs from 'dayjs'
import { describe, expect, test } from 'vitest'

describe('calculateTotalDays', () => {
    
    test('should calculate total days between two dates', () => {
        const startDate = new Date('2023-01-01')
        const endDate = new Date('2023-01-05')
        const result = calculateTotalDays(startDate, endDate)
        
        expect(result.startDate.isSame(dayjs(startDate))).toBe(true)
        expect(result.endDate.isSame(dayjs(endDate))).toBe(true)
        expect(result.totalDays).toBe(4)
    })
    
    test('should handle same start and end date', () => {
        const date = new Date('2023-01-01')
        const result = calculateTotalDays(date, date)
        
        expect(result.totalDays).toBe(0)
    })
    
    test('should handle reverse dates (end before start)', () => {
        const startDate = new Date('2023-01-05')
        const endDate = new Date('2023-01-01')
        const result = calculateTotalDays(startDate, endDate)
        
        expect(result.totalDays).toBe(-4)
    })
    
    test('should work with dayjs objects', () => {
        const startDate = dayjs('2023-01-01')
        const endDate = dayjs('2023-01-05')
        const result = calculateTotalDays(startDate.toDate(), endDate.toDate())
        
        expect(result.totalDays).toBe(4)
    })
    
})
