import { HttpError } from '@repo/shared/errors'
import { describe, expect, test } from 'vitest'

describe('HttpError', () => {
    test('should create an instance with correct status and message', () => {
        const status = 404
        const message = 'Not Found'
        const error = new HttpError(status, message)
        
        expect(error).toBeInstanceOf(Error)
        expect(error.status).toBe(status)
        expect(error.message).toBe(message)
    })
    
    test('should have correct name', () => {
        const error = new HttpError(500, 'Internal Server Error')
        expect(error.name).toBe('Error')
    })
})