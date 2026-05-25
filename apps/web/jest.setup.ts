import '@testing-library/jest-dom'

import { jest } from '@jest/globals'
import { JSX, ReactNode } from 'react'

// Stub next/link for React Testing Library
jest.mock('next/link', () => {
    return ({ children }: { children: ReactNode | JSX.Element }) => children
})

jest.mock('react-wire', () => {
    const createMockWire = (initialValue?: unknown) => ({
        getValue: jest.fn(() => initialValue),
        setValue: jest.fn(),
        subscribe: jest.fn(() => jest.fn()), // returns unsubscribe fn
        fns: {},
    })
    
    return {
        createWire: jest.fn((initialValue?: unknown) => createMockWire(initialValue)),
        useWireValue: jest.fn((wire: ReturnType<typeof createMockWire>) =>
            wire?.getValue(),
        ),
        useWire: jest.fn((wire: ReturnType<typeof createMockWire>) => [
            wire?.getValue(),
            wire?.setValue,
        ]),
        useWireState: jest.fn((initialValue?: unknown) => {
            const wire = createMockWire(initialValue)
            return [initialValue, wire.setValue, wire]
        }),
    }
})
