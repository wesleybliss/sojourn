import '@testing-library/jest-dom/extend-expect'

// Stub next/link for React Testing Library
jest.mock('next/link', () => {
  return ({ children }) => children
})
