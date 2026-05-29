import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

const rootDir = fileURLToPath(new URL('.', import.meta.url))
const repoRoot = fileURLToPath(new URL('../..', import.meta.url))

const publicEnvKeys = [
    'VITE_DEBUG_ENABLED',
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_GEOAPIFY_KEY',
    'VITE_MAP_TILER_KEY',
] as const

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, repoRoot, '')
    const define = {
        'process.env.NODE_ENV': JSON.stringify(mode),
    } as Record<string, string>
    
    for (const key of publicEnvKeys)
        define[`process.env.${key}`] = JSON.stringify(env[key] ?? '')
    
    return {
        envDir: repoRoot,
    plugins: [
        react(),
        tailwindcss({
            /*content: [
                './src/!**!/!*.{html,js,ts,jsx,tsx}',
                '../../packages/shared/src/!**!/!*.{html,js,ts,jsx,tsx}',
            ],*/
        }),
    ],
        resolve: {
            alias: {
                '@': path.resolve(rootDir, './src'),
                '@shared': path.resolve(repoRoot, './packages/shared/src'),
                '@repo/shared': path.resolve(repoRoot, './packages/shared/src'),
            },
        },
        define,
        server: {
            host: true,
            port: 3001,
        },
        preview: {
            host: true,
            port: 3001,
        },
        build: {
            outDir: 'dist',
        },
    }
})
