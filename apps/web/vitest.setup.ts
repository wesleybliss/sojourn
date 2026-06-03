import '@testing-library/jest-dom'

import { vi } from 'vitest'

vi.mock('@forminator/react-wire', () => {
    const createMockWire = (initialValue?: unknown) => {
        let value = initialValue
        
        return {
            getValue: vi.fn(() => value),
            setValue: vi.fn((nextValue: unknown) => {
                value = nextValue
            }),
            subscribe: vi.fn(() => vi.fn()),
            fns: {},
        }
    }
    
    return {
        createWire: vi.fn((initialValue?: unknown) => createMockWire(initialValue)),
        useWireValue: vi.fn((wire: ReturnType<typeof createMockWire>) =>
            wire?.getValue(),
        ),
        useWire: vi.fn((wire: ReturnType<typeof createMockWire>) => [
            wire?.getValue(),
            wire?.setValue,
        ]),
        useWireState: vi.fn((initialValue?: unknown) => {
            const wire = createMockWire(initialValue)
            return [initialValue, wire.setValue, wire]
        }),
    }
})