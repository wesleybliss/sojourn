import { loadEnvConfig } from '@next/env'

// Only load env config on the server side
if (typeof window === 'undefined') {
    const projectDir = process.cwd()
    loadEnvConfig(projectDir)
}
