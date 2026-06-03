import { describe, expect, test } from 'vitest'
import { ErrorWithCode } from '@repo/shared/errors'

describe('ErrorWithCode', () => {
    test('should create an instance with correct code and message', () => {
        const code = 'VALIDATION_ERROR'
        const message = 'Invalid input data'
        const error = new ErrorWithCode(code, message)
        
        expect(error).toBeInstanceOf(Error)
        expect(error.code).toBe(code)
        expect(error.message).toBe(message)
    })
    
    test('should have correct name', () => {
        const error = new ErrorWithCode('TEST_CODE', 'Test message')
        expect(error.name).toBe('Error')
    })
})