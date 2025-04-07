import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import babel from 'vite-plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { getEnvironmentVars, loadEnvironment } from './config/environment'
import injectProcessEnv from 'rollup-plugin-inject-process-env'

const env = getEnvironmentVars()
const __dirname = import.meta.url.replace('file://', '').split('/').slice(0, -1).join('/')

const ReactCompilerConfig = {
    target: '19', // '17' | '18' | '19'
}

const developmentConfig = {
    server: {
        port: process.env.PORT || 3000,
    },
}

const productionConfig = {
    build: {
        rollupOptions: {
            plugins: [
                injectProcessEnv(env, { verbose: false }),
            ],
        },
    },
}

// https://vitejs.dev/config/
export default defineConfig({
    define: loadEnvironment(env),
    plugins: [
        react({
            // Use esbuild for JSX + HMR, but add Babel for React Compiler
            babel: {
                plugins: [
                    ['babel-plugin-react-compiler', ReactCompilerConfig],
                ],
            },
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    ...(process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig),
})
