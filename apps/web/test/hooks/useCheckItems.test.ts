import type { ItemWithId } from '@repo/shared/types/data'
import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'

import useCheckItems from '@/hooks/useCheckItems'

const items = [
    { id: 1, name: 'Alpha' },
    { id: 2, name: 'Beta' },
    { id: 3, name: 'Gamma' },
] satisfies ItemWithId[]

describe('hooks/useCheckItems', () => {
    
    test('initializes with no checked items', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        expect(result.current.checked).toEqual(new Set([]))
        expect(result.current.allChecked).toBe(false)
        expect(result.current.someChecked).toBe(false)
        expect(result.current.anyChecked).toBe(false)
        
    })
    
    test('setChecked adds a single item', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked(1)
        })
        
        expect(result.current.checked).toEqual(new Set([1]))
        expect(result.current.hasChecked(1)).toBe(true)
        
    })
    
    test('setChecked adds multiple items', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked([1, 2])
        })
        
        expect(result.current.checked).toEqual(new Set([1, 2]))
        expect(result.current.hasChecked([1, 2])).toBe(true)
        
    })
    
    test('setChecked does not add duplicates', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked(1)
            result.current.setChecked(1)
        })
        
        expect(result.current.checked).toEqual(new Set([1]))
        
    })
    
    test('setChecked override replaces existing values', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked([1, 2])
            result.current.setChecked([3], true)
        })
        
        expect(result.current.checked).toEqual(new Set([3]))
        
    })
    
    test('hasChecked returns false when not all ids are checked', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked([1, 2])
        })
        
        expect(result.current.hasChecked([1, 2])).toBe(true)
        expect(result.current.hasChecked([1, 3])).toBe(false)
        
    })
    
    test('toggleChecked toggles a single item', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.toggleChecked(1)
        })
        
        expect(result.current.checked).toEqual(new Set([1]))
        
        act(() => {
            result.current.toggleChecked(1)
        })
        
        expect(result.current.checked).toEqual(new Set([]))
        
    })
    
    test('toggleChecked toggles multiple items', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.toggleChecked([1, 2])
        })
        
        expect(result.current.checked).toEqual(new Set([1, 2]))
        
        act(() => {
            result.current.toggleChecked([2, 3])
        })
        
        expect(Array.from(result.current.checked).sort()).toEqual([1, 3])
        
    })
    
    test('updateChecked accepts a callback', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked([1])
        })
        
        act(() => {
            result.current.updateChecked(prev => {
                const next = new Set(prev)
                next.add(2)
                return next
            })
        })
        
        expect(result.current.checked).toEqual(new Set([1, 2]))
        
    })
    
    test('updateChecked accepts a direct value', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.updateChecked([2, 3])
        })
        
        expect(result.current.checked).toEqual(new Set([2, 3]))
        
    })
    
    test('toggleAllChecked selects all items', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.toggleAllChecked()
        })
        
        expect(result.current.checked).toEqual(new Set([1, 2, 3]))
        expect(result.current.allChecked).toBe(true)
        expect(result.current.anyChecked).toBe(true)
        
    })
    
    test('toggleAllChecked clears all items when all are selected', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.toggleAllChecked()
        })
        
        act(() => {
            result.current.toggleAllChecked()
        })
        
        expect(result.current.checked).toEqual(new Set([]))
        expect(result.current.allChecked).toBe(false)
        
    })
    
    test('toggleAllChecked(true) forces all selected', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.toggleAllChecked(true)
        })
        
        expect(result.current.checked).toEqual(new Set([1, 2, 3]))
        
    })
    
    test('toggleAllChecked(false) forces all cleared', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.toggleAllChecked(true)
            result.current.toggleAllChecked(false)
        })
        
        expect(result.current.checked).toEqual(new Set([]))
        
    })
    
    test('reports someChecked correctly', () => {
        
        const { result } = renderHook(() => useCheckItems(items))
        
        act(() => {
            result.current.setChecked([1])
        })
        
        expect(result.current.someChecked).toBe(true)
        expect(result.current.allChecked).toBe(false)
        expect(result.current.anyChecked).toBe(true)
        
    })
    
})
