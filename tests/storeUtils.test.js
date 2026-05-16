import { describe, test, expect, beforeEach } from '@jest/globals'
import {
    updateItemArray,
    addItemArray,
    removeItemArray,
} from '../src/lib/storeUtils'

// Mock wire implementation for testing
const createMockWire = initialValue => {
    let value = initialValue
    return {
        getValue: () => value,
        setValue: newValue => { value = newValue },
        _getValue: () => value, // for test assertions
    }
}

describe('updateItemArray', () => {
    
    let wire
    
    beforeEach(() => {
        wire = createMockWire([
            { id: 1, name: 'Trip A', plans: [{ id: 10, segments: [{ id: 100 }] }] },
            { id: 2, name: 'Trip B' },
            { id: 3, name: 'Trip C' },
        ])
    })
    
    test('should merge with the correct element, not the entire array', () => {
        
        const updatedItem = { id: 2, name: 'Trip B Updated', description: 'New description' }
        
        updateItemArray(wire, updatedItem)
        
        const result = wire._getValue()
        
        // Should still have 3 items
        expect(result.length).toBe(3)
        
        // Item with id 2 should be merged
        expect(result[1].id).toBe(2)
        expect(result[1].name).toBe('Trip B Updated')
        expect(result[1].description).toBe('New description')
        
        // Other items should be unchanged
        expect(result[0].name).toBe('Trip A')
        expect(result[2].name).toBe('Trip C')
        
    })
    
    test('should preserve nested data when merging', () => {
        
        // Update trip 1 with new top-level data, plans should be preserved
        const updatedItem = { id: 1, name: 'Trip A Updated' }
        
        updateItemArray(wire, updatedItem)
        
        const result = wire._getValue()
        const trip1 = result.find(t => t.id === 1)
        
        expect(trip1.name).toBe('Trip A Updated')
        expect(trip1.plans).toBeDefined()
        expect(trip1.plans.length).toBe(1)
        expect(trip1.plans[0].id).toBe(10)
        
    })
    
    test('should append item if not found in array', () => {
        
        const newItem = { id: 99, name: 'New Trip' }
        
        updateItemArray(wire, newItem)
        
        const result = wire._getValue()
        
        // Should now have 4 items
        expect(result.length).toBe(4)
        expect(result[3].id).toBe(99)
        expect(result[3].name).toBe('New Trip')
        
    })
    
    test('should handle empty array by appending', () => {
        
        wire = createMockWire([])
        
        const newItem = { id: 1, name: 'First Trip' }
        
        updateItemArray(wire, newItem)
        
        const result = wire._getValue()
        
        expect(result.length).toBe(1)
        expect(result[0].id).toBe(1)
        
    })
    
    test('should handle null/undefined wire value by treating as empty array', () => {
        
        wire = createMockWire(null)
        
        const newItem = { id: 1, name: 'First Trip' }
        
        updateItemArray(wire, newItem)
        
        const result = wire._getValue()
        
        expect(result.length).toBe(1)
        expect(result[0].id).toBe(1)
        
    })
    
    test('should correctly update nested plans/segments when replacing trip data', () => {
        
        // Simulate what happens when trip details are fetched: detailed trip replaces summary
        const detailedTrip = {
            id: 2,
            name: 'Trip B',
            plans: [
                {
                    id: 20,
                    name: 'Plan 1',
                    segments: [
                        { id: 200, name: 'Segment 1' },
                        { id: 201, name: 'Segment 2' },
                    ],
                },
            ],
        }
        
        updateItemArray(wire, detailedTrip)
        
        const result = wire._getValue()
        const trip2 = result.find(t => t.id === 2)
        
        expect(trip2.plans).toBeDefined()
        expect(trip2.plans.length).toBe(1)
        expect(trip2.plans[0].segments.length).toBe(2)
        
    })
    
})

describe('addItemArray', () => {
    
    test('should append item to array', () => {
        
        const wire = createMockWire([{ id: 1 }])
        
        addItemArray(wire, { id: 2 })
        
        const result = wire._getValue()
        
        expect(result.length).toBe(2)
        expect(result[1].id).toBe(2)
        
    })
    
})

describe('removeItemArray', () => {
    
    test('should remove item by id', () => {
        
        const wire = createMockWire([{ id: 1 }, { id: 2 }, { id: 3 }])
        
        removeItemArray(wire, { id: 2 })
        
        const result = wire._getValue()
        
        expect(result.length).toBe(2)
        expect(result.find(it => it.id === 2)).toBeUndefined()
        
    })
    
})
