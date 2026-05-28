import ansiStyles from 'ansi-styles'

export const LogLevels = {
    log: 'log',
    error: 'error',
    warn: 'warn',
    info: 'info',
    debug: 'debug',
} as const

export type LogLevel = keyof typeof LogLevels

export type LoggerOptions = {
    printLevel: boolean
    uppercaseLevel: boolean
    colorize: boolean
}

export const defaultOptions: LoggerOptions = {
    printLevel: true,
    uppercaseLevel: false,
    colorize: process.env.LOG_COLORIZE === 'true',
}

type AnsiStyle = { open: string, close: string }

const levelColors: Record<LogLevel, AnsiStyle> = {
    debug: ansiStyles.cyan,
    info: ansiStyles.green,
    warn: ansiStyles.yellow,
    error: ansiStyles.red,
    log: ansiStyles.grey,
}

export class Logger {
    
    public tag: string
    public options: LoggerOptions
    
    public static hooks: Array<(level: LogLevel, processed: unknown[]) => Promise<void>> = []
    
    public static registerHook(fn: (level: LogLevel, processed: unknown[]) => Promise<void>) {
        
        Logger.hooks.push(fn)
        
    }
    
    constructor(tag: string, options?: Partial<LoggerOptions>) {
        
        this.tag = tag
        
        this.options = {
            ...defaultOptions,
            ...options,
        }
        
    }
    
    private _log(level: LogLevel, messages: unknown[]) {
        
        const processed = this.collateArguments(messages)
        
        const formattedLevel = this.options.printLevel
            ? this.options.uppercaseLevel
                ? level.toUpperCase()
                : level
            : null
        
        const coloredLevel = this.options.colorize && formattedLevel
            ? `${levelColors[level].open}${formattedLevel}${levelColors[level].close}`
            : formattedLevel
        
        const prefix = [
            coloredLevel,
            this.tag,
        ].filter(Boolean).join(' ')
        
        console[level](prefix, ...processed)
        
        // await Promise.all(Logger.hooks.map(hook => hook(level, processed)))
        
    }
    
    public registerHook(fn: (level: LogLevel, processed: unknown[]) => Promise<void>) {
        
        Logger.hooks.push(fn)
        
    }
    
    public collateArguments(args: unknown[]): unknown[] {
        
        const result = []
        
        for (const argument of args) {
            
            if (typeof argument === 'string' && result.length > 0)
                result[Math.max(result.length - 1, 0)] += ` ${argument}`
            else
                result.push(argument)
            
        }
        
        return result
        
    }
    
    public debug(...messages: unknown[]) {
        return this._log('debug', messages)
    }
    
    public info(...messages: unknown[]) {
        return this._log('info', messages)
    }
    
    public warn(...messages: unknown[]) {
        return this._log('warn', messages)
    }
    
    public error(...messages: unknown[]) {
        return this._log('error', messages)
    }
    
    public d(...messages: unknown[]) {
        return this.debug('log', ...messages)
    }
    
    public i(...messages: unknown[]) {
        return this.info('info', ...messages)
    }
    
    public w(...messages: unknown[]) {
        return this.warn('warn', ...messages)
    }
    
    public e(...messages: unknown[]) {
        return this.error('error', ...messages)
    }
    
}

export const createLogger = (tag: string) => new Logger(tag)

export default createLogger

/*const log = new Logger('example')

log.d('Simple')
log.d('JSON', { foo: 'bar', biz: 'bat', now: new Date(), arr: ['foo', 'bar', 'baz'] })
log.d('Mixed', [1,2,3], 'foo', { bar: 'baz' }, new Set([1,2,3]), new Date(), true)*/
