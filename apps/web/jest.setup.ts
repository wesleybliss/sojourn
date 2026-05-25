import '@testing-library/jest-dom'

import { jest } from '@jest/globals'

// Stub next/link for React Testing Library
jest.mock('next/link', () => {
    return ({ children }) => children
})
