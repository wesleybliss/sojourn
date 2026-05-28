import '@testing-library/jest-dom'

import { jest } from '@jest/globals'

jest.mock('@forminator/react-wire', () => {
    const createMockWire = (initialValue?: unknown) => {
        let value = initialValue
        
        return {
            getValue: jest.fn(() => value),
            setValue: jest.fn((nextValue: unknown) => {
                value = nextValue
            }),
            subscribe: jest.fn(() => jest.fn()),
            fns: {},
        }
    }
    
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
