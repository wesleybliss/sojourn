import request from 'supertest'
import { describe, expect, test } from 'vitest'

import app from '../src/app'

describe('trips', () => {
    
    test('should return OK on the default/index endpoint', async () => {
        const res = await request(app).get('/api')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('status', 'OK')
    })
    
    test('should return OK on the health check endpoint', async () => {
        const res = await request(app).get('/api/health')
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('data')
        expect(res.body.data).toHaveProperty('status', 'OK')
    })
    
    // Test a POST endpoint that requires a body
    /*test('should accept data and return a confirmation', async () => {
        const testData = { name: 'Vitest User' }
        const response = await request(app)
            .post('/data')
            .send(testData) // Send JSON body
            .expect('Content-Type', /text\/plain/) // You can assert headers inline
            .expect(201) // Supertest has its own 'expect' for status codes
        
        // Use Vitest's `expect` for more complex checks
        expect(response.text).toBe('Received: Vitest User')
    })*/
    
})
