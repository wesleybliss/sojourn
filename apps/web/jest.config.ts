import type { Config } from 'jest'
import nextJest from 'next/jest'

/**
 * Create a custom Jest config to use Next testing utilities
 */
const createJestConfig = nextJest({
    dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(customJestConfig)
