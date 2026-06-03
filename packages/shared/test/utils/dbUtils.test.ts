import { describe, expect, test } from 'vitest'
import {
    timestampSeconds,
    ts,
    timestamps,
    lower,
    table,
    updateTimestampTrigger,
    optsCascadeAll,
} from '@repo/shared/db/dbUtils'

describe('timestampSeconds', () => {
    
    test('should be a function', () => {
        expect(typeof timestampSeconds).toBe('function')
    })
    
    test('should return a custom type object when called', () => {
        const result = timestampSeconds('test_timestamp')
        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
        // Not null
        expect(result).not.toBeNull()
    })
    
})

describe('ts', () => {
    
    test('should be a function', () => {
        expect(typeof ts).toBe('function')
    })
    
    test('should return a timestamp field object when called', () => {
        const result = ts('test_ts')
        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
        expect(result).not.toBeNull()
    })
    
})

describe('timestamps', () => {
    
    test('should be an object with updatedAt and createdAt properties', () => {
        expect(timestamps).toBeDefined()
        expect(typeof timestamps).toBe('object')
        expect(timestamps).not.toBeNull()
        expect(timestamps).toHaveProperty('updatedAt')
        expect(timestamps).toHaveProperty('createdAt')
        // Each should be an object (the column config)
        expect(typeof timestamps.updatedAt).toBe('object')
        expect(typeof timestamps.createdAt).toBe('object')
    })
    
})

describe('lower', () => {
    
    test('should return SQL lowercase expression', () => {
        const result = lower('TEST')
        expect(result).toBeDefined()
        // The actual value is a SQL object from drizzle-orm, we can't easily test its content
        // but we can verify it's not null/undefined
    })
    
    test('should work with different input types', () => {
        expect(lower('test')).toBeDefined()
        // Note: Testing with AnyColumn or SQL would require drizzle-orm mocks
    })
    
})

describe('optsCascadeAll', () => {
    
    test('should have onUpdate and onDelete set to cascade', () => {
        expect(optsCascadeAll).toEqual({
            onUpdate: 'cascade',
            onDelete: 'cascade',
        })
    })
    
})

describe('updateTimestampTrigger', () => {
    
    test('should return SQL trigger statement', () => {
        const result = updateTimestampTrigger('test_table')
        expect(result).toBeDefined()
        // The actual value is a SQL.raw object, we can verify it's not null
    })
    
})

describe('table', () => {
    
    test('should be a function', () => {
        expect(typeof table).toBe('function')
    })
    
    test('should throw error when name is empty', () => {
        expect(() => table('', {})).toThrow('Table name required')
    })
    
    test('should throw error when columns are empty', () => {
        expect(() => table('test', {})).toThrow('Table properties required')
    })
    
})
