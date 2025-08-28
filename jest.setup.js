import '@testing-library/jest-dom'

// Stub next/link for React Testing Library
jest.mock('next/link', () => {
  return ({ children }) => children
})
