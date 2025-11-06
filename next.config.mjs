import 'dotenv/config'

import aliases from './config/aliases.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disabled to avoid issues with Turso sync-wasm file handles
    webpack(config, { isServer }) {
        
        // Suppress warnings from Turso sync-wasm about top-level await
        config.ignoreWarnings = [
            ...(config.ignoreWarnings || []),
            {
                module: /@tursodatabase\/sync-wasm/,
                message: /topLevelAwait/
            }
        ]
        
        for (const [aliasKey, aliasPath] of Object.entries(aliases)) {
            config.resolve.alias[aliasKey] = path.resolve(__dirname, aliasPath)
        }
        
        // Support for WebAssembly files from @tursodatabase/sync-wasm
        config.experiments = {
            ...config.experiments,
            asyncWebAssembly: true,
            topLevelAwait: true,
            layers: true
        }
        
        // Add rule for WASM files
        config.module.rules.push({
            test: /\.wasm$/,
            type: 'asset/resource'
        })
        
        return config
        
    },
    // Required headers for OPFS/SQLite WASM support
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                ],
            },
        ]
    },
    // Shuffle env vars via NEXT_PUBLIC_* prefix in .env
    // env: {
    //   MY_VAR: process.env.MY_VAR,
    // },
}

export default nextConfig
