import * as fs from 'fs'
import * as path from 'path'
import dotenv from 'dotenv'

export const getEnvironmentVars = () => {
    
    const env = path.resolve(__dirname, '../.env')
    const sampleEnv = path.resolve(__dirname, '../sample.env')
    
    if (process.env.IS_CI) {
        const { parsed } = dotenv.config({ path: sampleEnv })
        return Object.keys(parsed).reduce((acc, it) => ({
            ...acc,
            [it]: process.env[it],
        }), {})
    }
    
    if (!fs.existsSync(env))
        throw new Error('Could not find .env file')
    
    const { parsed } = dotenv.config({ path: env })
    
    // console.info('Loading env vars from system', parsed)
    
    return parsed
    
}

export const loadEnvironment = (existingEnv = null) => {
    
    const env = existingEnv || getEnvironmentVars()
    
    // For Vite, these need to be the fully qualified process notation
    return Object.keys(env).reduce((acc, it) => ({
        ...acc,
        [`process.env.${it}`]: JSON.stringify(env[it]),
    }), {})
    
}
