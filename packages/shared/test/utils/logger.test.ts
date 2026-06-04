import { createLogger,defaultOptions, Logger, LogLevels } from '@repo/shared/utils/logger'
import { describe, expect, test, vi } from 'vitest'

describe('LogLevels', () => {
    
    test('should have correct log levels', () => {
        expect(LogLevels).toEqual({
            log: 'log',
            error: 'error',
            warn: 'warn',
            info: 'info',
            debug: 'debug',
        })
    })
    
    test('should have correct type', () => {
        // @ts-expect-error - testing that LogLevel type works
        const level: LogLevels['log'] = 'log'
        expect(level).toBe('log')
    })
    
})

describe('Logger', () => {
    
    test('should create instance with correct tag and options', () => {
        const tag = 'test-tag'
        const logger = new Logger(tag)
        
        expect(logger.tag).toBe(tag)
        expect(logger.options).toEqual(defaultOptions)
    })
    
    test('should create instance with custom options', () => {
        const tag = 'test-tag'
        const customOptions = {
            printLevel: false,
            uppercaseLevel: true,
            colorize: true,
        }
        const logger = new Logger(tag, customOptions)
        
        expect(logger.tag).toBe(tag)
        expect(logger.options.printLevel).toBe(false)
        expect(logger.options.uppercaseLevel).toBe(true)
        expect(logger.options.colorize).toBe(true)
    })
    
    test('should have static hooks array', () => {
        expect(Array.isArray(Logger.hooks)).toBe(true)
        expect(Logger.hooks).toHaveLength(0)
    })
    
    test('should register hook', () => {
        const hookFn = vi.fn()
        Logger.registerHook(hookFn)
        
        expect(Logger.hooks).toHaveLength(1)
        expect(Logger.hooks[0]).toBe(hookFn)
    })
    
    test('should collate arguments correctly', () => {
        const logger = new Logger('test')
        
        // Test string concatenation
        const result1 = logger.collateArguments(['Hello', 'World', '!'])
        expect(result1).toEqual(['Hello World !'])
        
        // Test non-string arguments
        const result2 = logger.collateArguments(['Hello', 42, true])
        expect(result2).toEqual(['Hello', 42, true])
        
        // Test mixed
        const result3 = logger.collateArguments(['Hello', 'World', 42, '!'])
        expect(result3).toEqual(['Hello World', '42 !'])
    })
    
    test('should have convenience methods', () => {
        const logger = new Logger('test')
        
        expect(typeof logger.d).toBe('function')
        expect(typeof logger.i).toBe('function')
        expect(typeof logger.w).toBe('function')
        expect(typeof logger.e).toBe('function')
    })
    
})

describe('defaultOptions', () => {
    
    test('should have correct default values', () => {
        expect(defaultOptions).toEqual({
            printLevel: true,
            uppercaseLevel: false,
            colorize: process.env.LOG_COLORIZE === 'true',
        })
    })
    
})

describe('createLogger', () => {
    
    test('should create Logger instance', () => {
        const logger = createLogger('test-tag')
        
        expect(logger).toBeInstanceOf(Logger)
        expect(logger.tag).toBe('test-tag')
    })
    
})
