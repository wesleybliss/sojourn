import {
    createTablePostgres,
    lower,
    postgresOptsCascadeAll,
    postgresTimestamp,
    postgresTimestamps,
    timestampSeconds,
} from '@shared/db/utils'
import { describe, expect, test } from 'vitest'

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

describe('postgresTimestamp', () => {
    
    test('should be a function', () => {
        expect(typeof postgresTimestamp).toBe('function')
    })
    
    test('should return a timestamp field object when called', () => {
        const result = postgresTimestamp('test_ts')
        expect(result).toBeDefined()
        expect(typeof result).toBe('object')
        expect(result).not.toBeNull()
    })
    
})

describe('timestamps', () => {
    
    test('should be an object with updatedAt and createdAt properties', () => {
        expect(postgresTimestamps).toBeDefined()
        expect(typeof postgresTimestamps).toBe('object')
        expect(postgresTimestamps).not.toBeNull()
        expect(postgresTimestamps).toHaveProperty('updatedAt')
        expect(postgresTimestamps).toHaveProperty('createdAt')
        // Each should be an object (the column config)
        expect(typeof postgresTimestamps.updatedAt).toBe('object')
        expect(typeof postgresTimestamps.createdAt).toBe('object')
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
        expect(postgresOptsCascadeAll).toEqual({
            onUpdate: 'cascade',
            onDelete: 'cascade',
        })
    })
    
})

describe('table', () => {
    
    test('should be a function', () => {
        expect(typeof createTablePostgres).toBe('function')
    })
    
    test('should throw error when name is empty', () => {
        expect(() => createTablePostgres('', {})).toThrow('Table name required')
    })
    
    test('should throw error when columns are empty', () => {
        expect(() => createTablePostgres('test', {})).toThrow('Table properties required')
    })
    
})
