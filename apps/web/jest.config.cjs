/** @type {import('jest').Config} */
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
}
